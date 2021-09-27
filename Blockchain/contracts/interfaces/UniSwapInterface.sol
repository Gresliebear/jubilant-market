// SPDX-License-Identifier: MIT
pragma solidity =0.7.6;
pragma abicoder v2;
// V3 Concentrated liquidity 
// uniswap needs   solidity: "0.7.6",
// we take a portion of the EMF and make a position to earn fees
// on stable coin swap or volatility assets 
// "As a DeFi project, token creator, or other interested party, 
//you may want to incentivize in-range liquidity provision on a Uniswap V3 pool" -uniswap

// Liquidity Mining is Stake Pool on UniSwap
//https://docs.uniswap.org/protocol/guides/liquidity-mining/liquidity-mining-overview

// Providing Liquidity to earn fees

import '@uniswap/v3-core/contracts/interfaces/IUniswapV3Pool.sol';
import '@uniswap/v3-core/contracts/libraries/TickMath.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol';
import '../libraries/TransferHelper.sol';
import '../interfaces/INonfungiblePositionManager.sol';
import '../base/LiquidityManagement.sol';

// so we are going call this contract to take portion of EMF fund to be provided as liquidity 
// periodically collect fees?

//change hardcode to parameters!!!
contract LiquidityExamples is IERC721Receiver {
    address public constant DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address public constant USDC = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48;

    uint24 public constant poolFee = 3000;

    INonfungiblePositionManager public immutable nonfungiblePositionManager;

    /// @notice Represents the deposit of an NFT
    struct Deposit {
        address owner;
        uint128 liquidity;
        address token0;
        address token1;
    }

    /// @dev deposits[tokenId] => Deposit
    mapping(uint256 => Deposit) public deposits;

    constructor(
        INonfungiblePositionManager _nonfungiblePositionManager
    ) {
        nonfungiblePositionManager = _nonfungiblePositionManager;
    }

    // Implementing `onERC721Received` so this contract can receive custody of erc721 tokens
    function onERC721Received(
        address operator,
        address,
        uint256 tokenId,
        bytes calldata
    ) external override returns (bytes4) {
        // get position information

        _createDeposit(operator, tokenId);

        return this.onERC721Received.selector;
    }

    function _createDeposit(address owner, uint256 tokenId) internal {
        (, , address token0, address token1, , , , uint128 liquidity, , , , ) =
            nonfungiblePositionManager.positions(tokenId);

        // set the owner and data for position
        // operator is msg.sender
        deposits[tokenId] = Deposit({owner: owner, liquidity: liquidity, token0: token0, token1: token1});
    }