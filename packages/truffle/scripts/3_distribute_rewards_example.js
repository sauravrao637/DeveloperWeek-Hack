// ganache
// const addrNFT = "0xFDceb7D5B84f7F761dD7e29393cB5518538Fa4B8"
// const addrStaking = "0x4d0766FB1891f057f1bBC1b97aFc1695eA7F29BA"
// const addrToken = "0xe20A9fBA8fE32a209B9f764dC055dEc9C36fF506"

// cannoli
const addrNFT = "0xDdc465E647A12e3ffB96e305ab5d3be9FEFFe407"
const addrStaking = "0xDb7Eb2c77A80D4F199fE1A12A16124204D5C6345"
const addrToken = "0x19521de75582E91BF9aaD0DB7Bd2296ca5A2b00d"

// Contracts
const CamoNFT = artifacts.require("CamoNFT")
const CamoStaking = artifacts.require("CamoStaking")
const CamoToken = artifacts.require("CamoToken")



module.exports = async function (callback) {
	try {
		// Fetch accounts from wallet - these are unlocked
		const accounts = await web3.eth.getAccounts()
		const owner = accounts[0];
		console.log(accounts);

		const camoToken = await CamoToken.at(addrToken);
		const camoStaking = await CamoStaking.at(addrStaking);
		const camoNFT = await CamoNFT.at(addrNFT);

		try {
			await camoStaking.distributeIncentives.sendTransaction({ from: owner, gas: 1000000 });
		}
		catch (error) {
			console.error(error)
		}

	}
	catch (error) {
		console.log(error)
	}

	callback()
}
