import { useEffect, useState } from "react";
import { ethers, providers } from "ethers";

// Components
import Navigation from "./components/Navigation";
import Search from "./components/Search";
import Domain from "./components/Domain";

// ABIs
import BlocksDaddy from "./abis/BlocksDaddy.json";

// Config
import config from "./config.json";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);

  const loadBlockchainData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    const network = await provider.getNetwork();
    console.log(network);

    window.ethereum.on("accountsChanged", async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    });
    // const accounts = await window.ethereum.request({
    //   method: "eth_requestAccounts",
    // });
    // const account = ethers.utils.getAddress(accounts[0]);
    // console.log(account);
    // setAccount(account);
  };

  useEffect(() => {
    loadBlockchainData();
  }, []);

  return (
    <div>
      <Navigation account={account} setAccount={setAccount} />
      <Search />
      <div className="cards__section">
        <h2 className="cards__title">Why you need a domain name.</h2>
        <p className="cards__description">
          Own your custom username, use it across services, and be able to store
          an avatar and other profile data.
        </p>

        <hr />
        <div className="cards"></div>
      </div>
    </div>
  );
}

export default App;
