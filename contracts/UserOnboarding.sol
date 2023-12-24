// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserOnboarding {
    struct User {
        address walletAddress;
        string name;
        uint256 nin;
    }

    mapping(address => User) public usersByAddress;
    mapping(uint256 => address) public usersByNIN;

    function onboardUser(
        address wallet,
        string memory name,
        uint256 nin
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
            nin: nin
        });

        usersByAddress[wallet] = newUser;
        usersByNIN[nin] = wallet;
    }
}
