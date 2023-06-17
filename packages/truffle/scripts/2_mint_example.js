// cannoli addresses
const addrNFT = "0xc9827DFb15B8f3A646Df3e23A8a40EbE89B24d1C"
const addrStaking = "0x546eBc83a3135C4b5B27F27266785E4a3F0900A0"
const addrToken = "0xa7515F69F9AdCb9e56Af4DAdf96554B3F8ce987B"

// ganache
// const addrNFT = "0x0F62da05dC20c85b8361c9EB4A0D971f0dD2d401"
// const addrStaking = "0xA79666523e358DfcC60B8242A3ac3E5FCF3bf032"
// const addrToken = "0x86981e571d40C86153A2f2F9B025B5fB0a6A39d4"

// Contracts
const CamoNFT = artifacts.require("CamoNFT")
const CamoStaking = artifacts.require("CamoStaking")
const CamoToken = artifacts.require("CamoToken")



module.exports = async function (callback) {
	try {
		// Fetch accounts from wallet - these are unlocked
		const accounts = await web3.eth.getAccounts()
		const minter = accounts[0];
		console.log(accounts);

		const camoToken = await CamoToken.at(addrToken);
		const camoStaking = await CamoStaking.at(addrStaking);
		const camoNFT = await CamoNFT.at(addrNFT);

		try {
			await camoNFT.mintNFT.sendTransaction(0, { from: minter, value: 100000000 });
		}
		catch (error) {
			console.error(error)
		}

		try {
			await camoStaking.stakeWallet.sendTransaction({ from: minter });
		} catch (error) {
			console.log(error);
		}
	}
	catch (error) {
		console.log(error)
	}

	callback()
}