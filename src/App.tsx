import "./App.css";
import { useState } from "react";
import { AppStateContext } from "././context/AppStateContext";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import CreatePage from "./components/CreatePage/CreatePage";
import Footer from "./components/Footer/Footer";
import LegalPage from "./components/LegalPage/LegalPage";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header/Header";
import WelcomePage from "./components/WelcomePage/WelcomePage";
import Swap from "./components/Swap/Swap";
import MyWallet from "./components/MyWalletPage/MyWallet";
import License from "./components/LicensePage/LicensePage";
import { GrazProvider } from "graz";
import { CustomChains } from "../src/utils/config";
import Pools from "./components/Pools/Pools";
import Deposit from "./components/Deposit/Deposit";

declare global {
  interface Window extends KeplrWindow {}
}

function App() {
  const [address, setAddress] = useState("");
  return (
    <GrazProvider
      grazOptions={{
        defaultChain: CustomChains.bostrom,
      }}
    >
      <div className="App">
        <div className="container">
          <AppStateContext.Provider value={{ address, setAddress }}>
            <Router>
              <Header />
              <Routes>
                <Route path="/" element={<WelcomePage />}></Route>
                <Route path="/legalinfo" element={<LegalPage />}></Route>
                <Route path="/license" element={<License />}></Route>
                <Route path="/create" element={<CreatePage />}></Route>
                <Route path="/swap" element={<Swap />}></Route>
                <Route path="/my-wallet" element={<MyWallet />}></Route>
                <Route path="/pools" element={<Pools />}></Route>
                <Route path="/deposit" element={<Deposit />}></Route>
              </Routes>
              <Footer />
            </Router>

            <ToastContainer autoClose={false} />
          </AppStateContext.Provider>
        </div>
      </div>
    </GrazProvider>
  );
}

export default App;
