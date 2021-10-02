// //SPDX-License-Identifier: Unlicense
// pragma solidity 0.6.12;

// import "./interfaces/AggregatorV3Interface.sol";

// contract PriceFeedInterface { 

//     AggregatorV3Interface internal priceFeed;
    
//     constructor(address _priceAddress) public {
//         priceFeed = AggregatorV3Interface(_priceAddress);
//     }

//     function getLatestPrice() public view returns (int) {
//         (
//             uint80 roundID, 
//             int price,
//             uint startedAt,
//             uint timeStamp,
//             uint80 answeredInRound
//         ) = priceFeed.latestRoundData();
//         return price;
//     }

// }

// //inhertance 
// //contract priceContract is PriceFeedInterface { }
