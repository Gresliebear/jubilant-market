// fetch Code to API 

// DepositClaim is not used for initial Claim 
// but instead used to make monthly deposits
export async function DepositClaim(_address, _amount) {
    const domainUrl = 'http://127.0.0.1:5000'; // put int env
    const url = '/jubilantmarket/ClaimDeposit/'    
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
            alert("Error with API called to ClaimDeposit");
            const data = await response.json();
            console.log("from the backend", data);
        
        }
        const data = await response.json();
            console.log("Deposit Claim", data);
            return data
        // setStore({return_msg: data.message});

    }catch(error){
        console.error("Failed to send transaction with Deposit Button");
    }
}

export const  validatClaimAmount = (totalAmount) => {

    if(totalAmount !== 0 && totalAmount < 1000) {
        return " ";
    }

    if(totalAmount > 300) {
        return "Deposit 300";
    }
    if(totalAmount == 0) {
        return "Deposit cannot be Zero";
    }
}

// GET request is check User Address Existence on BlockChain
export async function CheckUserExistenceClaim(_address) {
    const domainUrl = 'http://127.0.0.1:5000'; // put int env
    const url = '/jubilantmarket/ClaimDeposit/'    
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

    // PUT request on DepositEnd is Initialization
export async function InitializeInsurancePolicy(_address, _amount) {
        const domainUrl = 'http://127.0.0.1:5000'; // put int env
        const url = '/jubilantmarket/ClaimDeposit/'    
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
                alert("There is error with API called to ClaimDeposit");
                const data = await response.json();
                console.log("this came from the backend", data);
                sessionStorage.setItem("message", data.message);
            }
        }
        catch(error){
            console.error("Failed to send transaction with Deposit Button");
        }
        }
    