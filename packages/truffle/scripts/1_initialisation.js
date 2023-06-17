// Contracts
const CamoNFT = artifacts.require("CamoNFT")
const CamoStaking = artifacts.require("CamoStaking")
const CamoToken = artifacts.require("CamoToken")


setCamoTokenAddressAndSendFunds = async function (camoToken, camoStaking, camoNFT, owner) {
	const MAX_SUPPLY = await camoToken.MAX_SUPPLY()

	console.log("camoToken", MAX_SUPPLY.toString());
	console.log("addrresses", camoNFT.address, camoStaking.address, camoToken.address, owner);
	const result = await camoToken.approve.sendTransaction(owner, MAX_SUPPLY, { from: owner });
	console.log(result)

	const result2 = await camoToken.approve.sendTransaction(camoStaking.address, MAX_SUPPLY, { from: owner });
	console.log(result2)

	const result3 = await camoToken.allowance.call(owner, camoStaking.address, { from: owner });
	console.log(result3.toString())

	await camoStaking.setTokenAddressAndSendFunds.sendTransaction(camoToken.address, { from: owner });
}


setCamoNFTAddress = async function (camoNFT, camoStaking, owner) {
	const result = await camoStaking.setCamoNFTAddress.sendTransaction(camoNFT.address, { from: owner })
	console.log(result)
}

module.exports = async function (callback) {
	try {
		// Fetch accounts from wallet - these are unlocked
		const accounts = await web3.eth.getAccounts()
		const owner = accounts[0];
		console.log(accounts);

		const camoToken = await CamoToken.deployed();
		const camoStaking = await CamoStaking.deployed();
		const camoNFT = await CamoNFT.deployed();

		try {
			await setCamoTokenAddressAndSendFunds(camoToken, camoStaking, camoNFT, owner)
		}
		catch (error) {
			console.error(error)
		}

		try {
			await setCamoNFTAddress(camoNFT, camoStaking, owner)
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