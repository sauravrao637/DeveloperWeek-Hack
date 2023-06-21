async function main() {
	require('dotenv').config();
	const { Web3 } = require("web3");
	const ContractKit = require("@celo/contractkit");

	// Access the private key from the environment variable
	const privateKey = process.env.PRIVATE_KEY;
	const senderAddress = process.env.SENDER_ADDRESS;


	// Connect to the Celo Alfajores testnet
	const web3 = new Web3('https://alfajores-forno.celo-testnet.org');
	const kit = ContractKit.newKitFromWeb3(web3);

	// Set the contract address and ABI
	const contractAddress = '0x2C857F0Bb21af8981D9a27500d964960619073ba'; // Replace with your contract address
	const contractABI = [
		{
			"inputs": [
				{
					"internalType": "uint256",
					"name": "baseRewardRate",
					"type": "uint256"
				}
			],
			"stateMutability": "nonpayable",
			"type": "constructor"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "previousOwner",
					"type": "address"
				},
				{
					"indexed": true,
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "OwnershipTransferred",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "user",
					"type": "address"
				}
			],
			"name": "StakedWallet",
			"type": "event"
		},
		{
			"anonymous": false,
			"inputs": [
				{
					"indexed": true,
					"internalType": "address",
					"name": "user",
					"type": "address"
				},
				{
					"indexed": false,
					"internalType": "uint256",
					"name": "amount",
					"type": "uint256"
				}
			],
			"name": "WithdrawnRewards",
			"type": "event"
		},
		{
			"inputs": [],
			"name": "camoNFTAddress",
			"outputs": [
				{
					"internalType": "contract CamoNFT",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function",
			"constant": true
		},
		{
			"inputs": [],
			"name": "camoTokenAddress",
			"outputs": [
				{
					"internalType": "contract CamoToken",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function",
			"constant": true
		},
		{
			"inputs": [],
			"name": "leftSupply",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function",
			"constant": true
		},
		{
			"inputs": [],
			"name": "owner",
			"outputs": [
				{
					"internalType": "address",
					"name": "",
					"type": "address"
				}
			],
			"stateMutability": "view",
			"type": "function",
			"constant": true
		},
		{
			"inputs": [],
			"name": "renounceOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "tier1Rate",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function",
			"constant": true
		},
		{
			"inputs": [],
			"name": "tier2Rate",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function",
			"constant": true
		},
		{
			"inputs": [],
			"name": "tier3Rate",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function",
			"constant": true
		},
		{
			"inputs": [],
			"name": "tier4Rate",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function",
			"constant": true
		},
		{
			"inputs": [],
			"name": "tier5Rate",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function",
			"constant": true
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "newOwner",
					"type": "address"
				}
			],
			"name": "transferOwnership",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_camoNFTAddress",
					"type": "address"
				}
			],
			"name": "setCamoNFTAddress",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_tokenAddress",
					"type": "address"
				}
			],
			"name": "setTokenAddressAndSendFunds",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_serverAddress",
					"type": "address"
				}
			],
			"name": "setServerAddress",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "getSupplyRatio",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function",
			"constant": true
		},
		{
			"inputs": [],
			"name": "stakeWallet",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "claimReward",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [],
			"name": "distributeIncentives",
			"outputs": [],
			"stateMutability": "nonpayable",
			"type": "function"
		},
		{
			"inputs": [
				{
					"internalType": "enum CamoNFT.RarityLevel",
					"name": "rarity",
					"type": "uint8"
				}
			],
			"name": "getRate",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function",
			"constant": true
		},
		{
			"inputs": [
				{
					"internalType": "address",
					"name": "_user",
					"type": "address"
				}
			],
			"name": "getStaker",
			"outputs": [
				{
					"components": [
						{
							"internalType": "uint256",
							"name": "userJoinedTS",
							"type": "uint256"
						},
						{
							"internalType": "uint256",
							"name": "reward",
							"type": "uint256"
						}
					],
					"internalType": "struct CamoStaking.Staker",
					"name": "staker",
					"type": "tuple"
				}
			],
			"stateMutability": "view",
			"type": "function",
			"constant": true
		},
		{
			"inputs": [],
			"name": "amIStaker",
			"outputs": [
				{
					"internalType": "bool",
					"name": "",
					"type": "bool"
				}
			],
			"stateMutability": "view",
			"type": "function",
			"constant": true
		},
		{
			"inputs": [],
			"name": "rewardAccumulated",
			"outputs": [
				{
					"internalType": "uint256",
					"name": "",
					"type": "uint256"
				}
			],
			"stateMutability": "view",
			"type": "function",
			"constant": true
		}
	];

	// Create an instance of the contract using the ABI and address
	const contract = new kit.web3.eth.Contract(contractABI, contractAddress);

	// Specify the contract function you want to call and its parameters
	const functionName = 'distributeIncentives';
	const functionArgs = []; // Replace with your function arguments

	// Build the transaction object
	const txObject = contract.methods[functionName](...functionArgs);
	const txData = txObject.encodeABI();

	// Estimate gas required for the transaction
	const gas = await txObject.estimateGas({ from: senderAddress });

	// Build the transaction parameters
	const txParams = {
		from: senderAddress,
		to: contractAddress,
		data: txData,
		gasPrice: await kit.web3.eth.getGasPrice(),
		gas: gas,
		nonce: await kit.web3.eth.getTransactionCount(senderAddress),
	};

	// Sign the transaction with your private key
	const signedTx = await kit.web3.eth.accounts.signTransaction(txParams, privateKey);

	// Send the signed transaction
	const receipt = await kit.web3.eth.sendSignedTransaction(signedTx.rawTransaction);
	console.log('Transaction hash:', receipt.transactionHash);

}
debug = true;
const minutess = debug ? 1 : 70
const repeatt = () => {
	setInterval(main, minutess * 1000 * 60);
	console.log('Waiting for ' + minutess + ' minutes...');
}

repeatt()