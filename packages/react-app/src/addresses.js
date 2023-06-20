const addrNFT = "0x19521de75582E91BF9aaD0DB7Bd2296ca5A2b00d"
const addrStaking = "0x8f2bdbfdD6c7197c033d7976A5242DB9b1FF3c3c"
const addrToken = "0x2Bf7C3A9e45800A37ee875fbeBE6A806D668fe33"

const CHAIN_PARAMS = {
	chainId: "0xaef3",
	chainName: "Alfajores Testnet",
	nativeCurrency: { name: "Alfajores Celo", symbol: "A-CELO", decimals: 18 },
	rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
	blockExplorerUrls: ["https://alfajores-blockscout.celo-testnet.org/"],
	iconUrls: ["future"],
};
export { addrNFT, addrStaking, addrToken, CHAIN_PARAMS }