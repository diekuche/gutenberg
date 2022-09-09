import "./App.css";
import Header from "./Header/Header";
import Input from "./components/Input/Input"
import Collapsible from "./components/Collapsible/Collapsible"

function App() {
  return (
    <div className="App font-link">
      <Header />
      <Input />
      <Collapsible 
        title="+Change Initial Balances"
        children="changed"
      />
    </div>
  );
}

export default App;
