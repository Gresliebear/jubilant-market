import React from 'react'
import timeImage from '../images/Slide20.JPG'; // with import    
import ownerImage from '../images/Slide21.JPG'; // with import   
import verifyImage from '../images/Slide22.JPG'; // with import   
const Home = () => {
    return (
        <div className="flex-box CardPage font-face-sn homeCss">
            <h1> Insurance Policy implementated in a Smart Contract</h1>

            <h2> To develop a insurance policy  on the BlockChain comes with 3 <label className="boldRed"> <b> challenges </b> </label>
            to overcome. </h2>
            <h2>1) Recording the lifetime of the Insurance policy,
            Conditionals that contorl the <label className="boldGreen">
             <b> start</b></label> of a policy or <label className="boldRed"> <b> ends</b></label> one.</h2>
            <p> If monthly payments are missed for the past 90 days as a condition <b> Coverage Lapse </b> occurs paid premiums are retain to the float. </p>
            <p> If all payments are fillfulled & the contract ends the user can withdraw the total all their paid premiums + interest earned with their premiums. </p> 
            <img src={timeImage} />

            <h2>2) Submission of insurance claims data and the verification of that claim data.</h2>
            <img src={ownerImage} />
            <img src={verifyImage} />
            <h2>3) Maintaining the Solvency of the Insurance Float </h2> <p>An  <b> Insurance Float </b> is the pool of money everyone 
            contributes to and withdraws from to cover the cost of claims. </p> <p> By creating a 
            <b> net positive</b> insurance float by taking assets (tokens) substracted by liabilities(token loans) 
            to equals the equity of Insurance float, we also refer to also health factor. </p>


        </div>
    )
}

export default Home
