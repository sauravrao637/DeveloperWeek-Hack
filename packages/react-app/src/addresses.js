const addrNFT = "0x52F39B763686192A1af819Fe12B85057A7BA3fFa"
const addrStaking = "0x2C857F0Bb21af8981D9a27500d964960619073ba"
const addrToken = "0xFcAF8B0c2616476A5f80AbD892DCcB3eE13fA1D7"

const CHAIN_PARAMS = {
	chainId: "0xaef3",
	chainName: "Alfajores Testnet",
	nativeCurrency: { name: "Alfajores Celo", symbol: "A-CELO", decimals: 18 },
	rpcUrls: ["https://alfajores-forno.celo-testnet.org"],
	blockExplorerUrls: ["https://alfajores-blockscout.celo-testnet.org/"],
	iconUrls: ["future"],
};
export { addrNFT, addrStaking, addrToken, CHAIN_PARAMS }