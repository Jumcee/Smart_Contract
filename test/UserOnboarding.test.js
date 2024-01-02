const { expect } = require('chai');
const { ethers } = require('ethers');

describe('UserOnboarding', function () {
  let UserOnboarding;
  let userOnboarding;
  let ERC20Token;
  let erc20Token;
  let owner;
  let user;

  const initialSupply = ethers.utils.parseEther('1000000');

  beforeEach(async function () {
    [owner, user] = await ethers.getSigners();

    ERC20Token = await ethers.getContractFactory('ERC20Token'); // Replace with your token contract name
    erc20Token = await ERC20Token.deploy(initialSupply);
    await erc20Token.deployed();

    UserOnboarding = await ethers.getContractFactory('UserOnboarding');
    userOnboarding = await UserOnboarding.deploy(erc20Token.address);
    await userOnboarding.deployed();
  });

  it('should allow onboarding a user', async function () {
    const name = 'John Doe';
    const nin = 1234567890;
    const email = 'john@example.com';
    const walletAddress = user.address;

    await expect(userOnboarding.onboardUser(walletAddress, name, nin, email))
      .to.emit(userOnboarding, 'UserOnboarded')
      .withArgs(walletAddress, name, nin, email);

    const userByAddress = await userOnboarding.usersByAddress(walletAddress);
    expect(userByAddress.name).to.equal(name);
    expect(userByAddress._nin).to.equal(nin);
    expect(userByAddress.email).to.equal(email);

    const userByNIN = await userOnboarding.usersByNIN(nin);
    expect(userByNIN).to.equal(walletAddress);
  });

  it('should airdrop tokens upon payment confirmation', async function () {
    const amount = ethers.utils.parseEther('100');

    await erc20Token.transfer(user.address, amount);
    await erc20Token.connect(user).approve(userOnboarding.address, amount);

    await expect(
      userOnboarding.airdropTokens(user.address, amount)
    ).to.emit(erc20Token, 'Transfer').withArgs(userOnboarding.address, user.address, amount);

    const userBalance = await erc20Token.balanceOf(user.address);
    expect(userBalance).to.equal(amount);
  });
});