// The original version of the `permit2` is used. Only change in the `era-permit2` Permit2 address, should not affect `universal-router`
import 'hardhat-typechain'
import '@nomiclabs/hardhat-ethers'
import '@matterlabs/hardhat-zksync-solc'
import '@matterlabs/hardhat-zksync-verify'
import '@matterlabs/hardhat-zksync-chai-matchers'
import { task } from 'hardhat/config'
import deployZkSyncEra from './script/deploy_zksync_era'
import dotenv from 'dotenv'
dotenv.config()

const ZKSYNC_TEST_NODE_URL = 'http://localhost:8011'
// This variable is used by the hardhat-zksync-chai-matchers
process.env.ZKSYNC_WEB3_API_URL = ZKSYNC_TEST_NODE_URL

task('deploy')
  .addParam('privateKey', 'Private key used to deploy')
  .addParam('params', 'Path to params json')
  .addFlag('verify', 'Whether verify the contracts')
  .setAction(async (taskArgs) => {
    await deployZkSyncEra(taskArgs)
  })

export default {
  paths: {
    sources: './contracts',
  },
  networks: {
    zkSyncTestNode: {
      url: ZKSYNC_TEST_NODE_URL,
      ethNetwork: '',
      zksync: true,
    },
    zksysTestnet: {
      url: 'https://rpc.zksys.zeeve.online',
      ethNetwork: "goerli",
      zksync: true,
    },
  },
  etherscan: {
    apiKey: {
      zksysTestnet: 'empty',
    }, customChains: [
      {
        network: 'zksysTestnet',
        chainId: 5701,
        urls: {
          apiURL: 'https://explorer-test-zk.syscoin.org/api',
          browserURL: 'https://explorer-test-zk.syscoin.org'
        }
      }
    ]
  },
  defaultNetwork: 'zkSyncTestNode',
  solidity: {
    version: '0.8.17',
  },
  zksolc: {
    version: '1.3.13',
    compilerSource: 'binary',
    settings: {},
  },
  mocha: {
    timeout: 100000,
  },
}
