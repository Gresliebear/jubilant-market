//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./StakeManager.sol";

contract AppManager {
    address public owner;
    StakeManager public stakeManager;

    uint256 depositCount = 0;
    uint256 minStake = 100_000 * (10**9); // 100k gwei | 0.0001 eth
    mapping(address => Deposit[]) deposits;

    // maybe unnecessary to structify
    struct Deposit {
        uint256 id;
        uint256 amount;
        uint256 timestamp;
    }
    // this can be recorded as an event w/out using up storage
    event DepositReceived(
        address indexed sender,
        uint256 indexed amount,
        uint256 depositId,
        uint256 indexed timestamp
    );

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "OnlyOwner");
        _;
    }

    modifier canDeposit() {
        require(address(stakeManager) != address(0), "StakeManager not ready");
        _;
    }

    function setStakeManager(address _stakeManager) public onlyOwner {
        stakeManager = StakeManager(payable(_stakeManager));
    }

    // should we record/denominate in USD?
    // should be just deposit USDC/DAI?
    function deposit() public payable canDeposit {
        require(msg.value >= minStake, "Deposit not high enough");
        // add check to only allow authorized deposit for x policy
        // and check if deposit is already made

        // is this required to cast to payable?
        stakeManager.deposit{value: msg.value}(depositCount);

        // initialze next deposit in array as ref
        Deposit storage _deposit = deposits[msg.sender].push();

        // populate deposit
        _deposit.id = depositCount;
        _deposit.amount = msg.value;
        _deposit.timestamp = block.timestamp;

        // emit and increment
        emit DepositReceived(
            msg.sender,
            msg.value,
            depositCount,
            block.timestamp
        );
        depositCount++;
    }

    function balanceOf(address _account) public view returns (uint256) {
        uint256 _total;
        Deposit[] storage _deposits = deposits[_account];
        for (uint256 ii; ii < _deposits.length; ii++) {
            _total += _deposits[ii].amount;
        }
        return _total;
    }
}
