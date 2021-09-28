import React, {useState} from 'react'
import {useMetaMask} from 'metamask-react'

const Withdraw = (props) => {
    const action = 'withdraw'
    const { status, connect, account } = useMetaMask();
    const [connected, setConnected] = useState("");
    const [totalAmount, setAmount] = useState(0);
    const [WithdrawError, setError] = useState("");
    const [accountBalance, setBalance] = useState(0);

    // we need function to get the UserAddress Balance
    async function CheckAccountTotal(_address){
        const domainUrl = 'http://127.0.0.1:5000'; // put int env
        const url = '/jubilantmarket/EMFWithdraw/'    
        const address = _address
        const test = domainUrl + url + address
        console.log("Get Balance", test)
        // Options
        const opts = { 
        method:'GET', 
        headers:{ 
            "Content-Type":"application/json"
        },
        body: JSON.stringify({ 
            "userAddress":_address
        })
    
        }
        const myRequest = new Request(opts)
        try{
        const response = await fetch(`${domainUrl}${url}${address}`, myRequest)
        if(response.status !== 200){
                alert("There is error with API called to EMFDeposit");
                const data = await response.json();
                console.log("this came from the backend", data);
            
            }
            const data = await response.json();
                console.log("Withdraw", data);
                
                // validation snippet
                if(data.balance === "" || data.balance === null || data.balance == undefined) {
                    return "balance is missing!"
                }

                return data.balance
            // setStore({return_msg: data.message});
    
        }catch(error){
            console.error("Failed to check User's Balance");
        }
    }

    // WithdrawAmountHandler
    const AmountHandler = (event) => {
        CheckAccountTotal(account).then(function(balance) {
        console.log(balance)
        }
        
        )
        
        
        console.log("Handler",)

        if(event.target.value > accountBalance){
            setError("You cannot withdraw more than your balance in the EMF")
        }

        if(event.target.value < 0){
            setError("You cannot withdraw less than zero")
        }

        if(event.target.value == 0){
            setError("You cannot withdraw less than zero")
        }

        console.log("Hello event?")
        // pass input number  
        setAmount(event.target.value);
    }


    // were going to trigger EMF api
    const handleClick = () => {
    if (props.typeOfCall === 'EMF'){
        console.log(props.typeOfCall, action)
        //  AmountHandler Validates input 
        // we call the ammount and UserAddress being called to be withdraw
        
        }
    if (props.typeOfCall === 'Claim'){
            console.log(props.typeOfCall)
        }

    if (props.typeOfCall === 'CD'){
            console.log(props.typeOfCall)
    }
    }


    return (
        <div className="withdrawCss">
            <input type="number" onChange={AmountHandler}/>
            <button className="btn-main hvr-forward" onClick={handleClick}> Withdraw from {props.typeOfCall} </button>
            <p className="errorCss"> {WithdrawError}</p>
        </div>
    )
}
export default Withdraw
