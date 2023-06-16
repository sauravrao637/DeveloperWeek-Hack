// SPDX-License-Identifier: GPL-3.0-only
// Author:- @sauravrao637
pragma solidity ^0.8.18;

import "./CamoNFT.sol";
import "./CamoToken.sol";

contract CamoStaking is Ownable {
    struct Staker {
        uint256 userJoinedTS;
        uint256 reward;
    }

    uint256 public leftSupply;

    mapping(address => Staker) stakers;
    address[] stakingAddress;

    uint256 public tier1Rate;
    uint256 public tier2Rate = tier1Rate * 2;
    uint256 public tier3Rate = tier1Rate * 3;
    uint256 public tier4Rate = tier1Rate * 5;
    uint256 public tier5Rate = tier1Rate * 8;

    CamoToken public camoTokenAddress;

    CamoNFT public camoNFTAddress;

    address private serverAddress;

    event StakedWallet(address indexed user);

    event WithdrawnRewards(address indexed user, uint256 amount);

    constructor(uint256 baseRewardRate) {
        tier1Rate = baseRewardRate;
    }

    modifier onlyStaker() {
        require(stakers[msg.sender].userJoinedTS > 0, "Not a staker");
        _;
    }

    modifier onlyAuthorized() {
        require(serverAddress == msg.sender, "Non Stakable NFT");
        _;
    }

    function getMax(uint256 a, uint256 b) internal pure returns (uint256) {
        return a >= b ? a : b;
    }

    function setCamoNFTAddress(address _camoNFTAddress) public onlyOwner {
        require(address(camoNFTAddress) == address(0), "Already Set");
        camoNFTAddress = CamoNFT(_camoNFTAddress);
    }

    function setTokenAddressAndSendFunds(address _tokenAddress) public onlyOwner{
        camoTokenAddress = CamoToken(_tokenAddress);
        uint256 totalSupply = camoTokenAddress.MAX_SUPPLY();
        camoTokenAddress.transferFrom(msg.sender, address(this), totalSupply);
        leftSupply = totalSupply-1;
    }

    function setServerAddress(address _serverAddress) public onlyOwner{
        serverAddress = _serverAddress;
    }

    function getSupplyRatio() public view returns (uint256) {
        return (leftSupply * 10**18) / camoTokenAddress.MAX_SUPPLY();
    }

    function stakeWallet() public {
        stakers[msg.sender].userJoinedTS = block.timestamp;
        emit StakedWallet(msg.sender);
    }

    function claimReward() public onlyStaker {
        uint256 reward = stakers[msg.sender].reward;
        camoTokenAddress.transferFrom(address(this), msg.sender, reward);
    }

    function getNftById(uint256 tokenId)
        internal
        view
        returns (
            uint256,
            address,
            CamoNFT.RarityLevel,
            uint256,
            uint256
        )
    {
        return camoNFTAddress.nfts(tokenId);
    }

    function calculateIncentive(address _user) internal view returns (uint256) {
        uint256 incentiveAmount = 0;
        uint256[] memory tokens = camoNFTAddress.getOwnedTokens(_user);
        for (uint256 i = 0; i < tokens.length; i++) {
            (
                ,
                ,
                CamoNFT.RarityLevel rarity,
                uint256 entryTimestamp,
                uint256 stakeClaimedTimeStamp
            ) = getNftById(tokens[i]);
            uint256 lastStaked = getMax(entryTimestamp, stakeClaimedTimeStamp);
            uint256 holdingTime = ((block.timestamp - lastStaked) / 1 hours);
            uint256 rate = getRate(rarity);
            incentiveAmount += rate * holdingTime;
        }
        return incentiveAmount;
    }

    // Function to distribute incentives to all stakers based on the duration they hold the NFTs
    function distributeIncentives() external onlyAuthorized {
        uint256 total = 0;
        uint256 currSupplyRatio = getSupplyRatio();
        for (uint256 i = 0; i < stakingAddress.length; i++) {
            address _user = stakingAddress[i];
            uint256 reward = currSupplyRatio * calculateIncentive(_user);
            camoNFTAddress.updateTimestamp(_user);
            stakers[_user].reward += reward;
            total += reward;
        }
        leftSupply -= total;
    }

    function getRate(CamoNFT.RarityLevel rarity) public view returns (uint256) {
        if (rarity == CamoNFT.RarityLevel.Common) {
            return tier1Rate;
        } else if (rarity == CamoNFT.RarityLevel.Uncommon) {
            return tier2Rate;
        } else if (rarity == CamoNFT.RarityLevel.Rare) {
            return tier3Rate;
        } else if (rarity == CamoNFT.RarityLevel.Epic) {
            return tier4Rate;
        } else if (rarity == CamoNFT.RarityLevel.Legendary) {
            return tier5Rate;
        }
        revert("Invalid rarity level");
    }
}
