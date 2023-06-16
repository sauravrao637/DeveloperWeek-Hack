// SPDX-License-Identifier: MIT
// Author:- @sauravrao637
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CamoToken is ERC20, Ownable {
    uint256 public constant MAX_SUPPLY = 10_000_000_000 * (10**18);

    constructor() ERC20("Camo Token", "CAMO") {
        uint256 toMint = MAX_SUPPLY;
        _mint(msg.sender, toMint);
    }
}
