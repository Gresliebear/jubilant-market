//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "./interfaces/IAAVELendingPoolAddressesProvider.sol";
import "./interfaces/IAAVEPriceOracle.sol";

import "./interfaces/IERC20.sol";

contract StakeManager {
    address public owner;
    address public appManager;
    IAAVELendingPoolAddressesProvider public aaveAddressesProvider;
    IERC20 public dai;

    address[] public pool;

    constructor(address _aaveAddressProvider, address _dai) {
        // owner wouldn't really be used unless in emergencies
        // for this contract
        owner = msg.sender;
        aaveAddressesProvider = IAAVELendingPoolAddressesProvider(_aaveAddressProvider);
        dai = IERC20(_dai);
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "OnlyOwner");
        _;
    }

    modifier onlyManager() {
        require(appManager == msg.sender, "OnlyManager");
        _;
    }

    modifier onlyAdmin() {
        require(appManager == msg.sender || owner == msg.sender, "OnlyAdmin");
        _;
    }

    function setAppManager(address _manager) public onlyOwner {
        appManager = _manager;
    }

    // returns price of ETH 
    function getPriceOfWei() public view returns (uint256) {
        address _a = aaveAddressesProvider.getPriceOracle();
        IAAVEPriceOracle _priceOracle = IAAVEPriceOracle(_a);
        uint256 _daiPriceInWei = _priceOracle.getAssetPrice(address(dai));
        uint256 _weiPriceInDaiRemainder = (10**18) % _daiPriceInWei;
        uint256 _weiPriceInDai = (10**18) / _daiPriceInWei;

        // does math work this way;
        return (_daiPriceInWei * _weiPriceInDai) + _weiPriceInDaiRemainder;
    }

    // only available to AppManager
    function deposit(uint256 depositId) external payable onlyManager {
        // brain of contract
        // make decision about where to allocate
        // save depositId
    }
}
