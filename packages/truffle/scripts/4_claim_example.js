// ganache
const addrNFT = "0xc34094D3bE332f9dFF526c6caF0fc42A0E5292ad"
const addrStaking = "0x9500d22680A118E51929258DE130b6873Bf2Ae9a"
const addrToken = "0x61d784eFF24163869161D406CCE3E4806BD18cD2"

// cannoli
// const addrNFT = "0xDdc465E647A12e3ffB96e305ab5d3be9FEFFe407"
// const addrStaking = "0xDb7Eb2c77A80D4F199fE1A12A16124204D5C6345"
// const addrToken = "0x19521de75582E91BF9aaD0DB7Bd2296ca5A2b00d"


// Contracts
const CamoNFT = artifacts.require("CamoNFT")
const CamoStaking = artifacts.require("CamoStaking")
const CamoToken = artifacts.require("CamoToken")



module.exports = async function (callback) {
	try {
		// Fetch accounts from wallet - these are unlocked
		const accounts = await web3.eth.getAccounts()
		const minter = accounts[1];
		console.log(accounts);

		const camoToken = await CamoToken.at(addrToken);
		const camoStaking = await CamoStaking.at(addrStaking);
		const camoNFT = await CamoNFT.at(addrNFT);

		try {
			await camoStaking.claimReward.sendTransaction({ from: minter });
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