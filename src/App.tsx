import "./App.css";
import { chains } from "chain-registry";
import { Chain } from "classes/Chain";
import { AccountContext } from "hooks/useAccount";
import { Account } from "classes/Account";
import { useEffect, useMemo, useState } from "react";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Header from "ui/Header";
import WelcomePage from "ui/WelcomePage";
import Footer from "ui/Footer";
import { WalletContext } from "hooks/useWallet";
import { ChainContext } from "hooks/useChain";
import { Wallet } from "classes/Wallet";
import { QueryCache } from "classes/QueryCache";
import { AppStoreContext } from "context/AppStoreContext";
import { AppState, AppContext } from "./context/AppContext";
import CreatePage from "./components/CreatePage/CreatePage";
import LegalPage from "./components/LegalPage/LegalPage";
import "react-toastify/dist/ReactToastify.css";
import Swap from "./components/Swap/Swap";
import MyWalletPage from "./components/MyWalletPage/MyWalletPage";
import License from "./components/LicensePage/LicensePage";
import Pools from "./components/Pools/Pools";
import { ChainId, Chains } from "./config/chains";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {}
}

const store = new QueryCache({
  prefix: "gutenberg",
});

const wallet = new Wallet();

let activeChainList = Object.keys(Chains)
  .map((chainId) => chainId as ChainId)
  .sort(
    (chainId1, chainId2) => Chains[chainId1].chainName.localeCompare(Chains[chainId2].chainName),
  )
  .map((chainId) => ({
    id: chainId,
    name: Chains[chainId].chainName,
    icon: chains.filter(({ chain_id }) => chain_id === chainId)[0].logo_URIs?.svg,
  }));

if (process.env.NODE_ENV !== "development") {
  activeChainList = activeChainList.filter((chain) => !Chains[chain.id].isTestNet);
}

const chainRegistry: Map<ChainId, Chain> = new Map();

function App() {
  const [isConnecting, setIsConnecting] = useState(false);
  const [connectError, setConnectError] = useState<unknown>();
  const [account, setAccount] = useState<Account>();
  const [chain, setChain] = useState<Chain | null>(null);
  const [chainId, setChainId] = useState<ChainId>("bostrom");

  const appState: AppState = useMemo(() => ({
    chainId,
    setChainId,
  }), [
    chainId,
    setChainId]);

  const onSelectChainId = (newChainId: ChainId) => {
    setChainId(newChainId);
    store.set("selected-chain-id", newChainId);
    let found = chainRegistry.get(newChainId);
    if (!found) {
      found = new Chain(Chains[newChainId]);
      chainRegistry.set(newChainId, found);
    }
    setChain(found);
  };

  const onWalletUpdate = async (ch: Chain) => {
    if (!chain) {
      return;
    }
    setIsConnecting(true);
    try {
      const address = await wallet.getAddress(ch.config.chainId);
      const signer = await wallet.getSigner(ch.config.chainId);
      setAccount(new Account({
        chain,
        address,
        signer,
      }));
    } catch (e) {
      setAccount(undefined);
      setConnectError(e);
    } finally {
      setIsConnecting(false);
    }
  };
  useEffect(() => {
    if (!chain) {
      return () => { /** */ };
    }
    wallet.onUpdate(() => onWalletUpdate(chain));
    onWalletUpdate(chain);
    return () => wallet.offUpdate(() => { onWalletUpdate(chain); });
  }, [chain]);

  useEffect(() => {
    store.get({
      key: "selected-chain-id",
      default: "bostrom" as ChainId,
    }).then(onSelectChainId);
  }, []);

  const connect = useMemo(() => () => {
    if (!chain) {
      return;
    }
    wallet.connect(chain);
    onWalletUpdate(chain);
  }, [chain]);
  const disconnect = useMemo(() => () => {
    if (!chain) {
      return;
    }
    wallet.disconnect(chain);
    setAccount(undefined);
  }, [chain]);

  const accountContext = useMemo(() => ({
    account,
    isConnecting,
    connect,
    disconnect,
    isConnected: !!account,
    connectError,
  }), [
    account,
    isConnecting,
    connectError,
    disconnect,
  ]);
  if (!chain) {
    return null;
  }
  return (
    <AppStoreContext.Provider value={store}>
      <ChainContext.Provider value={chain}>
        <WalletContext.Provider value={wallet}>
          <AccountContext.Provider value={accountContext}>
            <div className="App">
              <div className="container">

                <AppContext.Provider
                  value={appState}
                >
                  <Router>
                    <Header
                      address={account?.address}
                      connect={connect}
                      disconnect={disconnect}
                      chains={activeChainList}
                      chainId={chainId}
                      onSelectChainId={onSelectChainId}
                    />
                    <Routes>
                      <Route path="/" element={<WelcomePage />} />
                      <Route path="/legalinfo" element={<LegalPage />} />
                      <Route path="/license" element={<License />} />
                      <Route path="/create" element={<CreatePage />} />
                      <Route path="/swap" element={<Swap />} />
                      <Route path="/my-wallet" element={<MyWalletPage />} />
                      <Route path="/pools" element={<Pools />} />
                    </Routes>
                    <Footer />
                  </Router>

                  <ToastContainer
                    bodyClassName="font-link"
                    style={{ marginTop: 50 }}
                    theme="dark"
                    autoClose={false}
                  />
                </AppContext.Provider>
              </div>
            </div>
          </AccountContext.Provider>
        </WalletContext.Provider>
      </ChainContext.Provider>
    </AppStoreContext.Provider>
  );
}

export default App;
