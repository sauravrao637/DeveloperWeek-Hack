// cannoli addresses
const addrNFT = "0xde148195B143c88857009e2D08541516b1B4ed82"
const addrStaking = "0x2199E959e8035E4EfE45E4C419090F67655e5f47"
const addrToken = "0xe0b12e13dD4A5822c0CEA5757C1EfaA48cd48acb"
// // ganache
// const addrNFT = "0xc34094D3bE332f9dFF526c6caF0fc42A0E5292ad"
// const addrStaking = "0x9500d22680A118E51929258DE130b6873Bf2Ae9a"
// const addrToken = "0x61d784eFF24163869161D406CCE3E4806BD18cD2"

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