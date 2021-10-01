//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./interfaces/AggregatorV3Interface.sol";

contract PriceFeedInterface { 

    AggregatorV3Interface internal priceFeed;
    
    constructor(address _priceAddress) {
        priceFeed = AggregatorV3Interface(_priceAddress);
    }

    function getLatestPrice() public view returns (int) {
        (
            uint80 roundID, 
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = priceFeed.latestRoundData();
        return price;
    }

}

//inhertance 
//contract priceContract is PriceFeedInterface { }
