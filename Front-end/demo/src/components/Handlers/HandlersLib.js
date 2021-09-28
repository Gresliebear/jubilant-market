import React, {useState} from 'react'

// refactor using custom Hooks
function useAmountValidate(props) {
    const [totalAmount, setAmount] = useState(0);
    const [depositError, setError] = useState("");
    
    const AmountHandler = (event) => {
    
        console.log("Handler",)
        if(event.target.value <= 1000 || event.target.value !=0 ) {
            setError("");
            return;
        }
        if(event.target.value > 1000) {
            setError("Deposit cannot be over 1000");
            return;
        }
        console.log("Hello event?")
        // pass input number  
        return event.target.value;
        
        
    }
    AmountHandler();
}
export default useAmountValidate;