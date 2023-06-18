// ganache
// const addrNFT = "0xFDceb7D5B84f7F761dD7e29393cB5518538Fa4B8"
// const addrStaking = "0x4d0766FB1891f057f1bBC1b97aFc1695eA7F29BA"
// const addrToken = "0xe20A9fBA8fE32a209B9f764dC055dEc9C36fF506"


// cannoli
const addrNFT = "0xde148195B143c88857009e2D08541516b1B4ed82"
const addrStaking = "0x2199E959e8035E4EfE45E4C419090F67655e5f47"
const addrToken = "0xe0b12e13dD4A5822c0CEA5757C1EfaA48cd48acb"

// Contracts
const CamoNFT = artifacts.require("CamoNFT")
const CamoStaking = artifacts.require("CamoStaking")
const CamoToken = artifacts.require("CamoToken")

amIStaker = async function (camoStaking, owner) {
	try {
		let result = await camoStaking.amIStaker.call({ from: owner });
		console.log("amIStaker", result)
	} catch (error) {
		console.log(error)
	}
}

getStaker = async function (camoStaking, owner) {
	try {
		let result = await camoStaking.getStaker.call(owner, { from: owner })
		console.log("getStaker", result)
	} catch (error) {
		console.error(error);
	}
}

getNFTAddress = async function (camoStaking, owner) {
	try {
		let result = await camoStaking.camoNFTAddress.call({ from: owner });
		console.log("NFT address", result);
	} catch (error) {
		console.error(error);
	}
}

getTokenAddress = async function (camoStaking, owner) {
	try {
		let result = await camoStaking.camoTokenAddress.call({ from: owner });
		console.log("tokenAddress", result)
	} catch (error) {
		console.error(error);
	}
}

getSupplyRatio = async function (camoStaking, owner) {
	try {
		let result5 = await camoStaking.getSupplyRatio.call({ from: owner });
		console.log("getSupplyRatio", result5.toString())
	} catch (error) {
		console.error(error);
	}
}

getLeftSupply = async function (camoStaking, owner) {
	try {
		let result = await camoStaking.leftSupply.call({ from: owner });
		console.log("getLeftSupply", result.toString())
	} catch (error) {
		console.error(error);
	}
}

getOwner = async function (camoStaking, owner) {
	try {
		let result = await camoStaking.owner.call({ from: owner });
		console.log("getOwner", result)
	} catch (error) {
		console.error(error);
	}
}


rewardAccumulated = async function (camoStaking, owner) {
	try {
		let result = await camoStaking.rewardAccumulated.call({ from: owner });
		console.log("accumulated", result.toString())
	} catch (error) {
		console.error(error);
	}
}

getTier1Rate = async function (camoStaking, owner) {
	try {
		let result = await camoStaking.tier1Rate.call({ from: owner });
		console.log("Tier1Rate", result.toString)
	} catch (error) {
		console.error(error);
	}
}
getAuthorisedContract = async function (camoNFT, owner) {
	try {
		let result = await camoNFT.authorizedContract.call({ from: owner })
		console.log("authorised contract ", result)
	} catch (error) {
		console.error(error)
	}
}
getBasePrice = async function (camoNFT, owner) {
	try {
		let result = await camoNFT.BASE_PRICE.call({ from: owner })
		console.log("Base Price ", result.toString())
	} catch (error) {
		console.error(error)
	}
}

getbalanceOf = async function (camoNFT, owner) {
	try {
		let result = await camoNFT.balanceOf.call(owner, { from: owner })
		console.log("balance", result.toString())
	} catch (error) {
		console.error(error)
	}
}

checkBalance = async function (camoNFT, owner) {
	try {
		let result = await camoNFT.checkBalance.call({ from: owner })
		console.log("balance ", result.toString())
	} catch (error) {
		console.error(error)
	}
}

getCommonCap = async function (camoNFT, owner) {
	try {
		let result = await camoNFT.COMMON_CAP.call({ from: owner })
		console.log("Common Cap ", result.toString())
	} catch (error) {
		console.error(error)
	}
}

getCount = async function (camoNFT, owner) {
	try {
		let result = await camoNFT.getCount.call(0, { from: owner })
		console.log("Count ", result.toString())
	} catch (error) {
		console.error(error)
	}
}

getPrice = async function (camoNFT, owner) {
	try {
		let result = await camoNFT.getPrice.call(0, { from: owner })
		console.log("Price ", result.toString())
	} catch (error) {
		console.error(error)
	}
}

getNFT = async function (camoNFT, owner) {
	try {
		let result = await camoNFT.nfts.call(0, { from: owner })
		console.log("nft", result)
	} catch (error) {
		console.error(error)
	}
}


module.exports = async function (callback) {
	try {
		// Fetch accounts from wallet - these are unlocked
		const accounts = await web3.eth.getAccounts()
		const owner = accounts[0];

		const camoToken = await CamoToken.at(addrToken);
		const camoStaking = await CamoStaking.at(addrStaking);
		const camoNFT = await CamoNFT.at(addrNFT);

		try {
			await amIStaker(camoStaking, owner)
			await getStaker(camoStaking, owner)
			await getNFTAddress(camoStaking, owner)
			await getTokenAddress(camoStaking, owner)
			await getSupplyRatio(camoStaking, owner)
			await getLeftSupply(camoStaking, owner)
			await getOwner(camoStaking, owner)
			await rewardAccumulated(camoStaking, owner)

			await getAuthorisedContract(camoNFT, owner)
			await getBasePrice(camoNFT, owner)
			await getbalanceOf(camoNFT, owner)
			await checkBalance(camoNFT, owner)
			await getCommonCap(camoNFT, owner)
			await getCount(camoNFT, owner)
			await getPrice(camoNFT, owner)
			await getNFT(camoNFT, owner)

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