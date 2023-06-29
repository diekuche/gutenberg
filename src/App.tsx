import "./App.css";
import { useEffect, useMemo, useState } from "react";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { GrazProvider, useAccount } from "graz";
import { AppState, AppStateContext } from "./context/AppStateContext";
import CreatePage from "./components/CreatePage/CreatePage";
import Footer from "./components/Footer/Footer";
import LegalPage from "./components/LegalPage/LegalPage";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import Swap from "./components/Swap/Swap";
import MyWallet from "./components/MyWalletPage/MyWallet";
import License from "./components/LicensePage/LicensePage";
import Pools from "./components/Pools/Pools";
import { loadFromStorage } from "./utils/storage";
import { QueryCacheContext } from "./hooks/useQueryCache";
import { QueryCache } from "./utils/QueryCache";
import { Chains } from "./config/chains";

const TokensStorageKey = "userTokens";
const PoolsStorageKey = "pools";
declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {}
}

type SavedTokens = Record<string, AppState["userTokens"]>;
const queryCache = new QueryCache({});

function App() {
  const [address, setAddress] = useState("");
  const { data: account } = useAccount();
  const [userTokens, setUserTokens] = useState<SavedTokens>(
    () => loadFromStorage<SavedTokens>(TokensStorageKey, {}),
  );
  const currentTokens = account ? userTokens[account.bech32Address] : [];

  const [pools, setPools] = useState<AppState["pools"]>(
    () => loadFromStorage<AppState["pools"]>(PoolsStorageKey, []),
  );

  useEffect(() => {
    localStorage.setItem(TokensStorageKey, JSON.stringify(userTokens));
  }, [userTokens]);

  useEffect(() => {
    localStorage.setItem(PoolsStorageKey, JSON.stringify(pools));
  }, [pools]);

  const addUserToken = (contractAddress: string) => {
    if (!account) {
      alert("Not connected");
      return;
    }
    setUserTokens({
      ...userTokens,
      [account.bech32Address]: [...currentTokens, contractAddress],
    });
  };

  const removeUserToken = (contractAddress: string) => {
    if (!account) {
      alert("Not connected");
      return;
    }
    setUserTokens({
      ...userTokens,
      [account.bech32Address]: currentTokens.filter(
        (tokenAddress) => tokenAddress !== contractAddress,
      ),
    });
  };

  const appState = useMemo(() => ({
    userTokens: currentTokens,
    addUserToken,
    removeUserToken,
    address,
    setAddress,
    pools,
    setPools,
  }), [
    address,
    setAddress,
    pools,
    setPools,
    addUserToken,
    currentTokens,
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
                  <Route path="/my-wallet" element={<MyWallet />} />
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
