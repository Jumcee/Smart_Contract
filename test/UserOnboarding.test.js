const { expect } = require('chai');
const { ethers } = require('hardhat');

describe('UserOnboarding', function () {
  let UserOnboarding;
  let userOnboarding;
  let owner;
  let addr1;

  beforeEach(async function () {
    UserOnboarding = await ethers.getContractFactory('UserOnboarding');
    [owner, addr1] = await ethers.getSigners();

    userOnboarding = await UserOnboarding.deploy();
  });

  it('Should onboard a user', async function () {
    const nin = 123456789;
    const name = 'Alice';

    await userOnboarding.connect(addr1).onboardUser(addr1.address, name, nin);

    const user = await userOnboarding.usersByAddress(addr1.address);
    expect(user.walletAddress).to.equal(addr1.address);
    expect(user.name).to.equal(name);
    expect(user.nin).to.equal(nin);

    const userByNIN = await userOnboarding.usersByNIN(nin);
    expect(userByNIN).to.equal(addr1.address);
  });

  it('Should not allow onboarding with existing NIN', async function () {
    const nin = 123456789;
    const name = 'Alice';

    await userOnboarding.connect(addr1).onboardUser(addr1.address, name, nin);

    await expect(userOnboarding.connect(addr1).onboardUser(addr1.address, name, nin))
      .to.be.revertedWith('User with this NIN already exists');
  });

  it('Should not allow onboarding with existing wallet address', async function () {
    const nin1 = 987654321;
    const nin2 = 123456789;
    const name = 'Bob';

    await userOnboarding.connect(addr1).onboardUser(addr1.address, name, nin1);

    await expect(userOnboarding.connect(addr1).onboardUser(addr1.address, name, nin2))
      .to.be.revertedWith('Wallet address already associated');
  });
});