let camoStaking = artifacts.require("./CamoStaking.sol");

module.exports = function (deployer, network) {
	deployer.deploy(camoStaking, 100);
};