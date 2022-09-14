import { useEffect } from "react";
import "./App.css";
<<<<<<< HEAD
=======
import { Window as KeplrWindow } from "@keplr-wallet/types";
>>>>>>> e292aca66ea57e74fba4e6d586069303ccc4dd9a
import MainPage from "./components/MainPage/MainPage";
import { getAddress, getBalance } from "./utils/wallet";

declare global {
  interface Window extends KeplrWindow {}
}

function App() {
  const fetchBalance = async () => {
    const balance = await getBalance();
    console.log("balance", balance);
  };

  const fetchAddress = async () => {
    const address = await getAddress();
    console.log("address", address);
  };

  useEffect(() => {
    fetchBalance();
    fetchAddress();
  }, []);

  return (
    <div className="App font-link">
      <MainPage />
    </div>
  );
}

export default App;
