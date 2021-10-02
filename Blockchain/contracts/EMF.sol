// //SPDX-License-Identifier: Unlicense
// pragma solidity 0.6.12;
pragma solidity ^0.8.4;

contract EMF {

}
// import "./AppManager.sol";

// // EMF Smart Contract is a per user basis
// //inheritance
// // app Manager Will be the insurance float
// contract EMF is AppManager {

//     uint256 depositLimit;
//     address userAddress;

//     //error
//     string depositFailedStatement = "Deposit Not Made Over the limit";
// // user or msg.sender can deposit or withdraw anytime
// function EMFDepositToAppManager(address _userAddress) external returns(string memory _externalMsg) {

//     // check if user has exisiting EMFcontract?

//     // check if userBalance is currently overlimit disallow deposit

//         // limit is $1,000 nothing above
//         depositLimit = 1000;
//         require(balanceOf(_userAddress) == depositLimit);

//     // check if userBalance + deposit pushes deposit overlimit

//     // if not contiune depositoAppManager
//     if(depositLimit <= 1000) {
//       //Depoist to EMF required parameters?

//         deposit();
//     } else {
//     // else stop deposit
//     return depositFailedStatement;
//     }

// }

// uint EMFAPY;

// function InterestEarnedCall(uint _accountBalance, uint _APY) internal returns(uint _InterestEarned) {

//     // userAddress, _account_balace
//     //
//     uint muiltplier;
//     uint InterestEarned;
//     uint APM;
//     // %3.00
//     // Monthly APY is caluated
//     APM = _APY / 12;
//     // divided by 100 convert out of percent
//     muiltplier = APM  / 100;
//     // Interest based off the Users Total accountBalance
//     InterestEarned = _accountBalance * muiltplier;
//     // Call is made to recorded the InterestedEarned so
//     // when the user Withdraw it Withdraws with the InterestedEarned.

//     return InterestEarned;
// }

// // EMFreturnUser'sAPY per month
// function EMFInterest() external {

// // total of users account balance
// // account_balance + InterestEarn

// }

// // Function to View the total account balance + Interest Earned
// function ViewEMFTotal(address _userAddress) view external returns(uint256){

//     // view the total recorded deposit
//     //balance = balanceOf(_userAddress);
//     return balanceOf(_userAddress);
// }

// // Function Check if Contract Ended
// function ViewContractLife(address _userAddress)  view external returns(uint) {

//     // Check userbalance if its 0
//         // if contract is 0 Contract Concludes (internal function of App Manager)
//         // Reactivate by deposit
//         // Not Reacttivatted by Withdraw
// }

// }
