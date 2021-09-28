//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "./AppManager.sol";

// EMF Smart Contract is a per user basis
//inheritance 
// app Manager Will be the insurance float
contract EMF is AppManager { 

// user or msg.sender can deposit or withdraw anytime
function EMFDepositToAppManager() external {
    // limit is $1,000 nothing above 

    //Depoist to EMF required parameters?

}

uint EMFAPY;

function InterestEarnedCall(uint _accountBalance, uint _APY) internal returns(uint _InterestEarned) { 

    // userAddress, _account_balace
    // 
    uint muiltplier;
    uint InterestEarned; 
    // %3.00
    // Monthly APY is caluated 
    _APM = _APY / 12;
    // divided by 100 convert out of percent
    muiltplier = _APY / 100;
    // Interest based off the Users Total accountBalance
    InterestEarned = _accountBalance * muiltplier;
    // Call is made to recorded the InterestedEarned so 
    // when the user Withdraw it Withdraws with the InterestedEarned. 

    return InterestEarned
}

// EMFreturnUser'sAPY per month 
function EMFInterest() external {

// total of users account balance 
// account_balance + InterestEarn

}

// Function to View the total account balance + Interest Earned
function ViewEMFTotal() view external{

    // view the total recorded deposit

}

}