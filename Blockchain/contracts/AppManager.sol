//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "./StakeManager.sol";

// import "./interfaces/PriceConsumerV3.sol";

//import "./interfaces/AAVE/ILendingPool.sol";
// import {ILendingPool} from "@aave/protocol-v2/contracts/interfaces/ILendingPool.sol";
// import {ILendingPoolAddressesProvider} from "@aave/protocol-v2/contracts/interfaces/ILendingPoolAddressesProvider.sol";

// interface PriceFeedInterface {
//     function getLatestPrice() external view returns (int256);
// }

contract AppManager {
    address public owner;
    StakeManager public stakeManager;

    uint256 depositCount = 0;
    // mini stake of a dollar so pricefeed to check?!?
    uint256 minStake = 100_000 * (10**9); // 100k gwei | 0.0001 eth

    // ENTRY POINT FOR AAVE required pragma solidity 0.6.12;
    // addresses -> https://docs.aave.com/developers/deployed-contracts/deployed-contracts
    // Kovan testnet 0x88757f2f99175387aB4C6a4b3067c77A695b0349

    //Error: Transaction reverted: function call to a non-contract account
    //ILendingPoolAddressesProvider provider = ILendingPoolAddressesProvider(0x88757f2f99175387aB4C6a4b3067c77A695b0349);
    //ILendingPool lendingPool = ILendingPool(provider.getLendingPool());

    // CHAINLINK PRICEFEED INTERFACE
    //string memory nameAsset = "ETH/USD";

    //Network: Kovan
    //Aggregator: ETH/USD
    // address ETH_USD = 0x9326BFA02ADD2366b30bacB125260Af641031331;

    // function _getPrice() internal view returns (int256) {
    //     PriceFeedInterface(ETH_USD).getLatestPrice();
    // }

    // AAVE INTERFACE
    // owneraddress will make deposits, withdraws, loans internally
    // but publicly display its health to Insuree, Delegates, Owner
    // "All of AAVE's functionalities available in testnet is the same in the mainnet app,"

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
        // What does this line do?
        for (uint256 ii; ii < _deposits.length; ii++) {
            _total += _deposits[ii].amount;
        }
        return _total;
    }

    // test Price From ChainLink
    // function ViewPriceOfEth() public view returns (int256) {
    //     return _getPrice();
    // }
}
