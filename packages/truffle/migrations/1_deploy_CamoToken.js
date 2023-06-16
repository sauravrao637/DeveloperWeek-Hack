let camoToken = artifacts.require("./CamoToken.sol");

module.exports = function (deployer, network) {
	deployer.deploy(camoToken);
};