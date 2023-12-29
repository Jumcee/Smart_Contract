//Get 3 wallet addresses 

const { ethers } = require('ethers');

async function generateWallets() {
  const wallets = [];

  for (let i = 0; i < 3; i++) {
    const wallet = ethers.Wallet.createRandom();
    wallets.push(wallet);
  }

  return wallets;
}

generateWallets().then(wallets => {
  console.log('Generated Wallet Addresses:');
  wallets.forEach(wallet => {
    console.log('Address:', wallet.address);
    console.log('Private Key:', wallet.privateKey);
    console.log('--------------------------');
  });
});
