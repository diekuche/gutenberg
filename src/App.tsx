import { useEffect } from "react";
import "./App.css";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import MainPage from "./components/MainPage/MainPage";
import { getBalance } from "./utils/getBalance";

declare global {
  interface Window extends KeplrWindow {}
}

function App() {
  const getBalance1 = async () => {
    const balance = await getBalance();
    console.log("balance", balance);
  };

  useEffect(() => {
    getBalance1();
  }, []);

  return (
    <div className="App font-link">
      <MainPage />
    </div>
  );
}

export default App;
