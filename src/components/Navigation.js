import { ethers } from "ethers";
import logo from "../assets/logo.svg";

const Navigation = ({ account, setAccount }) => {
  return (
    <nav>
      <div className="nav__brand">
        <img src={logo} alt="Logo" />
        <h1>ETH Daddy</h1>

        <ul className="nav__links">
          <li>
            <a href="/">Domain Names</a>
          </li>
          <li>
            <a href="/">Websites & Hosting</a>
          </li>
          <li>
            <a href="/">Commerce</a>
          </li>
          <li>
            <a href="/">Email & Marketing</a>
          </li>
        </ul>
      </div>
      <button>{account.slice(0, 6)}</button>
    </nav>
  );
};

export default Navigation;
