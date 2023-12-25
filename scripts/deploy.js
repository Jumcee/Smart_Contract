const { ethers } = require('hardhat');

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log('Deploying contracts with the account:', deployer.address);

  // Deploy UserOnboarding contract
  const UserOnboarding = await ethers.getContractFactory('UserOnboarding');
  const userOnboarding = await UserOnboarding.deploy();

  console.log('UserOnboarding contract deployed to:', userOnboarding.target);
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error('Error deploying contracts:', error);
    process.exit(1);
  });
