import "./App.css";
import { useEffect, useMemo, useState } from "react";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { GrazProvider, useAccount } from "graz";
import WelcomePage from "ui/WelcomePage";
import Footer from "ui/Footer";
import { AppState, AppStateContext } from "./context/AppStateContext";
import CreatePage from "./components/CreatePage/CreatePage";
import LegalPage from "./components/LegalPage/LegalPage";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header";
import Swap from "./components/Swap/Swap";
import MyWalletPage from "./components/MyWalletPage/MyWalletPage";
import License from "./components/LicensePage/LicensePage";
import Pools from "./components/Pools/Pools";
import { loadFromStorage } from "./utils/storage";
import { QueryCacheContext } from "./hooks/useQueryCache";
import { QueryCache } from "./utils/QueryCache";
import { ChainId, Chains } from "./config/chains";

const TokensStorageKey = "userTokens";
declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {}
}

type SavedTokens = Record<string, AppState["userTokens"]>;
const queryCache = new QueryCache({});

function App() {
  const [chainId, setChainId] = useState<ChainId>("bostrom");
  const [address, setAddress] = useState("");
  const { data: account } = useAccount();
  const [savedTokens, setSavedTokens] = useState<SavedTokens>(
    () => loadFromStorage<SavedTokens>(TokensStorageKey, {}),
  );
  const userTokens = account ? (savedTokens[account.bech32Address] || []) : [];

  useEffect(() => {
    localStorage.setItem(TokensStorageKey, JSON.stringify(savedTokens));
  }, [savedTokens]);

  const addUserToken = (contractAddress: string) => {
    if (!account) {
      toast.error("Please, connect the wallet");
      return;
    }
    setSavedTokens({
      ...savedTokens,
      [account.bech32Address]: [...userTokens, contractAddress],
    });
  };

  const removeUserToken = (contractAddress: string) => {
    if (!account) {
      toast.error("Please, connect the wallet");
      return;
    }
    setSavedTokens({
      ...savedTokens,
      [account.bech32Address]: userTokens.filter(
        (tokenAddress) => tokenAddress !== contractAddress,
      ),
    });
  };

  const appState: AppState = useMemo(() => ({
    chainId,
    setChainId,
    userTokens,
    addUserToken,
    removeUserToken,
    address,
    setAddress,
  }), [
    chainId,
    setChainId,
    address,
    setAddress,
    addUserToken,
    userTokens,
    removeUserToken]);

  return (
    <QueryCacheContext.Provider value={queryCache}>
      <GrazProvider
        grazOptions={{
          defaultChain: Chains.bostrom,
        }}
      >
        <div className="App">
          <div className="container">

            <AppStateContext.Provider
              value={appState}
            >
              <Router>
                <Header />
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
            </AppStateContext.Provider>
          </div>
        </div>
      </GrazProvider>
    </QueryCacheContext.Provider>
  );
}

export default App;
