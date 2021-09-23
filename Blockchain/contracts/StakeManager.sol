//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

// a blind pool of funds that can be allocated as best seen fit

contract StakeManager {
    address public owner;
    address public appManager;

    constructor() {
        // owner wouldn't really be used unless in emergencies
        // for this contract
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "OnlyOwner");
        _;
    }

    modifier onlyManager() {
        require(appManager == msg.sender, "OnlyManager");
        _;
    }

    function setAppManager(address _manager) public onlyOwner {
        appManager = _manager;
    }

    // only available to AppManager
    function deposit(uint256 depositId) external payable onlyManager {
        // brain of contract
        // make decision about where to allocate
        // save depositId
    }
}
