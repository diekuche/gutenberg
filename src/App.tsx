import { useEffect } from "react";
import "./App.css";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import MainPage from "./components/MainPage/MainPage";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import LegalInform from "./components/LegalInformation/LegalInform";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { configKeplr, CYBER } from "./utils/config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

declare global {
  interface Window extends KeplrWindow { }
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
          </Routes>
          <Footer />
        </Router>
        <ToastContainer autoClose={false} />
      </div>
    </div>
  );
}

export default App;
