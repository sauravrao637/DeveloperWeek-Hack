import React, { useState, useEffect } from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';
import Web3 from 'web3';
import { addrNFT, addrStaking, addrToken, CHAIN_PARAMS } from './addresses'
import "./App.css";
const BigNumber = require('bignumber.js');

const Navbar = ({ walletAddress }) => {
  return (
    <div className="navbar">
      <div className="company-name">VaultBoost</div>
      <div className="navigation">
        <nav>
          <ul>
            <li>
              <Link to="/nftplace">NFT Collection</Link>
            </li>
            <li>
              <Link to="/">Staking</Link>
            </li>
            <div className="wallet-address">
              <li>{walletAddress}</li>
            </div>
          </ul>
        </nav>
      </div>
    </div>

  );
};

const HomePage = ({ connectWallet, walletAddress }) => {
  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <button style={styles.walletButton} onClick={connectWallet}>
          Connect Wallet
        </button>
      </div>
      <div style={styles.buttonContainer}>
        <button style={styles.button}>Contract 1</button>
        <button style={styles.button}>Contract 2</button>
      </div>
    </div>

  );
};


const Contract1Page = ({ myTotalNFTs, mintNFT, commonNFTCap, uncommonNFTCap, rareNFTCap, epicNFTCap, legendaryNFTCap, commonNFTPrice, uncommonNFTPrice, rareNFTPrice, epicNFTPrice, legendaryNFTPrice, commonCount, uncommonCount, rareCount, epicCount, legendaryCount }) => {
  console.log("C1Page, myTotalNFTs:- ", myTotalNFTs);

  return (
    <div style={styles.containers}>
      <h3 style={styles.sectionTitle}>Mint NFTs</h3>
      <div style={styles.carouselContainer}>
        <div style={styles.carousel}>
          <div style={styles.carouselItem}>
            <div style={styles.nftBox}>
              <img src="./common.jpg" alt="Common NFT" style={styles.nftImage} />
              <div style={styles.unclickableTab}>Common</div>
              <div>
                <span style={styles.infoLabel}>Price: </span>
                <span style={styles.infoValue}>{commonNFTPrice}</span>
              </div>
              <div>
                <span style={styles.infoLabel}>Supply Left: </span>
                <span style={styles.infoValue}>{commonNFTCap - commonCount}</span>
              </div>
              <div style={styles.buttonContainer}></div>
              <button style={styles.mintButton} onClick={() => mintNFT(0)}>
                Mint
              </button>
            </div>
          </div>
          <div style={styles.carouselItem}>
            <div style={styles.nftBox}>
              <img src="./uncommon.jpg" alt="Uncommon NFT" style={styles.nftImage} />
              <div style={styles.unclickableTab}>Uncommon</div>
              <div>
                <span style={styles.infoLabel}>Price: </span>
                <span style={styles.infoValue}>{uncommonNFTPrice}</span>
              </div>
              <div>
                <span style={styles.infoLabel}>Supply Left: </span>
                <span style={styles.infoValue}>{uncommonNFTCap - uncommonCount}</span>
              </div>
              <div style={styles.buttonContainer}></div>
              <button style={styles.mintButton} onClick={() => mintNFT(1)}>
                Mint
              </button>
            </div>
          </div>
          <div style={styles.carouselItem}>
            <div style={styles.nftBox}>
              <img src="./rare.jpg" alt="Rare NFT" style={styles.nftImage} />
              <div style={styles.unclickableTab}>Rare</div>
              <div>
                <span style={styles.infoLabel}>Price: </span>
                <span style={styles.infoValue}>{rareNFTPrice}</span>
              </div>
              <div>
                <span style={styles.infoLabel}>Supply Left: </span>
                <span style={styles.infoValue}>{rareNFTCap - rareCount}</span>
              </div>
              <div style={styles.buttonContainer}></div>
              <button style={styles.mintButton} onClick={() => mintNFT(2)}>
                Mint
              </button>
            </div>
          </div>
          <div style={styles.carouselItem}>
            <div style={styles.nftBox}>
              <img src="./epic.jpg" alt="Epic NFT" style={styles.nftImage} />
              <div style={styles.unclickableTab}>Epic</div>
              <div>
                <span style={styles.infoLabel}>Price: </span>
                <span style={styles.infoValue}>{epicNFTPrice}</span>
              </div>
              <div>
                <span style={styles.infoLabel}>Supply Left: </span>
                <span style={styles.infoValue}>{epicNFTCap - epicCount}</span>
              </div>
              <div style={styles.buttonContainer}></div>
              <button style={styles.mintButton} onClick={() => mintNFT(3)}>
                Mint
              </button>
            </div>
          </div>
          <div style={styles.carouselItem}>
            <div style={styles.nftBox}>
              <img src="./legendary.jpg" alt="Legendary NFT" style={styles.nftImage} />
              <div style={styles.unclickableTab}>Legendary</div>
              <div>
                <span style={styles.infoLabel}>Price: </span>
                <span style={styles.infoValue}>{legendaryNFTPrice}</span>
              </div>
              <div>
                <span style={styles.infoLabel}>Supply Left: </span>
                <span style={styles.infoValue}>{legendaryNFTCap - legendaryCount}</span>
              </div>
              <div style={styles.buttonContainer}></div>
              <button style={styles.mintButton} onClick={() => mintNFT(4)}>
                Mint
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  
  container: {
    background: '#000000',
    color: '#ffffff',
    height: '100vh',
    width: '100vw',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },

  header: {
    position: 'fixed',
    top: '10px',
    right: '10px',
  },
  walletButton: {
    background: '#ffffff',
    color: '#1a1a1a',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 12px',
    cursor: 'pointer',
  },
  content: {
    marginTop: '60px',
  },

  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '24px',
  },
  button: {
    background: '#ffffff',
    color: '#1a1a1a',
    border: 'none',
    borderRadius: '4px',
    padding: '8px 16px',
    margin: '0 12px',
    cursor: 'pointer',
  },
  containers: {
    background: '#222',
    color: '#fff',
    width: '100vw',
    height: '70vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  sectionTitle: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  },
  carouselContainer: {
    width: '100%',
    overflowX: 'hidden',
    display: 'flex',
    justifyContent: 'center',
  },

  carousel: {
    display: 'flex',
  },
  carouselItem: {
    margin: '10px',
  },
  nftBox: {
    background: '#333',
    color: '#fff',
    width: '200px',
    height: '350px',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transition: 'transform 0.3s ease',
  },
  nftImage: {
    width: '80%',
    height: 'auto',
    borderRadius: '8px',
    margin: '10px 0',
  },
  unclickableTab: {
    background: '#666',
    color: '#fff',
    padding: '5px 10px',
    borderRadius: '4px',
    marginBottom: '10px',
  },
  mintButton: {
    background: '#fff',
    color: '#222',
    border: 'none',
    borderRadius: '4px',
    padding: '10px 20px',
    cursor: 'pointer',
  },
  nftBoxHighlighted: {
    transform: 'translateY(-5px)',
    boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
  },
  infoLabel: {
    fontSize: '16px',
    fontWeight: 'bold',
  },
  infoValue: {
    fontSize: '16px',
    marginLeft: '5px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10px',
  },
};



const Contract2Page = ({ amIStaker, rewardAccumulated, claimReward, stakeWallet, getRewardAccumulated, supplyRatio, tokenAddress }) => {
  return (
    <div className="Stake-container">
      <div className="dark-page">
        <div className="column">
          <div className="box">
            <h3 className="heading">Token Address</h3>
            <div className="bigger-box">
              <div className="address-tab">
                {tokenAddress}
              </div>
              {!amIStaker &&
                <button className="stake-button" onClick={() => stakeWallet()}>Stake Wallet</button>
              }
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
  const [camoTokenInstance, setTokenInstance] = useState(null);

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

  // tokenVariables
  const [tokenBalance, setTokenBalance] = useState('')

  useEffect(() => {
    connectWallet();
  }, []);

  useEffect(() => {
    if (!web3) {
      console.error("web3 is NULL")
      return;
    }
    loadContracts();
  }, [web3]);

  useEffect(() => {
    if (!camoNFTInstance) {
      console.error("camoNFTInstance is NULL")
      return;
    }
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
    if (!camoStakingInstance) {
      console.error("camoStakingInstance is NULL")
      return;
    }
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

  useEffect(() => {
    if (!camoTokenInstance) {
      console.error("camoTokenInstance is NULL")
      return;
    }
    getTokenBalance()
  }, [camoTokenInstance])



  const connectWallet = async () => {
    console.log("connectWallet() called")

    try {
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [CHAIN_PARAMS],
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
    console.log("loadContracts() called")

    try {
      if (!web3) throw new Error("Web3 is null")
      loadNFTContract()
      loadStakingContract()
      loadTokenContract()
    } catch (error) {
      console.error(error);
    }
  }

  const loadNFTContract = async () => {
    console.log("loadNFTContract() called")

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
    console.log("loadStakingContract() called")

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

  const loadTokenContract = async () => {
    console.log("loadTokenContract() called")

    try {
      console.log("web3:- ", web3);
      const web3Instance = web3; // Access the web3 state variable
      let { abi } = require('./contract_abis/CamoToken.json');
      const camoTokenAbi = { abi }

      console.log("camoTokenAbi:- ", camoTokenAbi);

      const camoTokenInstance = new web3Instance.eth.Contract(camoTokenAbi.abi, addrToken);

      console.log("camoTokenInstance:- ", camoTokenInstance);
      setTokenInstance(camoTokenInstance);
    } catch (error) {
      console.error(error)
    }
  }


  // NFT Functions
  const getNFTBasePrice = async () => {
    console.log("getNFTBasePrice() called")

    try {
      const result = await camoNFTInstance.methods.BASE_PRICE().call();
      console.log("NFT BasePrice = ", result);
      setNFTBasePrice(result)
    } catch (error) {
      console.error(error)
    }
  }

  const getMyTotalNFTs = async () => {
    console.log("getMyTotalNFTs() called")

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
    console.log("getNFTCap(_) called", rarity)

    try {
      const result = await camoNFTInstance.methods.getCap(rarity).call();
      console.log("rarity", rarity, " cap ", result)
      setNFTCapByRarity(rarity, result);
    } catch (error) {
      console.error(error)
    }
  }

  const getNFTCount = async (rarity) => {
    console.log("getNFTCount(_) called ", rarity)

    try {
      const result = await camoNFTInstance.methods.getCount(rarity).call();
      console.log("rarity", rarity, " count ", result)
      setNFTCountByRarity(rarity, result)
    } catch (error) {
      console.error(error)
    }
  }

  const getNFTPrice = async (rarity) => {
    console.log("getNFTPrice(_) called ", rarity)

    try {
      const result = await camoNFTInstance.methods.getPrice(rarity).call();
      console.log("rarity", rarity, " prcie ", result)
      setNFTPriceByRarity(rarity, result)
    } catch (error) {
      console.error(error)
    }
  }

  const mintNFT = async (rarity) => {
    console.log("mintNFT(_) called ", rarity)
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
    console.log("claimReward() called")

    try {
      const result = await camoStakingInstance.methods.claimReward().send({ from: window.web3.currentProvider.selectedAddress });
      console.log("claimReward result:- ", result);
    } catch (error) {
      console.error(error);
    }
  }

  const stakeWallet = async () => {
    console.log("stakeWallet() called")

    try {
      const result = await camoStakingInstance.methods.stakeWallet().send({ from: window.web3.currentProvider.selectedAddress });
      console.log("stake wallet result:- ", result);
    } catch (error) {
      console.error(error);
    }
  }

  const checkStaker = async () => {
    console.log("checkStaker() called")

    try {
      const result = await camoStakingInstance.methods.amIStaker.call({ from: window.web3.currentProvider.selectedAddress });
      console.log("staker status: ", result);
      setStakerStatus(true)
    } catch (error) {
      console.error(error);
      console.log("staker status: ", false);
      setStakerStatus(false)
    }
  }

  const getRewardRate = async (rarity) => {
    console.log("getRewardRate(_) called ", rarity)

    try {
      const result = await camoStakingInstance.methods.getRate(rarity).call();
      console.log("reward rate for ", rarity, " is", result);
      setRewardRateByRarity(rarity, result);
    } catch (error) {
      console.error(error);
    }
  }

  const getSupplyRatio = async () => {
    console.log("getSupplyRatio() called")

    try {
      const result = await camoStakingInstance.methods.getSupplyRatio().call();
      const sr = (new BigNumber(result.toString())).dividedBy(10 ** 16);
      console.log("supply ratio =", sr.toString());
      setSupplyRatio(sr.toString() + "%");
    } catch (error) {
      console.error(error);
    }
  }

  const getLeftSupply = async () => {
    console.log("getLeftSupply() called")

    try {
      const result = await camoStakingInstance.methods.leftSupply().call();
      console.log("left supply = ", result.toString());
      setLeftSupply(result.toString());
    } catch (error) {
      console.error(error)
    }
  }

  const getRewardAccumulated = async () => {
    console.log("getRewardAccumulated() called")

    try {
      const result = await camoStakingInstance.methods.rewardAccumulated().call({ from: window.web3.currentProvider.selectedAddress });
      const ra = (new BigNumber(result.toString())).dividedBy(10 ** 18);
      console.log("accumulated = ", ra.toString())
      setRewardAccumulated(ra.toString())
    } catch (error) {
      console.error(error);
    }
  }

  // Token functions

  const getTokenBalance = async () => {
    try {
      console.log("getTokenBalance() called")
      const result = await camoTokenInstance.methods.balanceOf(window.web3.currentProvider.selectedAddress).call()
      const tb = (new BigNumber(result.toString())).dividedBy(10 ** 18);
      console.log("token balance", tb.toString())
      setTokenBalance(tb.toString())
    } catch (error) {
      console.error(error)
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
          {/* <Route path="/" element={<HomePage walletAddress={walletAddress} />} /> */}

          <Route path="/nftplace" element={<Contract1Page myTotalNFTs={myTotalNFTs} mintNFT={mintNFT} commonNFTCap={commonNFTCap} uncommonNFTCap={uncommonNFTCap} rareNFTCap={rareNFTCap} epicNFTCap={epicNFTCap} legendaryNFTCap={legendaryNFTCap} commonNFTPrice={commonNFTPrice} uncommonNFTPrice={uncommonNFTPrice} rareNFTPrice={rareNFTPrice} epicNFTPrice={epicNFTPrice} legendaryNFTPrice={legendaryNFTPrice} commonCount={commonCount} uncommonCount={uncommonCount} rareCount={rareCount} epicCount={epicCount} legendaryCount={legendaryCount} />} />

          <Route path="/" element={<Contract2Page amIStaker={amIStaker} rewardAccumulated={rewardAccumulated} claimReward={claimReward} stakeWallet={stakeWallet} getRewardAccumulated={getRewardAccumulated} supplyRatio={supplyRatio} tokenAddress={addrToken} />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
