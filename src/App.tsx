import { useEffect } from "react";
import "./App.css";
import { Window as KeplrWindow } from "graz/dist/keplr";
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
