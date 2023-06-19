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


const Contract1Page = ({ myTotalNFTs, mintNFT, commonNFTCap, uncommonNFTCap, rareNFTCap, epicNFTCap, legendaryNFTCap, commonNFTPrice, uncommonNFTPrice, rareNFTPrice, epicNFTPrice, legendaryNFTPrice, commonCount, uncommonCount, rareCount, epicCount, legendaryCount }) => {

  console.log("C1Page, myTotalNFTs:- ", myTotalNFTs)

  return (
    <div className="container">
      <h3 className="section-title">Mint NFTs</h3>
      <div>myTotalNFTs = {myTotalNFTs}</div>
      <div className="nft-boxes">
        <div className="nft-box">
          <img src="./common.jpg" alt="Rare NFT" />
          <div className="unclickable-tab">Rare</div> <br />
          <button className="mintNFT" onClick={() => mintNFT(0)}> Mint </button>
        </div>
        <div className="nft-box">
          <img src="./uncommon.jpg" alt="Rare NFT" />
          <div className="unclickable-tab">Common</div> <br />
          <button className="mintNFT" onClick={() => mintNFT(1)}> Mint </button>
        </div>
        <div className="nft-box">
          <img src="./rare.jpg" alt="Rare NFT" />
          <div className="unclickable-tab">Epic</div> <br />
          <button className="mintNFT" onClick={() => mintNFT(2)}> Mint </button>
        </div>
        <div className="nft-box">
          <img src="./epic.jpg" alt="Rare NFT" />
          <div className="unclickable-tab">Rare</div> <br />
          <button className="mintNFT" onClick={() => mintNFT(3)}> Mint </button>
        </div>
        <div className="nft-box">
          <img src="./legendary.jpg" alt="Rare NFT" />
          <div className="unclickable-tab">Legendary</div> <br />
          <button className="mintNFT" onClick={() => mintNFT(4)}> Mint </button>
        </div>
      </div>
    </div>
  );
};

