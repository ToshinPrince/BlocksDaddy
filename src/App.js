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
import { use } from "chai";

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  const [blocksDaddy, setBlocksDaddy] = useState(null);
  const [domains, setDomains] = useState([]);

  const loadBlockchainData = async () => {
    //Provider
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    setProvider(provider);

    //Network
    const network = await provider.getNetwork();

    //js Instance of Contract
    const blocksDaddy = new ethers.Contract(
      config[network.chainId].BlocksDaddy.address,
      BlocksDaddy,
      provider
    );
    setBlocksDaddy(blocksDaddy);

    const maxSupply = await blocksDaddy.maxSupply();

    const domains = [];
    for (var i = 1; i <= maxSupply; i++) {
      const domain = await blocksDaddy.getDomain(i);
      domains.push(domain);
    }
    setDomains(domains);

    //On Account Change
    window.ethereum.on("accountsChanged", async () => {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
    });
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
        <div className="cards">
          {domains.map((domain, index) => (
            <Domain
              key={index}
              domain={domain}
              blocksDaddy={blocksDaddy}
              provider={provider}
              id={index + 1}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
