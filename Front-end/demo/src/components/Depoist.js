import React, {useState} from 'react'
import {useMetaMask} from 'metamask-react'

const Depoist = (props) => {
    const action = 'deposit'
    const { status, connect, account } = useMetaMask();
    const [connected, setConnected] = useState("");
    const [totalAmount, setAmount] = useState(0);
    const [depositError, setError] = useState("");


    const AmountHandler = (event) => {

        if(event.target.value <= 1000 || event.target.value !=0 ) {
            setError("");

        }
        if(event.target.value > 1000) {
            setError("Deposit cannot be over 1000");

        }
        if(event.target.value < 0){
            setError("You cannot withdraw less than zero")
        }
        console.log("Hello event?")
        // pass input number  
        setAmount(event.target.value);
        console.log("work?", totalAmount)
        
    }

    // create users
    async function BackEndEMF(_address, _amount) {
    const domainUrl = 'http://127.0.0.1:5000'; // put int env
    const url = '/jubilantmarket/EMFDeposit/'    
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
        "Deposit":_amount
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
        console.error("Failed to send transaction with Deposit Button");
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

    //PATCH
    async function DepositEMF(_address, _amount) {
            const domainUrl = 'http://127.0.0.1:5000'; // put int env
            const url = '/jubilantmarket/EMFDeposit/'    
            const address = _address
            const test = domainUrl + url + address
            console.log("PATCHING")
            // Options
            const opts = { 
            method:'PATCH', 
            headers:{ 
                "Content-Type":"application/json"
            },
            body: JSON.stringify({ 
                "userAddress":_address,
                "Deposit":_amount
            })
        
            }
            try{
            const response = await fetch(`${domainUrl}${url}${address}`, opts)
            if(response.status !== 200){
                    alert("There is error with API called to EMFDeposit");
                    const data = await response.json();
                    console.log("this came from the backend", data);
                
                }
                const data = await response.json();
                    console.log("Deposit", data);
                    return data.overlimit
                // setStore({return_msg: data.message});
        
            }catch(error){
                console.error("Failed to send transaction with Deposit Button");
            }
            }
    // were going to trigger EMF api
    const handleClick = () => {
    if (props.typeOfCall === 'EMF'){
        console.log(props.typeOfCall, action)
        
        //validation code
        if(totalAmount !== 0 && totalAmount < 1000) {
            setError("");
        }

        if(totalAmount > 1000) {
            setError("Deposit cannot be greater than 1000");
        }
        if(totalAmount == 0) {
            setError("Deposit cannot be Zero");
        }
        
        
        // we call api for information pass Useraddress
        // fetch
        if(account === "" || account === null || account === undefined){
            setConnected("You need to connect with a MetaMask account")
            } else {

            // first question is does user account already exist? 
            CheckUserExistence(account).then(function(conditionalCheck){ // get request
            console.log(conditionalCheck === true)
            //backwards compability will be a issue
            // if user does exist allow Deposit to contiune 
            //to contribute to the existencing total
            if(conditionalCheck === true) {  
                console.log("Deposit")
                console.log(totalAmount)
                setConnected(" ");

                DepositEMF(account, totalAmount).then(function(overlimit){

                    console.log("Over the limit?", overlimit)
                    if(!overlimit){
                        console.log("REDIRECT!!!!");
                        //window.location.reload();
                    }else {
                        setError("Transaction failed over deposit limit");
                    }
                })
                            // check if account is overlimit 

            } else{ // else we create a account and initialize smart contract
                BackEndEMF(account, totalAmount);
            }
        });
    }
        // 


        }
    if (props.typeOfCall === 'Claim'){
            console.log(props.typeOfCall)
        }

    if (props.typeOfCall === 'CD'){
            console.log(props.typeOfCall)
    }
    }


    return (
        <div className="depositCss font-face-sn">
        <p> {account} </p>
            <p> {connected} </p>
            <input type="number" onChange={AmountHandler}/>
            <button className="btn-main hvr-forward" onClick={handleClick}> Deposit to {props.typeOfCall} </button>
            <p className="errorCss"> {depositError}</p>
        </div>
    )
}

export default Depoist