import React from 'react'

const Withdraw = (props) => {
    const action = 'withdraw'
    // were going to trigger EMF api
    const handleClick = () => {
    if (props.typeOfCall == 'EMF'){
        console.log(props.typeOfCall, action)
        // we call api for information pass Useraddress
        
        }
    if (props.typeOfCall == 'Claim'){
            console.log(props.typeOfCall)
        }

    if (props.typeOfCall == 'CD'){
            console.log(props.typeOfCall)
    }
    }


    return (
        <div>
            <button className="btn-main" onClick={handleClick}> Withdraw from {props.typeOfCall} </button>
        </div>
    )
}
export default Withdraw
