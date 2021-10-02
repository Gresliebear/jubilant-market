//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "../interfaces/IAAVEPriceOracle.sol";

contract AAVEPriceOracle is IAAVEPriceOracle {
    

    mapping (address => uint) public mocked; // mocked prices;

    function setMockedPrice(address _asset, uint _price) public {
        mocked[_asset] = _price;
    }

    function getAssetPrice(address _asset) external override view returns (uint256) {
        return mocked[_asset];
    }

}
