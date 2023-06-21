// SPDX-License-Identifier: GPL-3.0-only
// Author:- @sauravrao637
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CamoNFT is ERC721, Ownable {
    enum RarityLevel {Common, Uncommon, Rare, Epic, Legendary}
    uint256 counter = 0;
    struct NFT {
        uint256 tokenId;
        address owner;
        RarityLevel rarity;
        uint256 entryTimestamp;
        uint256 stakeClaimedTimeStamp;
    }

    uint256 constant public BASE_PRICE = 100_000_000_000_000_000 wei;
    uint256 constant public COMMON_PRICE = BASE_PRICE *1;
    uint256 constant public UNCOMMON_PRICE = BASE_PRICE *2;
    uint256 constant public RARE_PRICE = BASE_PRICE *3;
    uint256 constant public EPIC_PRICE = BASE_PRICE *5;
    uint256 constant public LEGENDARY_PRICE = BASE_PRICE *8;

    uint256 constant public COMMON_CAP = 22500;
    uint256 constant public UNCOMMON_CAP = 2500;
    uint256 constant public RARE_CAP = 900;
    uint256 constant public EPIC_CAP = 100;
    uint256 constant public LEGENDARY_CAP = 25;

    mapping(uint256 => NFT) public nfts;
    mapping(address => uint256[]) private _ownedTokens;

    address public authorizedContract;

    uint256 public commonCount;
    uint256 public uncommonCount;
    uint256 public rareCount;
    uint256 public epicCount;
    uint256 public legendaryCount;

    constructor(address _authorizedContract) ERC721("CamoNFT", "CNFT") {
        authorizedContract = _authorizedContract;
    }

    modifier onlyAuthorizedContract() {
        require(authorizedContract == msg.sender, "Unauthorized contract");
        _;
    }

    function mintNFT(RarityLevel rarity) external payable {
        require(rarity >= RarityLevel.Common && rarity <= RarityLevel.Legendary, "Invalid rarity level");

        uint256 price = getPrice(rarity);
        require(msg.value >= price, "Insufficient payment");

        require(getCount(rarity) < getCap(rarity), "Rarity level sold out");
        uint256 tokenId = counter;
        counter++;
        _safeMint(msg.sender, tokenId);
        _ownedTokens[msg.sender].push(tokenId);
        nfts[tokenId] = NFT(tokenId, msg.sender, rarity, block.timestamp, block.timestamp);
        updateCount(rarity);

        if (msg.value > price) {
            payable(msg.sender).transfer(msg.value - price);
        }
    }

    function transferFrom(address from, address to, uint256 tokenId) public override {
        super.transferFrom(from, to, tokenId);
        require(_isApprovedOrOwner(_msgSender(), tokenId), "Transfer not authorized");
        require(from != to, "What are you doing?");

        // Remove token ID from sender's list
        uint256[] storage fromTokenList = _ownedTokens[from];
        for (uint256 i = 0; i < fromTokenList.length; i++) {
            if (fromTokenList[i] == tokenId) {
                fromTokenList[i] = fromTokenList[fromTokenList.length - 1];
                fromTokenList.pop();
                break;
            }
        }

        // Add token ID to receiver's list
        _ownedTokens[to].push(tokenId);

        // Perform the transfer
        _transfer(from, to, tokenId);

        nfts[tokenId].entryTimestamp = block.timestamp;
        nfts[tokenId].owner = to;
    }

    function getPrice(RarityLevel rarity) public pure returns (uint256) {
        if (rarity == RarityLevel.Common) {
            return COMMON_PRICE;
        } else if (rarity == RarityLevel.Uncommon) {
            return UNCOMMON_PRICE;
        } else if (rarity == RarityLevel.Rare) {
            return RARE_PRICE;
        } else if (rarity == RarityLevel.Epic) {
            return EPIC_PRICE;
        } else if (rarity == RarityLevel.Legendary) {
            return LEGENDARY_PRICE;
        }
        revert("Invalid rarity level");
    }


    function getCap(RarityLevel rarity) public pure returns (uint256) {
        if (rarity == RarityLevel.Common) {
            return COMMON_CAP;
        } else if (rarity == RarityLevel.Uncommon) {
            return UNCOMMON_CAP;
        } else if (rarity == RarityLevel.Rare) {
            return RARE_CAP;
        } else if (rarity == RarityLevel.Epic) {
            return EPIC_CAP;
        } else if (rarity == RarityLevel.Legendary) {
            return LEGENDARY_CAP;
        }
        revert("Invalid rarity level");
    }

    function getCount(RarityLevel rarity) public view returns (uint256) {
        if (rarity == RarityLevel.Common) {
            return commonCount;
        } else if (rarity == RarityLevel.Uncommon) {
            return uncommonCount;
        } else if (rarity == RarityLevel.Rare) {
            return rareCount;
        } else if (rarity == RarityLevel.Epic) {
            return epicCount;
        } else if (rarity == RarityLevel.Legendary) {
            return legendaryCount;
        }
        revert("Invalid rarity level");
    }

    function updateCount(RarityLevel rarity) internal {
        if (rarity == RarityLevel.Common) {
            commonCount++;
        } else if (rarity == RarityLevel.Uncommon) {
            uncommonCount++;
        } else if (rarity == RarityLevel.Rare) {
            rareCount++;
        } else if (rarity == RarityLevel.Epic) {
            epicCount++;
        } else if (rarity == RarityLevel.Legendary) {
            legendaryCount++;
        }
    }

    function getOwnedTokens(address owner) external view onlyAuthorizedContract returns (uint256[] memory) {
        return _ownedTokens[owner];
    }

    function updateTimestamp(address user) external onlyAuthorizedContract {
        uint256[] storage tokenList = _ownedTokens[user];
        for(uint i=0;i< tokenList.length; i++){
            uint256 tokenId = tokenList[i];
            nfts[tokenId].entryTimestamp = block.timestamp;
        }
    }

    function withdrawFunds() public payable onlyOwner{
        payable(msg.sender).transfer(address(this).balance);
    }

    function checkBalance() public view onlyOwner returns(uint256){
        return address(this).balance;
    }
}

