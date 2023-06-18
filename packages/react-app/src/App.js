import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Web3 from 'web3';

const Navbar = ({ walletAddress }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/contract1">Contract 1</Link>
        </li>
        <li>
          <Link to="/contract2">Contract 2</Link>
        </li>
        <li>Wallet Address: {walletAddress}</li>
      </ul>
    </nav>
  );
};

const HomePage = ({ connectWallet, walletAddress }) => {
  return (
    <div>
      <h1>Homepage</h1>
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
};

const Contract1Page = ({ walletAddress }) => {
  return (
    <div>
      <h1>Contract 1 Page</h1>
      <p>Wallet Address: {walletAddress}</p>
    </div>
  );
};

const Contract2Page = ({ walletAddress }) => {
  return (
    <div>
      <h1>Contract 2 Page</h1>
      <p>Wallet Address: {walletAddress}</p>
    </div>
  );
};

const App = () => {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');

  useEffect(() => {
    connectWallet();
  }, []);
  const ALFAJORES_PARAMS = {
    chainId: "0xaef3",
    chainName: "Alfajores Testnet",
    nativeCurrency: { name: "Alfajores Celo", symbol: "A-CELO", decimals: 18 },
    rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
    blockExplorerUrls: ["https://alfajores-blockscout.celo-testnet.org/"],
    iconUrls: ["future"],
  };

  const CANNOLI_PARAMS = {
    chainId: "0x43ab",
    chainName: "Cannoli Testnet",
    nativeCurrency: { name: "Cannoli Celo", symbol: "CELO", decimals: 18 },
    rpcUrls: ["https://forno.cannoli.celo-testnet.org"],
    blockExplorerUrls: ["https://explorer.celo.org/cannoli/"],
    iconUrls: ["future"],
  };

  const connectWallet = async () => {
    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [CANNOLI_PARAMS],
      });
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();

        // Get the selected account
        const accounts = await web3.eth.getAccounts();
        const address = accounts[0];

        setWalletAddress(address);
      } else {
        console.error('Metamask extension not detected');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to connect Metamask. Please try again.');
    }
  };

  const getWalletAddress = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        setWalletAddress(accounts[0]);
      }
    }
  };

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div>
        <Navbar walletAddress={walletAddress} />
        <Routes>
          <Route path="/" element={<HomePage connectWallet={connectWallet} walletAddress={walletAddress} />} />
          <Route path="/contract1" element={<Contract1Page walletAddress={walletAddress} />} />
          <Route path="/contract2" element={<Contract2Page walletAddress={walletAddress} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
