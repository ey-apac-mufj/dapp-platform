// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/utils/Counters.sol";

contract Profile {
    using Counters for Counters.Counter;
    Counters.Counter private _userIdCounter;

    struct User {
        uint256 userId;
        string userName;
    }

    mapping(address => User) private users;

    function addUser(
        address userAddress,
        string memory userName
    ) public returns (User memory) {
        _userIdCounter.increment(); // User Id Increment
        uint256 userId = _userIdCounter.current();

        users[userAddress] = User(userId, userName);
        return users[userAddress];
    }

    function getUser(address userAddress) public view returns (User memory) {
        return users[userAddress];
    }
}
