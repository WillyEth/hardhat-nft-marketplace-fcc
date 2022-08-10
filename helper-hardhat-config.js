const networkConfig = {
    default: {
        name: "hardhat",
        keepersUpdateInterval: "30",
    },
    31337: {
        name: "localhost",
        subscriptionId: "588",
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        keepersUpdateInterval: "30",
        raffleEntranceFee: "100000000000000000", // 0.1 ETH
        callbackGasLimit: "500000", // 500,000 gas
        wethToken: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
        lendingPoolAddressesProvider: "0xB53C1a33016B2DC2fF3653530bfF1848a515c8c5",
        daiEthPriceFeed: "0x773616E4d11A78F511299002da57A0a94577F1f4",
        daiToken: "0x6b175474e89094c44da98b954eedeac495271d0f",
        mintFee: "10000000000000000", //0.01
    },
    4: {
        name: "rinkeby",
        subscriptionId: "9020",
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        ethUsdPriceFeed: "0x8A753747A1Fa494EC906cE90E9f37563A8AF630e", // ETH Price Feed
        keepersUpdateInterval: "30",
        raffleEntranceFee: "100000000000000000", // 0.1 ETH
        callbackGasLimit: "500000", // 500,000 gas
        vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
        mintFee: "10000000000000000", //0.01
    },
    5: {
        name: "goerli",
        subscriptionId: "9020",
        gasLane: "0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc", // 30 gwei
        keepersUpdateInterval: "30",
        raffleEntranceFee: "100000000000000000", // 0.1 ETH
        callbackGasLimit: "500000", // 500,000 gas
        vrfCoordinatorV2: "0x6168499c0cFfCaCD319c818142124B7A15E857ab",
        mintFee: "10000000000000000", //0.01
    },
    80001: {
        name: "mumbai",
        subscriptionId: "9020",
        gasLane: "0x4b09e658ed251bcafeebbc69400383d49f344ace09b9576fe248bb02c003fe9f", // 500 gwei
        keepersUpdateInterval: "30",
        raffleEntranceFee: "100000000000000000", // 0.1 ETH
        callbackGasLimit: "500000", // 500,000 gas
        vrfCoordinatorV2: "0x7a1BaC17Ccc5b313516C5E16fb24f7659aA5ebed",
    },

    1: {
        name: "mainnet",
        keepersUpdateInterval: "30",
    },
}

const developmentChains = ["hardhat", "localhost"]
const INITIAL_SUPPLY = "1000000000000000000000000"
const DECIMALS = "18"
const INITIAL_PRICE = "200000000000000000000"
const VERIFICATION_BLOCK_CONFIRMATIONS = 6

module.exports = {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    INITIAL_SUPPLY,
    DECIMALS,
    INITIAL_PRICE,
}
