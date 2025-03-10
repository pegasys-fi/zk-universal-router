// verify-router.js
const hre = require('hardhat')
const fs = require('fs')
const path = require('path')

async function main() {
  // Get parameters from JSON file
  const filePath = path.join(__dirname, 'deployParameters/zksync_era_testnet.json')
  const params = JSON.parse(fs.readFileSync(filePath, 'utf8'))

  // Contract address to verify
  const contractAddress = '0x71b5BBc9Cef6afEe1fEE927DdB509C79F1f7a334'

  // Verify the contract with a single parameter (the struct)
  try {
    await hre.run('verify:verify', {
      address: contractAddress,
      contract: 'contracts/UniversalRouter.sol:UniversalRouter',
      constructorArguments: [params],
    })
    console.log('Verification successful!')
  } catch (error) {
    console.error('Verification failed:', error)
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
