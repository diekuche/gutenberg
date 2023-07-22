import { useEffect, useState } from "react";
import { useChain } from "hooks/useChain";
import { getShortTokenName } from "utils/tokens";
import BigNumber from "bignumber.js";
import { toast } from "react-toastify";
import { useAccount } from "hooks/useAccount";
import { Cw20Client } from "generated/Cw20.client";
import { useStore } from "hooks/useStore";
import { STORE_USER_CW20_TOKENS_KEY } from "store/cw20";
import { GasLimit } from "config/cosmwasm";
import { TokenItem, TokenListItem } from "types/tokens";
import { TOKENFACTORY_BURN, TOKENFACTORY_MINT } from "mutations/tokenfactory";
import { fetchUserCw20Token, fetchUserNativeToken, fetchUserTokens } from "queries/tokens";

const userTokenToListItem = (token: TokenItem, address: string): TokenListItem => {
  const isCw20 = token.type === "cw20";
  let shortName: string;
  const isFactoryToken = isCw20 ? false : token.denom.toLowerCase().startsWith("factory/");
  if (isCw20) {
    shortName = token.name;
  } else {
    shortName = isFactoryToken ? getShortTokenName(token) : token.denom;
  }
  return {
    shortName,
    id: token.id,
    key: `${token.id}_${token.updatedAt}`,
    logoUrl: token.logo || "",
    userBalance: BigNumber(token.balance).dividedBy(10 ** token.decimals),
    isBurnable: (isCw20 && token.minter === address) || isFactoryToken,
    isMintable: (isCw20 && token.minter === address) || isFactoryToken,
    isRemovable: isCw20,
    isSendable: true,
  };
};

