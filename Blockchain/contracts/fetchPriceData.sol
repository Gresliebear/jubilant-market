//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./interfaces/AggregatorV3Interface.sol";

contract PriceFeedInterface { 

    AggregatorV3Interface internal priceFeed;
    
    constructor() {
        priceFeed = AggregatorV3Interface(0x9326BFA02ADD2366b30bacB125260Af641031331);
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

contract FetchPriceData {

    // Address for ChainLink  0.5% deivation
    //https://docs.chain.link/docs/reference-contracts/ 
    // define any address here to get its latest pricefeed

    // ADA / USD - Ethereum Mainnet
    // 	0x882554df528115a743c4537828DA8D5B58e52544
    address ADA_USD = 0x882554df528115a743c4537828DA8D5B58e52544;
    // ETH / USD - Ethereum Mainnet
    address ETH_USD = 0xF9680D99D6C9589e2a93a78A04A279e509205945;

    //DAI / USD - xDai  Mainnet nodes Data Feeds 
    address DAT_USD = 0x678df3415fc31947dA4324eC63212874be5a82f8;
    
    
    // dynamic array reads in all price feeds we watch
    address[] PriceFeedsAddresses; // for ex. ETH/USD

    // internal function for grabbing price feed for AppManager and Stake Manager
    function _fetchPrice(string memory _nameasset) internal { 
    
    //require openvessel address // serucity check 

    //price oracle contract from interface
    PriceFeedInterface;
    
    }


}