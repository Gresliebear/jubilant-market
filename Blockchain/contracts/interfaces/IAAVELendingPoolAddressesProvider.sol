//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

interface IAAVELendingPoolAddressesProvider {
    function getPriceOracle() external view returns (address);
}
