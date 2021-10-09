
export async function LoginFetch(_address, _amount) {
    const domainUrl = 'http://127.0.0.1:5000'; // put int env
    const url = '/jubilantmarket/Login/'    
    const address = _address
    const test = domainUrl + url + address
    console.log("PUT")
    // Options
    const opts = { 
    method:'PUT', 
    headers:{ 
        "Content-Type":"application/json"
    },
    body: JSON.stringify({ 
        "userAddress":_address,
    })

    }
    try{
    const response = await fetch(`${domainUrl}${url}${address}`, opts)
    if(response.status !== 200){
            alert("Error with API called to Login");
            const data = await response.json();
            console.log("from the backend", data);
        
        }
        const data = await response.json();
            console.log("LoginFetch", data);
            return data
        // setStore({return_msg: data.message});

    }catch(error){
        console.error("Failed to LoginFetch");
    }
}
