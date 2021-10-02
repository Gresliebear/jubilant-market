//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "../interfaces/IAAVELendingPoolAddressesProvider.sol";

contract AAVELendingPoolAddressesProvider is IAAVELendingPoolAddressesProvider {

        address public mockedPriceOracleAddress;

        function setMockedPriceOracleAddress(address _addr) public {
            mockedPriceOracleAddress = _addr;
        }
        function getPriceOracle() external override view returns (address) {
            return mockedPriceOracleAddress;
        }

}
