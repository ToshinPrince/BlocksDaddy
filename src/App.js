import { useEffect, useState } from "react";
import { ethers } from "ethers";

// Components
import Navigation from "./components/Navigation";
import Search from "./components/Search";
import Domain from "./components/Domain";

// ABIs
import BlocksDaddy from "./abis/BlocksDaddy.json";

// Config
import config from "./config.json";

function App() {
  const [account, setAccount] = useState(null);

  const loadBlockchianData = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = ethers.utils.getAddress(accounts[0]);
    console.log(account);
    setAccount(account);
  };

  useEffect(() => {
    loadBlockchianData();
  }, []);

  return (
    <div>
      <div className="cards__section">
        <Navigation account={account} setAccount={setAccount} />
        <h2 className="cards__title">Welcome to Blocks Daddy</h2>
      </div>
    </div>
  );
}

export default App;
