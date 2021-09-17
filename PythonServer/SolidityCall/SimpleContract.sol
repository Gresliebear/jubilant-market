// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.4.16 <0.9.0;
// line above specifices that source code is in version
// pragma is for the compiler

// Contract in Solidity is collection of functions and data that resides on Ethereum blockchain
contract SimpleStorage { 
    //uint state variable type of uint unsigned interger of 256 bits
    // set() get() modifies this stored box
    // JS uses this. to access it but its different programming paradigm
    uint storedData;

    // IMPORTANT Contract names, Function names, and variable names
    // RESTRICTED to ASCII character set

    function set(uint x) public { 
    
        storedData = x;
    }

    function get() public view returns (uint){
        return storedData;
    }
}