export const useUserTokens = () => {
  const chain = useChain();
  const { account } = useAccount();
  const store = useStore();

  const [loading, setLoading] = useState(true);
  const [addTokenLoading, setAddTokenLoading] = useState(false);
  const [tokenSentIds, setTokenSentIds] = useState<string[]>([]);

  const [tokens, setTokens] = useState<TokenItem[]>([]);

  useEffect(() => {
    setLoading(true);
    setTokens([]);
    if (!account) {
      return;
    }
    if (account.chain !== chain) {
      return;
    }
    fetchUserTokens(
      chain,
      account,
      store,

      (newTokens) => {
        setTokens((oldTokens) => oldTokens.filter(
          (oldToken) => !newTokens.find((newToken) => newToken.id === oldToken.id),
        ).concat(newTokens));
      },
    ).finally(() => setLoading(false));
  }, [account, chain]);

  const addCw20Token = (tokenAddress: string) => {
    if (!chain.validateAddress(tokenAddress)) {
      toast.error("Invalid token address");
      return;
    }
    if (tokens.find((token) => token.type === "cw20" && token.address === tokenAddress)) {
      toast.error("Token already exists");
      return;
    }
    if (!account) {
      toast.error("Account is not connected");
      return;
    }
    setAddTokenLoading(true);
    fetchUserCw20Token(chain, tokenAddress, account.address).then(async (newToken) => {
      await store.setInArray(STORE_USER_CW20_TOKENS_KEY(chain, account).key, tokenAddress);
      setTokens(tokens.filter((t) => t.id !== newToken.id).concat(newToken));
    }).catch((e) => {
      console.log(e);
      toast.error(`Unknown error: ${e}`);
    }).finally(() => setAddTokenLoading(false));
  };

  const checkAccount = () => {
    if (!account) {
      toast.error("Account is not connected");
      throw new Error("Account is not connected");
    }
    return account;
  };

  const updateToken = async (token: TokenItem) => {
    if (!account) {
      return;
    }
    const newToken = await (token.type === "cw20"
      ? fetchUserCw20Token(chain, token.address, account.address)
      : fetchUserNativeToken(chain, token.denom, account.address));
    setTokens(tokens.filter((t) => t.id !== token.id).concat(newToken));
  };
  const addNativeToken = async (denom: string) => {
    if (!account) {
      return;
    }
    const newToken = await fetchUserNativeToken(chain, denom, account.address);
    setTokens(tokens.concat(newToken));
  };

  const onBurn = async (id: string, amount: string) => {
    if (!account) {
      toast.error("Account is not connected");
      return;
    }
    console.log(`Burn for ${id}, amount: ${amount}`);
    const token = tokens.find((t) => t.id === id);
    if (!token) {
      toast.error(`Not found token ${id}`);
      return;
    }
    const realAmount = BigNumber(amount).multipliedBy(BigNumber(10 ** token.decimals)).toFixed();
    try {
      if (token.type === "cw20") {
        const signingCosmWasmClient = await chain.getSigningCosmWasmClient(account.signer);
        await new Cw20Client(
          signingCosmWasmClient,
          account.address,
          token.address,
        ).burn({
          amount: realAmount,
        }, chain.calculateFee(GasLimit.Cw20Burn));
      } else if (!token.denom.startsWith("factory/")) {
        toast.error(`Token ${token.denom} cannot be burned`);
      } else {
        await TOKENFACTORY_BURN(
          chain,
          account,
          token.denom,
          amount,
        );
      }
      updateToken(token);
      toast("Burned successfully", {
        type: "success",
        autoClose: 2000,
      });
    } catch (e) {
      toast(String(e), {
        type: "error",
      });
      console.log("Error when mint token");
      console.log("error", e);
    }
  };
  const onMint = async (id: string, amount: string) => {
    if (!account) {
      toast.error("Account is not connected");
      return;
    }
    console.log(`Mint for ${id}, amount: ${amount}`);
    const token = tokens.find((t) => t.id === id);
    if (!token) {
      toast.error(`Not found token ${id}`);
      return;
    }
    const realAmount = BigNumber(amount).multipliedBy(BigNumber(10 ** token.decimals)).toFixed();
    try {
      if (token.type === "cw20") {
        const signingCosmWasmClient = await chain.getSigningCosmWasmClient(account.signer);
        await new Cw20Client(
          signingCosmWasmClient,
          account.address,
          token.address,
        ).mint({
          amount: realAmount,
          recipient: account.address,
        }, chain.calculateFee(GasLimit.Cw20Mint));
      } else if (!token.denom.startsWith("factory/")) {
        toast.error(`Token ${token.denom} cannot be minted`);
      } else {
        await TOKENFACTORY_MINT(
          chain,
          account,
          token.denom,
          amount,
        );
      }
      updateToken(token);
      toast("Minted successfully", {
        type: "success",
        autoClose: 2000,
      });
    } catch (e) {
      toast(String(e), {
        type: "error",
      });
      console.log("Error when mint token");
      console.log("error", e);
    }
  };
  const onSend = async (id: string, recipient: string, amount: string) => {
    if (!account) {
      toast.error("Account is not connected");
      return;
    }
    const { signer } = checkAccount();
    if (!chain.validateAddress(recipient)) {
      toast.error("Invalid recipient");
      return;
    }
    console.log(`Send for ${id} to ${recipient}, amount: ${amount}`);
    const token = tokens.find((t) => t.id === id);
    if (!token) {
      toast.error(`Not found token ${id}`);
      return;
    }

    const realAmount = BigNumber(amount).multipliedBy(BigNumber(10 ** token.decimals)).toFixed();

    const signingCosmWasmClient = await chain.getSigningCosmWasmClient(signer);
    let error = "";
    try {
      if (token.type === "cw20") {
        const contractAddress = token.address;
        const response = await new Cw20Client(
          signingCosmWasmClient,
          account.address,
          contractAddress,
        ).send({
          amount: realAmount,
          contract: recipient,
          msg: "",
        }, chain.calculateFee(GasLimit.Cw20Send));
        console.log("Cw20 token send response", response);
      } else {
        const result = await (await chain.getSigningCosmWasmClient(account.signer)).sendTokens(
          account.address,
          recipient,
          [{
            denom: token.denom,
            amount: realAmount,
          }],
          chain.calculateFee(GasLimit.NativeSendTokens),
        );
        console.log("Send token result ", result);
        if (result.code !== 0) {
          error = result.rawLog || `Unknown error ${result.code}`;
        }
      }
      if (error) {
        throw new Error(error);
      }
      setTokenSentIds((current) => current.concat(token.id));
      setTimeout(() => {
        setTokenSentIds((current) => current.filter((t) => t !== token.id));
        updateToken(token);
      }, 2000);
      toast("Success", {
        type: "success",
        autoClose: 2000,
      });
    } catch (e) {
      toast(String(e), {
        type: "error",
      });
      console.log("Error when send tokens");
      console.log("error", e);
    }
  };
  const onDelete = async (id: string) => {
    if (!account) {
      return;
    }
    const token = tokens.find((t) => t.id === id);
    if (!token || token.type !== "cw20") {
      return;
    }
    await store.deleteFromArray(STORE_USER_CW20_TOKENS_KEY(chain, account).key, token.address);
    setTokens((old) => old.filter((t) => t.id !== id));
  };

  return {
    addTokenLoading,
    loading,
    addCw20Token,
    addNativeToken,
    onBurn,
    onDelete,
    onMint,
    onSend,
    tokenSentIds,
    tokens: account ? tokens
      .sort((a, b) => {
        if (a.type === "native" && b.type === "cw20") {
          return -1;
        }
        if (a.type === "cw20" && b.type === "native") {
          return 1;
        }
        return a.id.localeCompare(b.id);
      })
      .map((token) => userTokenToListItem(token, account.address)) : [],
  };
};
