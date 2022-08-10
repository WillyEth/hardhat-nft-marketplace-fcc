require("@nomiclabs/hardhat-waffle")
require("@nomiclabs/hardhat-etherscan")
require("hardhat-deploy")
require("solidity-coverage")
require("hardhat-gas-reporter")
require("hardhat-contract-sizer")
require("dotenv").config()
//require("@nomiclabs/hardhat-solhint")

const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const PRIVATE_KEY = process.env.PRIVATE_KEY || "No Fail"
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || ""
const POLYGON_API_KEY = process.env.POLYGON_API_KEY || ""
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL || "https://eth-goerli.g.alchemy.com/v2/r3I8jn71KDXG42R4lCJz9hdHRX43oWaH"
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL || "https://polygon-mumbai.g.alchemy.com/v2/2z8Ksn8wo6GMp0mtTSkzhGzikmCWYu0H"
const KOVAN_RPC_URL = process.env.KOVAN_RPC_URL || "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
const RINKEBY_RPC_URL = process.env.RINKEBY_RPC_URL || "https://eth-mainnet.alchemyapi.io/v2/your-api-key"
const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL || "https://eth-mainnet.g.alchemy.com/v2/OVZePxVzwhYc0dQ8_ksMy31IuGI_Bxbk"
const REPORT_GAS = process.env.REPORT_GAS || "false"
const REPORT_GAS_TOKEN = process.env.REPORT_GAS_TOKEN || "ETH"

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            //  If you want to do some forking, uncomment this
            // forking: {
            //     url: MAINNET_RPC_URL,
            // },
            chainId: 31337,
            blockConfirmations: 1,
        },
        localhost: {
            chainId: 31337,
        },
        kovan: {
            url: KOVAN_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            //accounts: {
            //     mnemonic: MNEMONIC,
            // },
            saveDeployments: true,
            chainId: 42,
        },
        rinkeby: {
            url: RINKEBY_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            chainId: 4,
            blockConfirmations: 6,
        },
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            //   accounts: {
            //     mnemonic: MNEMONIC,
            //   },
            saveDeployments: true,
            chainId: 5,
        },
        mumbai: {
            url: MUMBAI_RPC_URL,
            accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
            //   accounts: {
            //     mnemonic: MNEMONIC,
            //   },
            saveDeployments: true,
            chainId: 80001,
        },
        // mainnet: {
        //     url: MAINNET_RPC_URL,
        //     accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
        //     accounts: {
        //         mnemonic: MNEMONIC,
        //     },
        //     saveDeployments: true,
        //     chainId: 1,
        // },
        // polygon: {
        //     url: POLYGON_MAINNET_RPC_URL,
        //     accounts: PRIVATE_KEY !== undefined ? [PRIVATE_KEY] : [],
        //     saveDeployments: true,
        //     chainId: 137,
        // },
    },
    gasReporter: {
        enabled: REPORT_GAS ? true : false,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        coinmarketcap: COINMARKETCAP_API_KEY,
        token: REPORT_GAS_TOKEN,
    },
    solidity: { compilers: [{ version: "0.4.19" }, { version: "0.8.7" }, { version: "0.6.12" }, { version: "0.6.0" }, { version: "0.8.8" }, { version: "0.8.0" }] },
    namedAccounts: {
        deployer: {
            default: 0,
        },
        user1: {
            default: 1,
        },
    },
    mocha: {
        timeout: 500000, // 500 seconds max for running tests
    },
    etherscan: {
        apiKey: {
            polygonMumbai: POLYGON_API_KEY,
            polygon: POLYGON_API_KEY,
            goerli: ETHERSCAN_API_KEY,
            kovan: ETHERSCAN_API_KEY,
            mainnet: ETHERSCAN_API_KEY,
            rinkeby: ETHERSCAN_API_KEY,
        },
    },
}
