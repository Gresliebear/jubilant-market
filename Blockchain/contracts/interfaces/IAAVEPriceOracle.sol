//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

interface IAAVEPriceOracle {
    function getAssetPrice(address _asset) external view returns (uint256);
}
