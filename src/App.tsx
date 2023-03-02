import { useEffect } from "react";
import "./App.css";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import MainPage from "./components/MainPage/MainPage";
import Footer from "./components/Footer/Footer";
import LegalPage from "./components/LegalPage/LegalPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { configKeplr, CYBER } from "./utils/config";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HeaderSpoiler from "./components/HeaderSpoiler/HeaderSpoiler";
import Main from "./components/Main/Main";
import NewButton from "./components/newButton/newButton";
import Swap from "./components/Swap/Swap";
import ManageAssets from "./components/ManageAssets/ManageAssets";

declare global {
  interface Window extends KeplrWindow {}
}

function App() {
  return (
    <div className="App">
      <div className="container">
        <Router>
          <HeaderSpoiler />
          <Routes>
            <Route path="/" element={<Main />}></Route>
            <Route path="/legalinfo" element={<LegalPage />}></Route>
            <Route path="/create" element={<MainPage />}></Route>
            <Route path="/newBT" element={<NewButton />}></Route>
            <Route path="/swap" element={<Swap />}></Route>
            <Route path="/manage-assets" element={<ManageAssets />}></Route>
          </Routes>
          <Footer />
        </Router>

        <ToastContainer autoClose={false} />
      </div>
    </div>
  );
}

export default App;
