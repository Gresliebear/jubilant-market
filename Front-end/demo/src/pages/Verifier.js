import React from 'react'
import {useMetaMask} from 'metamask-react'
import ClaimImage from '../images/20210903_161410.jpg'; // with import  
const Verifier = () => {
    const { status, connect, account } = useMetaMask();
    // Verifier page has username and password 
    // Verifier address must have a assgined private key 
    // is on record on the blockchain or solidity contract 
    return (
        <div>
            <h3> UserAddress</h3>  {account}  <h3>has a private key on record as a verifier. </h3>

            Below are claims ready for reivew. 
            
            {/* mapping of all submitted claims need to implemeted here for 
            verifiers with verifier apporval from smart contract */}
            <div className="claimform"> 
            <h2> Claim Submission 1</h2>
            <img src={ClaimImage}/>
            <p> Claim on Honda Door CRV </p>
             <button className="btn-main"> Approve Claim </button> 
            <button className="btn-main"> Deny Claim </button> 
            </div>  
            
        </div>
    )
}

export default Verifier
