import { useEffect } from "react";
import "./App.css";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import MainPage from "./components/MainPage/MainPage";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LegalInform from "./components/Legal Information/LegalInform";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { configKeplr, CYBER } from "./utils/config";

declare global {
  interface Window extends KeplrWindow {}
}

function App() {
  const initKeplr = async () => {
    if (window.keplr) {
      await window.keplr.experimentalSuggestChain(configKeplr("bostrom"));
      await window.keplr.enable(CYBER.CHAIN_ID);
      console.log("init");
    }
  };

  useEffect(() => {
    initKeplr();
  }, []);

  return (
    <div className="App">
      <div className="container">
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<MainPage />}></Route>
            <Route path="/legalinfo" element={<LegalInform />}></Route>

            <Route path="/Legal Information" element={<LegalInform />} />
          </Routes>
          <Footer />
        </Router>
      </div>
    </div>
  );
}

export default App;
