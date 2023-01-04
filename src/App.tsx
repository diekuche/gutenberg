import { useEffect } from "react";
import "./App.css";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import MainPage from "./components/MainPage/MainPage";
import Footer from "./components/Footer/Footer";
import LegalInform from "./components/LegalInformation/LegalInform";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { configKeplr, CYBER } from "./utils/config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderSpoiler from "./components/HeaderSpoiler/HeaderSpoiler";
import BasicWindow from "./components/BasicWindow/BasicWindow";
import ManageTok from "./components/ManageTok/ManageTok";

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
          <div className="colorhead">
            <HeaderSpoiler />
            <BasicWindow />
          </div>
          <div className="colorsecond">
            <ManageTok />
            <Routes>
              <Route path="/legalinfo" element={<LegalInform />}></Route>
              <Route path="/old" element={<MainPage />}></Route>
            </Routes>
            <Footer />
          </div>
        </Router>

        <ToastContainer autoClose={false} />
      </div>
    </div>
  );
}

export default App;
