import React, {useState} from 'react'
import {useMetaMask} from 'metamask-react'

const Depoist = (props) => {
    const action = 'deposit'
    const { status, connect, account } = useMetaMask();
    const [connected, setConnected] = useState("");
    

    async function BackEndEMF(_address) {
    const domainUrl = 'http://127.0.0.1:5000'; // put int env
    const url = '/jubilantmarket/FrontEndEMF/'    
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
        "Deposit":100
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
        const url = '/jubilantmarket/FrontEndEMF/'    
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

    async function DepositEMF(_address) {
            const domainUrl = 'http://127.0.0.1:5000'; // put int env
            const url = '/jubilantmarket/FrontEndEMF/'    
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
                "Deposit":100
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
        // we call api for information pass Useraddress
        // fetch
        if(account === "" || account === null || account == undefined){
            setConnected("You need to connect with a MetaMask account")
            } else {
            // first question is does user account already exist? 
            //so we can take a async function put .then to wait for the response pass results 
            CheckUserExistence(account).then(function(conditionalCheck){ // get request
            console.log("ok",conditionalCheck)
            console.log(conditionalCheck === true)
            //backwards compability will be a issue
            // if user does exist allow Deposit to contiune 
            //to contribute to the existencing total
            if(conditionalCheck === true) {  
                console.log("Deposit")
                setConnected(" ");
                DepositEMF(account);
                            // check if account is overlimit 
            } else{ // else we create a account and initialize smart contract
                BackEndEMF(account);
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
        <div>
        <p> {account} </p>
            <p> {connected} </p>
            <button className="btn-main" onClick={handleClick}> Deposit to {props.typeOfCall} </button>
        </div>
    )
}

export default Depoist