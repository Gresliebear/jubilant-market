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


contract FetchPriceData {

    PriceFeedInterface priceContract = new PriceFeedInterface();
    // Address for ChainLink  0.5% deivation
    //https://docs.chain.link/docs/reference-contracts/ 
    // define any address here to get its latest pricefeed
    
    // inheritance method
    //priceContract Work = new priceContract();
    
    // ADA / USD - Ethereum Mainnet index 0
    // 	0x882554df528115a743c4537828DA8D5B58e52544
    address ADA_USD = 0x882554df528115a743c4537828DA8D5B58e52544;
    // ETH / USD - Ethereum Mainnet index 1
    address ETH_USD = 0xF9680D99D6C9589e2a93a78A04A279e509205945;

    //DAI / USD - xDai  Mainnet nodes Data Feeds index 2
    address DAT_USD = 0x678df3415fc31947dA4324eC63212874be5a82f8;
    
    // dynamic array reads in all price feeds we watch
    address[] PriceFeedsAddresses; // for ex. ETH/USD

    function addDataPriceAddresses(address _address) internal {
    PriceFeedsAddresses.push(_address);
    }

    // all address are added to // key-value pair string adddress 'ETH/USD' 0x678df3415fc31947dA4324eC63212874be5a82f8
    function sumOfAllAddresses() internal { 
    PriceFeedsAddresses.push(ADA_USD);
    PriceFeedsAddresses.push(ETH_USD);
    PriceFeedsAddresses.push(DAT_USD);
    }

    //string comparsion
    function compareStrings(string memory a, string memory b) public view returns (bool) {
        return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
    }

    // internal function for grabbing price feed for AppManager and Stake Manager
    function _fetchPriceAddress(string memory _nameasset) internal returns(uint) { 

    // adds all address to PriceFeedsAddresses
    sumOfAllAddresses();
    // check address PriceFeedsAddresses
    // require string to key-value pair 
    string memory testvar = "ETH/USD";
    uint index = 1;
    // if statement for testing for now
    //https://www.geeksforgeeks.org/dynamic-arrays-and-its-operations-in-solidity/
    if (compareStrings(_nameasset, testvar)){
        return index;
    }
    
    // checking PriceFeedInterface with ETH_USD
    }

    function GetPriceFeed(string memory _nameasset) public {
    
        // Get Price Address for ETH/USD
        uint index = _fetchPriceAddress(_nameasset);
        address PriceAddress = PriceFeedsAddresses[index];

        // CALL INTERFACE HERE
        priceContract.getLatestPrice(PriceAddress);

    }

}