/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
import { useRef, useState } from "react";
import { Tabs, Tab } from "ui/CreatePage/Tabs";
import NTT from "ui/CreatePage/NTT";
import NFT from "ui/CreatePage/NFT";
import { useChain } from "hooks/useChain";
import TokenForm, { CreateFormValues } from "ui/CreatePage/TokenForm";
import { toast } from "react-toastify";
import { GasLimit } from "config/cosmwasm";
import { useStore } from "hooks/useStore";
import { useAccount } from "hooks/useAccount";
import { STORE_USER_CW20_TOKENS_KEY } from "store/cw20";
import ManageAssets from "ui/CreatePage/ManageAssets";
import { useUserTokens } from "hooks/useUserTokens";
import { TOKENFACTORY_CREATE, TOKENFACTORY_MINT, TOKENFACTORY_UPDATE_METADATA } from "mutations/tokenfactory";
import { MsgSetDenomMetadata } from "tokenfactory";
import styles from "./CreatePage.module.css";

const CreatePage = () => {
  const form = useRef<HTMLFormElement>(null);
  const store = useStore();
  const chain = useChain();
  const [creating, setCreating] = useState(false);
  const { account, connect, isConnected } = useAccount();

  const {
    addCw20Token,
    addNativeToken,
    onDelete,
    onSend,
    tokens,
    tokenSentIds,
  } = useUserTokens();

  const tabs: Tab[] = [
    { id: "token", label: "Token" },
  ];

  tabs.push({ id: "nft", label: "NFT" });
  tabs.push({ id: "ntt", label: "NTT" });
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

  const onCreateCw20Token = async (values: CreateFormValues) => {
    if (!account) {
      connect();
      toast("Account is not connect");
      return;
    }
    setCreating(true);
    const {
      balances,
      decimals,
      tokenName,
      tokenSymbol,
      quantity,
      logo,
      description,
    } = values;
    const { address } = account;
    const initialBalance = { ...balances[0] };

    if (!initialBalance?.amount) {
      initialBalance.address = address;
      initialBalance.amount = quantity;
    }

    const msg = {
      name: tokenName,
      symbol: tokenSymbol,
      decimals: parseInt(decimals, 10),
      initial_balances: [initialBalance, ...balances.slice(1)].map((value) => ({
        ...value,
        id: undefined,
      })),
      mint: {
        minter: address,
        cap: quantity,
      },
      marketing: {
        project: "",
        description,
        marketing: address,
        logo: {
          url: logo,
        },
      },
    };

    console.log("msg", {
      msg,
      label: tokenName,
    }, "activeChain", chain);

    const codeId = chain.cosmwasmConfigs.cw20ContractCodeId;
    try {
      const signingCosmWasmClient = await chain.getSigningCosmWasmClient(account.signer);
      const res = await signingCosmWasmClient.instantiate(
        account.address,
        codeId,
        msg,
        tokenName,
        chain.calculateFee(GasLimit.Cw20Instantiate),
      );
      console.log("instantiate response", res);
      toast(`Success! Contract address: ${res.contractAddress}`, {
        type: "success",
      });
      form.current?.reset();
      await store.setInArray(STORE_USER_CW20_TOKENS_KEY(chain, account).key, res.contractAddress);
      addCw20Token(res.contractAddress);
    } catch (error) {
      toast(error as string, {
        type: "error",
      });
      console.log("error", error);
    }
    setCreating(false);
  };

  const onCreateFactoryToken = async (
    values: CreateFormValues,
  ) => {
    if (!account) {
      connect();
      toast("Account is not connect");
      return;
    }
    if (!values.tokenName) {
      toast.error("Please, input token name");
      return;
    }
    if (!values.tokenSymbol) {
      toast.error("Please, input token symbol");
      return;
    }
    setCreating(true);

    const decimals = Number(values.decimals);
    const symbol = values.tokenSymbol;
    const { tokenName } = values;
    const uName = symbol;
    try {
      const {
        denom,
      } = await TOKENFACTORY_CREATE(chain, account, decimals ? uName : symbol);
      addNativeToken(denom);
      toast(`Token ${values.tokenName} was created!`, {
        type: "success",
      });

      const denomUnits: MsgSetDenomMetadata["metadata"]["denomUnits"] = [];
      if (decimals !== 0) {
        denomUnits.push({
          denom,
          exponent: 0,
          aliases: [],
        });
      }
      denomUnits.push({
        denom: symbol,
        exponent: decimals,
        aliases: [],
      });
      toast("Minting balance to myself...");
      await TOKENFACTORY_MINT(
        chain,
        account,
        denom,
        values.quantity,
      );
      toast("Minted! Update metadata...");

      await TOKENFACTORY_UPDATE_METADATA(chain, account, {
        description: values.description,
        base: denom,
        name: tokenName,
        symbol,
        display: symbol,
        denomUnits,
      });
      toast(`Token ${tokenName} metadata was updated!${values.balances.length > 0 ? " Minting balances..." : ""}`, {
        type: "success",
      });
      if (values.balances.length > 0) {
        for (const balance of values.balances) {
          await TOKENFACTORY_MINT(
            chain,
            account,
            denom,
            balance.amount,
            balance.address,
          );
          toast(`Minted ${balance.amount} to ${balance.address}!`);
        }
      }
      form.current?.reset();
    } catch (error) {
      toast.error(error as string, {
        type: "error",
      });
      console.error("error when create token", error);
    } finally {
      setCreating(false);
    }
  };

  const onCreateToken = (values: CreateFormValues) => {
    if (chain.config.features?.includes("tokenfactory")) {
      return onCreateFactoryToken(values);
    }
    return onCreateCw20Token(values);
  };

  return (
    <div className={styles.mainpage}>
      <div className={styles.group}>
        <Tabs
          selectedId={selectedTabId}
          tabs={tabs}
          onClick={setSelectedTabId}
        />
        <div className={styles.tools}>
          <div className={styles.tabPageContent}>
            {selectedTabId === "token"
            && (
            <TokenForm
              isConnected={isConnected}
              connect={connect}
              creating={creating}
              onCreate={onCreateToken}
              ref={form}
            />
            )}
            {selectedTabId === "nft" && <NFT />}
            {selectedTabId === "ntt" && <NTT />}
          </div>
          <ManageAssets
            onAddCw20Token={addCw20Token}
            onDelete={onDelete}
            onSend={onSend}
            isConnected={isConnected}
            tokens={tokens}
            tokenSentIds={tokenSentIds}
          />
        </div>
      </div>
      <div className={styles.createtext}>{creating ? "creating..." : "create!"}</div>
    </div>
  );
};

export default CreatePage;
