const { ethers } = require('ethers');

// Generate a new wallet
const wallet = ethers.Wallet.createRandom();

// Get the address, mnemonic phrase and private key
const address = wallet.address;
const privateKey = wallet.privateKey;
const mnemonic = wallet.mnemonic.phrase;

console.log('Address:', address);
console.log('Private Key:', privateKey);
console.log('mnemonic:', wallet.mnemonic.phrase);