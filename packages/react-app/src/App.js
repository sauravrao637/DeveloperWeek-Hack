import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Web3 from 'web3';
import { addrNFT, addrStaking, addrToken } from './addresses'
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

const getBalance = async ({ camoNFTInstance }) => {
  try {
    let response = await camoNFTInstance.methods
      .balanceOf(window.web3.currentProvider.selectedAddress)  //function in contract
      .call({
        from: window.web3.currentProvider.selectedAddress,
      });
    console.log("response: ", response);
    return response;
  } catch (error) {
    console.error(error)
    return -1;
  }
}
const Contract1Page = ({ camoNFTInstance }) => {
  console.log("C1Page, camoNFTInstance:- ", camoNFTInstance)
  const [balance, setBalance] = useState('_');
  useEffect(() => {
    console.log('CamoNFTInstance updated:', camoNFTInstance);
    if (camoNFTInstance) {
      getBalance({ camoNFTInstance }).then(response => {
        setBalance(response)
      });
    }
  }, [camoNFTInstance]);
  return (
    <div>
      <h1>Contract 1 Page</h1>
      <p>Wallet Address: {balance}</p>
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
  const [walletAddress, setWalletAddress] = useState('');
  const [web3, setWeb3] = useState(null);
  const [camoNFTInstance, setNFTInstance] = useState(null);
  const [camoStakingInstance, setStakingInstance] = useState(null);

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    loadContracts();
  }, [web3]);

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
        setWeb3(web3);
      } else {
        console.error('Metamask extension not detected');
      }
    } catch (error) {
      console.error(error);
      alert('Failed to connect Metamask. Please try again.');
    }
  };

  const loadContracts = async () => {
    try {
      console.log("web3:- ", web3);
      const web3Instance = web3; // Access the web3 state variable

      let { abi } = require('./contract_abis/CamoNFT.json');
      const camoNFTAbi = { abi }
      console.log("camoNFTAbi:- ", camoNFTAbi);
      const camoNFTInstance = new web3Instance.eth.Contract(camoNFTAbi.abi, addrNFT);
      console.log("camoNFTInstance:- ", camoNFTInstance);


      // abi = require('./contract_abis/CamoStaking.json');
      // const camoStakingAbi = { abi };
      // const camoStakingInstance = new web3Instance.eth.Contract(camoStakingAbi.abi, addrStaking);
      // console.log("camoStaking:- ", camoStakingInstance);

      setNFTInstance(camoNFTInstance);
      // setStakingInstance(camoStakingInstance);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div>
        <Navbar walletAddress={walletAddress} />
        <Routes>
          <Route path="/" element={<HomePage connectWallet={connectWallet} walletAddress={walletAddress} />} />
          <Route path="/contract1" element={<Contract1Page camoNFTInstance={camoNFTInstance} />} />
          <Route path="/contract2" element={<Contract2Page camoStakingInstance={camoStakingInstance} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
