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

    async function CheckUserExistence(_address) {
        const domainUrl = 'http://127.0.0.1:5000'; // put int env
        const url = '/jubilantmarket/EMFDeposit/'    
        const address = _address
        const test = domainUrl + url + address
        console.log(test)
        // Options
        const opts = { 
        method:'GET', 
        headers:{ 
            "Content-Type":"application/json"
        },
        body: JSON.stringify({ 
            "userAddress":_address,
        })
    
        }
        // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
        const myRequest = new Request(opts)
    
        try{
        const response = await fetch(`${domainUrl}${url}${address}`, myRequest)
        if(response.status !== 200){
                alert("There is error with API called to EMFDeposit");
                const data = await response.json();
                console.log("this came from the backend", data);
                return data.existence
            }
                const data = await response.json();
                console.log("ChechUser Exitence", data);
                console.log(data.existence)
                return data.existence
            // setStore({return_msg: data.message});
    
        }catch(error){
            console.error("Failed to send Check with Deposit Button");
        }
        }

    async function WithdrawEMF(_address, _amount) {
            const domainUrl = 'http://127.0.0.1:5000'; // put int env
            const url = '/jubilantmarket/EMFWithdraw/'    
            const address = _address
            const test = domainUrl + url + address
            
            // Options
            const opts = { 
            method:'PUT', 
            headers:{ 
                "Content-Type":"application/json"
            },
            body: JSON.stringify({ 
                "userAddress":_address,
                "Withdraw":_amount
            })
        
            }
        
        
            try{
            const response = await fetch(`${domainUrl}${url}${address}`, opts)
            if(response.status !== 200){
                    alert("There is error with API called to EMFDeposit");
                    
                    const data = await response.json();
                    console.log("this came from the backend", data);
                    sessionStorage.setItem("message", data.message);
                
                }
                
                // setStore({return_msg: data.message});
        
            }
            catch(error){
                console.error("Failed to send transaction Withdraw Button");
            }
            }

    // WithdrawAmountHandler
    const AmountHandler = (event) => {
        CheckAccountTotal(account).then(function(balance) {
        console.log(balance)
        setBalance(balance)
        })
        
        
        console.log("Handler",accountBalance)


        if(event.target.value > accountBalance){
            setError("You cannot withdraw more than your balance in the EMF")
        } else {
            setError("")
        }

        if(event.target.value < 0){
            setError("You cannot withdraw less than zero")
        }else {
            setError("")
        }

        if(event.target.value == 0){
            setError("You cannot withdraw zero")
        }else {
            setError("")
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
                if(totalAmount < 0){
                    setError("You cannot withdraw less than zero")
                }

                if(totalAmount == 0){
                    setError("You cannot withdraw less than zero")
                }

                if(account === "" || account === null || account == undefined){
                    setConnected("You need to connect with a MetaMask account")
                    } else {

                        // first question is does user account already exist? 
                        CheckUserExistence(account).then(function(conditionalCheck){ // get request
                        console.log("ok",conditionalCheck)
                        console.log(conditionalCheck === true)
                        //backwards compability will be a issue
                        // if user does exist allow Deposit to contiune 
                        //to contribute to the existencing total
                        if(conditionalCheck === true) {  
                            CheckAccountTotal(account).then(function(balance) {
                                console.log("check balance ",balance)
                                setBalance(balance)
                                })
                            console.log("Withdraw", totalAmount)
                            console.log("Withdraw", accountBalance)
                            setConnected(" ");
                            if(totalAmount > accountBalance){
                                setError("You cannot withdraw more than your balance in the EMF")
                                return;
                            } else {
                                setError("")
                            }
                            WithdrawEMF(account, totalAmount);
                                        // check if account is overlimit 
            
                        } else{ // else we create a account and initialize smart contract
                            // we should rarely see this
                            setError("You need to initialize contract by deposit first")
                        }
                    });
                }

            if (props.typeOfCall === 'Claim'){
                    console.log(props.typeOfCall)
                }

            if (props.typeOfCall === 'CD'){
                    console.log(props.typeOfCall)
            }
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