const Contract2Page = ({ amIStaker, rewardAccumulated, claimReward, stakeWallet, getRewardAccumulated, supplyRatio, tokenAddress }) => {
  return (
    <div className="container">
      <div className="dark-page">
        <div className="column">
          <div className="box">
            <h3 className="heading">Token Address</h3>
            <div className="bigger-box">
              <div className="address-tab">
                {tokenAddress}
              </div>
              <button className="stake-button" onClick={() => stakeWallet()}>Stake Wallet</button>
              <div className="nested-box">
                <h3 className="heading">Supply Ratio</h3>
                <div className="ratio-tab">{supplyRatio}</div>
                <h3 className="heading">Reward Accumulated</h3>
                <div className="ratio-tab">{rewardAccumulated}</div>
                <button className="claim-button" onClick={() => claimReward()}>Claim Rewards</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const App = () => {
  const [walletAddress, setWalletAddress] = useState('');
  const [web3, setWeb3] = useState(null);
  const [camoNFTInstance, setNFTInstance] = useState(null);
  const [camoStakingInstance, setStakingInstance] = useState(null);

  // NFT Variables
  const [nftBasePrice, setNFTBasePrice] = useState(0);
  const [myTotalNFTs, setMyTotalNFTs] = useState(0);

  const [commonNFTCap, setCommonNFTCap] = useState(0);
  const [uncommonNFTCap, setUncommonNFTCap] = useState(0);
  const [rareNFTCap, setRareNFTCap] = useState(0);
  const [epicNFTCap, setEpicNFTCap] = useState(0);
  const [legendaryNFTCap, setLegendaryNFTCap] = useState(0);

  const [commonCount, setCommonNFTCount] = useState(0);
  const [uncommonCount, setUncommonNFTCount] = useState(0);
  const [rareCount, setRareNFTCount] = useState(0);
  const [epicCount, setEpicNFTCount] = useState(0);
  const [legendaryCount, setLegendaryNFTCount] = useState(0);

  const [commonNFTPrice, setCommonNFTPrice] = useState(0);
  const [uncommonNFTPrice, setUncommonNFTPrice] = useState(0);
  const [rareNFTPrice, setRareNFTPrice] = useState(0);
  const [epicNFTPrice, setEpicNFTPrice] = useState(0);
  const [legendaryNFTPrice, setLegendaryNFTPrice] = useState(0);

  // Staking Variables
  const [amIStaker, setStakerStatus] = useState(false);
  const [baseRewardRateCommon, setBaseRewardRateCommon] = useState(0);
  const [baseRewardRateUncommon, setBaseRewardRateUncommon] = useState(0);
  const [baseRewardRateRare, setBaseRewardRateRare] = useState(0);
  const [baseRewardRateEpic, setBaseRewardRateEpic] = useState(0);
  const [baseRewardRateLegendary, setBaseRewardRateLegendary] = useState(0);
  const [supplyRatio, setSupplyRatio] = useState('');
  const [leftSupply, setLeftSupply] = useState('');
  const [rewardAccumulated, setRewardAccumulated] = useState('');


  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    loadContracts();
  }, [web3]);

  useEffect(() => {
    getNFTBasePrice();
    getMyTotalNFTs();
    let i = 0;
    do {
      getNFTCap(i);
      getNFTCount(i);
      getNFTPrice(i);
      i++;
    } while (i < 5);
  }, [camoNFTInstance])

  useEffect(() => {
    checkStaker()
    let i = 0;
    do {
      getRewardRate(i);
      i++;
    } while (i < 5);
    // 
    getSupplyRatio()
    getLeftSupply()
    getRewardAccumulated()

  }, [camoStakingInstance])


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
        params: [ALFAJORES_PARAMS],
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

  const loadContracts = () => {
    try {
      if (!web3) throw new Error("Web3 is null")
      loadNFTContract()
      loadStakingContract()
    } catch (error) {
      console.error(error);
    }
  }

  const loadNFTContract = async () => {
    try {
      console.log("web3:- ", web3);
      const web3Instance = web3; // Access the web3 state variable
      let { abi } = require('./contract_abis/CamoNFT.json');
      const camoNFTAbi = { abi }

      console.log("camoNFTAbi:- ", camoNFTAbi);

      const camoNFTInstance = new web3Instance.eth.Contract(camoNFTAbi.abi, addrNFT);

      console.log("camoNFTInstance:- ", camoNFTInstance);
      setNFTInstance(camoNFTInstance);
    } catch (error) {
      console.error(error)
    }
  }

  const loadStakingContract = async () => {
    try {
      console.log("-----------------loading staking contract-----------------")
      console.log("web3:- ", web3);
      const web3Instance = web3; // Access the web3 state variable
      let { abi } = require('./contract_abis/CamoStaking.json');
      const camoStakingAbi = { abi }

      console.log("camoStakingAbi:- ", camoStakingAbi);

      const camoStakingInstance = new web3Instance.eth.Contract(camoStakingAbi.abi, addrStaking);

      console.log("camoStakingInstance:- ", camoStakingInstance);
      setStakingInstance(camoStakingInstance);
      console.log("-----------------success loading staking contract-----------------")
    } catch (error) {
      console.log(error)
      console.log("-----------------failed loading staking contract-----------------")
    }
  }
  // NFT Functions
  const getNFTBasePrice = async () => {
    try {
      const result = await camoNFTInstance.methods.BASE_PRICE().call();
      console.log("NFT BasePrice = ", result);
      setNFTBasePrice(result)
    } catch (error) {
      console.error(error)
    }
  }

  const getMyTotalNFTs = async () => {
    try {
      const result = await camoNFTInstance.methods
        .balanceOf(window.web3.currentProvider.selectedAddress)  //function in contract
        .call();
      console.log("mY Total NFTs = ", result);
      setMyTotalNFTs(result);
    } catch (error) {
      console.error(error);
    }
  }

  const getNFTCap = async (rarity) => {
    try {
      const result = await camoNFTInstance.methods.getCap(rarity).call();
      console.log("rarity", rarity, " cap ", result)
      setNFTCapByRarity(rarity, result);
    } catch (error) {
      console.error(error)
    }
  }

  const getNFTCount = async (rarity) => {
    try {
      const result = await camoNFTInstance.methods.getCount(rarity).call();
      console.log("rarity", rarity, " count ", result)
      setNFTCountByRarity(rarity, result)
    } catch (error) {
      console.error(error)
    }
  }

  const getNFTPrice = async (rarity) => {
    try {
      const result = await camoNFTInstance.methods.getPrice(rarity).call();
      console.log("rarity", rarity, " prcie ", result)
      setNFTPriceByRarity(rarity, result)
    } catch (error) {
      console.error(error)
    }
  }

  const mintNFT = async (rarity) => {
    try {
      const price = web3.utils.toWei(getPriceByRarity(rarity).toString(), "wei");
      console.log("priceInWei ", price)
      const result = await camoNFTInstance.methods.mintNFT(rarity).send({ from: window.web3.currentProvider.selectedAddress, value: price });
      console.log("minNFT", result)
    } catch (error) {
      console.error(error)
    }
  }

  // Staking Functions

  const claimReward = async () => {
    try {
      const result = await camoStakingInstance.methods.claimReward().call({ from: window.web3.currentProvider.selectedAddress });
      console.log("claimReward result:- ", result);
    } catch (error) {
      console.error(error);
    }
  }

  const stakeWallet = async () => {
    try {
      const result = await camoStakingInstance.methods.stakeWallet().send({ from: window.web3.currentProvider.selectedAddress });
      console.log("stake wallet result:- ", result);
    } catch (error) {
      console.error(error);
    }
  }

  const checkStaker = async () => {
    try {
      const result = await camoStakingInstance.methods.amIStaker.call();
      console.log("staker status: ", true);
      setStakerStatus(true)
    } catch (error) {
      console.error(error);
      console.log("staker status: ", false);
      setStakerStatus(false)
    }
  }

  const getRewardRate = async (rarity) => {
    try {
      const result = await camoStakingInstance.getRate(rarity).call();
      console.log("reward rate for ", rarity, " is", result);
      setRewardRateByRarity(rarity, result);
    } catch (error) {
      console.error(error);
    }
  }

  const getSupplyRatio = async () => {
    try {
      const result = await camoStakingInstance.getSupplyRatio().call();
      console.log("supply ratio =", result.toString());
      setSupplyRatio(result.toString);
    } catch (error) {
      console.error(error);
    }
  }

  const getLeftSupply = async () => {
    try {
      const result = await camoStakingInstance.leftSupply().call();
      console.log("left supply = ", result.toString());
      setLeftSupply(result.toString());
    } catch (error) {
      console.error(error)
    }
  }

  const getRewardAccumulated = async () => {
    try {
      const result = await camoStakingInstance.rewardAccumulated().call();
      console.log("accumulated = ", result.toString())
      setRewardAccumulated(result.toString())
    } catch (error) {
      console.error(error);
    }
  }


  // utility functions

  const getPriceByRarity = (rarity) => {
    if (rarity === 0) return commonNFTPrice;
    if (rarity === 1) return uncommonNFTPrice;
    if (rarity === 2) return rareNFTPrice;
    if (rarity === 3) return epicNFTPrice;
    if (rarity === 4) return legendaryNFTPrice;
  }

  const setNFTCapByRarity = (rarity, result) => {
    if (rarity === 0) setCommonNFTCap(result);
    else if (rarity === 1) setUncommonNFTCap(result);
    else if (rarity === 2) setRareNFTCap(result);
    else if (rarity === 3) setEpicNFTCap(result);
    else if (rarity === 4) setLegendaryNFTCap(result);
  }

  const setNFTCountByRarity = (rarity, result) => {
    if (rarity === 0) setCommonNFTCount(result);
    else if (rarity === 1) setUncommonNFTCount(result);
    else if (rarity === 2) setRareNFTCount(result);
    else if (rarity === 3) setEpicNFTCount(result);
    else if (rarity === 4) setLegendaryNFTCount(result);
  }

  const setNFTPriceByRarity = (rarity, result) => {
    if (rarity === 0) setCommonNFTPrice(result);
    else if (rarity === 1) setUncommonNFTPrice(result);
    else if (rarity === 2) setRareNFTPrice(result);
    else if (rarity === 3) setEpicNFTPrice(result);
    else if (rarity === 4) setLegendaryNFTPrice(result);
  }

  const setRewardRateByRarity = (rarity, result) => {
    if (rarity === 0) setBaseRewardRateCommon(result);
    else if (rarity === 1) setBaseRewardRateUncommon(result);
    else if (rarity === 2) setBaseRewardRateRare(result);
    else if (rarity === 3) setBaseRewardRateEpic(result);
    else if (rarity === 4) setBaseRewardRateLegendary(result);
  }

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <div>
        <Navbar walletAddress={walletAddress} />
        <Routes>
          <Route path="/" element={<HomePage walletAddress={walletAddress} />} />

          <Route path="/contract1" element={<Contract1Page myTotalNFTs={myTotalNFTs} mintNFT={mintNFT} commonNFTCap={commonNFTCap} uncommonNFTCap={uncommonNFTCap} rareNFTCap={rareNFTCap} epicNFTCap={epicNFTCap} legendaryNFTCap={legendaryNFTCap} commonNFTPrice={commonNFTPrice} uncommonNFTPrice={uncommonNFTPrice} rareNFTPrice={rareNFTPrice} epicNFTPrice={epicNFTPrice} legendaryNFTPrice={legendaryNFTPrice} commonCount={commonCount} uncommonCount={uncommonCount} rareCount={rareCount} epicCount={epicCount} legendaryCount={legendaryCount} />} />

          <Route path="/contract2" element={<Contract2Page amIStaker={amIStaker} rewardAccumulated={rewardAccumulated} claimReward={claimReward} stakeWallet={stakeWallet} getRewardAccumulated={getRewardAccumulated} supplyRatio={supplyRatio} tokenAddress={addrToken} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
