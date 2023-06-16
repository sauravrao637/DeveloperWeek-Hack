let camoNFT = artifacts.require("./CamoNFT.sol");
let camoStaking = artifacts.require("./CamoStaking.sol");

module.exports = function (deployer, network) {
	deployer.deploy(camoNFT, camoStaking.address);
};