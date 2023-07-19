import { useState } from "react";
import { Tabs, Tab } from "ui/CreatePage/Tabs";
import NTT from "ui/CreatePage/NTT";
import NFT from "ui/CreatePage/NFT";
import { useChain } from "hooks/useChain";
import CW20TokenForm, { CreateCw20FormValues } from "ui/CreatePage/CW20TokenForm";
import { toast } from "react-toastify";
import { GasLimit } from "config/cosmwasm";
import { useStore } from "hooks/useStore";
import { useAccount } from "hooks/useAccount";
import { STORE_USER_CW20_TOKENS_KEY } from "store/cw20";
import FactoryTokenForm from "ui/CreatePage/FactoryTokenForm";
import ManageAssets from "ui/CreatePage/ManageAssets";
import { useUserTokens } from "hooks/useUserTokens";
import styles from "./CreatePage.module.css";

const CreatePage = () => {
  const store = useStore();
  const chain = useChain();
  const [creating, setCreating] = useState(false);
  const { account, connect, isConnected } = useAccount();

  const {
    addCw20Token,
    onDelete,
    onSend,
    tokens,
    tokenSentIds,
  } = useUserTokens();

  const tabs: Tab[] = [
    { id: "cw20", label: "Token" },
  ];
  if (chain.config.features?.includes("tokenfactory")) {
    tabs.push({
      id: "native",
      label: "Native",
    });
  }
  tabs.push({ id: "nft", label: "NFT" });
  tabs.push({ id: "ntt", label: "NTT" });
  const [selectedTabId, setSelectedTabId] = useState(tabs[0].id);

  const onCreateCw20Token = async (values: CreateCw20FormValues) => {
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
      await store.setInArray(STORE_USER_CW20_TOKENS_KEY(chain, account).key, res.contractAddress);
      addCw20Token(res.contractAddress);
    } catch (error) {
      console.log("error", error);
      toast(error as string, {
        type: "error",
      });
    }
    setCreating(false);
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
            {selectedTabId === "cw20"
            && (
            <CW20TokenForm
              isConnected={isConnected}
              connect={connect}
              creating={creating}
              onCreate={onCreateCw20Token}
            />
            )}
            {selectedTabId === "native" && <FactoryTokenForm />}
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
