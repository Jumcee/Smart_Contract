// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract UserOnboarding {
    struct User {
        address walletAddress;
        string name;
        uint256 _nin; //
        string email;
    }

    event UserOnboarded(
        address walletAddress,
        string name,
        uint256 nin,
        string email
    );

    mapping(address => User) public usersByAddress;
    mapping(uint256 => address) private usersByNIN;

    ERC20 public token; // Define the token contract

    constructor(address _tokenAddress) {
        token = ERC20(_tokenAddress); // Initialize the token contract
    }

    function onboardUser(
        address wallet,
        string memory name,
        uint256 nin,
        string memory email
    ) external {
        require(
            usersByNIN[nin] == address(0),
            "User with this NIN already exists"
        );
        require(
            usersByAddress[wallet].walletAddress == address(0),
            "Wallet address already associated"
        );

        User memory newUser = User({
            walletAddress: wallet,
            name: name,
            _nin: nin, // Use the private field
            email: email
        });

        usersByAddress[wallet] = newUser;
        usersByNIN[nin] = wallet;

        emit UserOnboarded(wallet, name, nin, email);
    }

    // Function to airdrop tokens upon payment confirmation
    function airdropTokens(address user, uint256 amount) external {
        // Check if payment from Paystack was confirmed (This is a placeholder condition)
        bool paymentConfirmed = checkPaystackPayment(); // Implement this function

        // Confirm that the contract has enough tokens and payment is confirmed
        require(
            token.balanceOf(address(this)) >= amount && paymentConfirmed,
            "Payment not confirmed or insufficient balance"
        );

        // Transfer tokens to the user
        token.transfer(user, amount);
    }

    function checkPaystackPayment() internal pure returns (bool) {
        // Return true if payment is confirmed, false otherwise
        return true;
    }
}
