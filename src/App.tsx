import "./App.css";
import { Window as KeplrWindow } from "@keplr-wallet/types";
import MainPage from "./components/MainPage/MainPage";
declare global {
  interface Window extends KeplrWindow {}
}

function App() {
  return (
    <div className="App font-link">
      <MainPage />
    </div>
  );
}

export default App;
