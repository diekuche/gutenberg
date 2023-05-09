import "./App.css";
import { useEffect, useState } from "react";
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
import CreatePool from "./components/CreatePool/CreatePool/CreatePool";
import { useAccount } from "graz";

const TokensStorageKey = "userTokens";
declare global {
  interface Window extends KeplrWindow {}
}

function App() {
  const [address, setAddress] = useState("");
  const { data: account } = useAccount();
  const [userTokens, setUserTokens] = useState<any>(() => {
    const saved = localStorage.getItem(TokensStorageKey) as string;
    if (saved) {
      try {
        const initialValue = JSON.parse(saved);
        return initialValue || {};
      } catch (error) {
        console.log(error);
      }
    }
    return [];
  });
  const currentTokens = userTokens[account?.bech32Address!] || [];

  useEffect(() => {
    localStorage.setItem(TokensStorageKey, JSON.stringify(userTokens));
  }, [userTokens]);

  const addUserToken = (contractAddress: string) => {
    setUserTokens({
      ...userTokens,
      [account?.bech32Address!]: [...currentTokens, contractAddress],
    });
  };

  const removeUserToken = (contractAddress: string) => {
    setUserTokens({
      ...userTokens,
      [account?.bech32Address!]: currentTokens.filter(
        (address: any) => address !== contractAddress
      ),
    });
  };

  return (
    <GrazProvider
      grazOptions={{
        defaultChain: CustomChains.bostrom,
      }}
    >
      <div className="App">
        <div className="container">
          <AppStateContext.Provider
            value={{
              userTokens: currentTokens,
              addUserToken,
              removeUserToken,
              address,
              setAddress,
            }}
          >
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
                <Route path="/createPool" element={<CreatePool />}></Route>
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
  );
}

export default App;
