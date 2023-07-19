import "./App.css";
import { useMemo, useState } from "react";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import WelcomePage from "ui/WelcomePage";
import Footer from "ui/Footer";
import { WalletContext } from "hooks/useWallet";
import { Wallet } from "classes/Wallet";
import { AppState, AppContext } from "./context/AppContext";
import CreatePage from "./components/CreatePage/CreatePage";
import LegalPage from "./components/LegalPage/LegalPage";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header";
import Swap from "./components/Swap/Swap";
import MyWalletPage from "./components/MyWalletPage/MyWalletPage";
import License from "./components/LicensePage/LicensePage";
import Pools from "./components/Pools/Pools";
import { ChainId } from "./config/chains";
import { QueryCache } from "classes/QueryCache";
import { AppStoreContext } from "context/AppStoreContext";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {}
}

const store = new QueryCache({
  prefix: 'gutenberg',
})

const wallet = new Wallet();

function App() {
  const [chainId, setChainId] = useState<ChainId>("bostrom");

  const appState: AppState = useMemo(() => ({
    chainId,
    setChainId,
  }), [
    chainId,
    setChainId]);

  return (
    <AppStoreContext.Provider value={store}>
    <WalletContext.Provider value={wallet}>
      <div className="App">
        <div className="container">

          <AppContext.Provider
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
          </AppContext.Provider>
        </div>
      </div>
    </WalletContext.Provider>
    </AppStoreContext.Provider>
  );
}

export default App;
