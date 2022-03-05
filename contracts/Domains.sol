// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.10;

import "hardhat/console.sol";

contract Domains {
    mapping(string => address) public domains;

    mapping(string => string) public records;

    mapping(string => string) public emails;

    constructor() {
        console.log("Yo yo, I am a contract and I am smart");
    }

    // A register function that adds their names to our mapping
    function register(string calldata name) public {
        require(domains[name] == address(0));
        domains[name] = msg.sender;
        console.log("%s has registered a domain!", msg.sender);
    }

    // This will give us the domain owners' address
    function getAddress(string calldata name) public view returns (address) {
        return domains[name];
    }

    function setRecord(string calldata name, string calldata record) public {
        // Check that the owner is the transaction sender
        require(domains[name] == msg.sender, "THOU SHALT NOT STEAL");
        console.log("%s has set a record for the  domain %s", msg.sender, name);
        records[name] = record;
    }

    function getRecord(string calldata name)
        public
        view
        returns (string memory)
    {
        return records[name];
    }

    function setEmailAddress(string calldata name, string calldata email)
        public
    {
        // Check that the owner is the transaction sender
        require(domains[name] == msg.sender, "THOU SHALT NOT STEAL");
        console.log(
            "%s has set an email address for the  domain %s",
            msg.sender,
            name
        );
        emails[name] = email;
    }

    function getEmailAddress(string calldata name)
        public
        view
        returns (string memory)
    {
        return emails[name];
    }
}
