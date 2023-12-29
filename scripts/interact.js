require('dotenv').config();
const { ethers } = require('ethers');


const API_KEY = process.env.API_KEY
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS

const rpcUrl = 'https://rpc.fuse.io';
const provider = new ethers.providers.JsonRpcProvider(rpcUrl);

const contract = require("../artifacts/contracts/UserOnboarding.sol/UserOnboarding.json");

const privateKey = process.env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = contract.abi
const contractAddress = process.env.CONTRACT_ADDRESS
// Create a contract instance
const userOnboarding = new ethers.Contract(contractAddress, abi, signer)

// Interact with the contract
async function onboardUser() {
    const tx = await userOnboarding.onboardUser("0x1d18e8cF196fA515284034C719964FCE517aC49F", "USERNAME", 123456789);
    await tx.wait();
    console.log("User onboarded successfully!");
}

// Call the function
onboardUser()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });