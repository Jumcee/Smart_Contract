const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  // Deploy UserOnboarding contract
  const UserOnboarding = await ethers.getContractFactory('UserOnboarding');
  const userOnboarding = await UserOnboarding.deploy();

  console.log('UserOnboarding contract deployed to:', userOnboarding.address);

  // Run tests
  await runTests(userOnboarding);
}

async function runTests(userOnboarding) {
  try {
    const test = require('./test/UserOnboarding.test.js'); // Path to your test file

    // Pass the deployed contract to the test
    await testing(userOnboarding);
    console.log('Tests completed successfully!');
  } catch (error) {
    console.error('Error running tests:', error);
    process.exit(1);
  }
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Error deploying contracts:', error);
    process.exit(1);
  });
