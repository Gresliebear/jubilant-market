import React from 'react'
import ClaimImage from '../images/20210903_161410.jpg'; // with import  

const ViewUploads = (props) => {

    // async function returns data in an array map() that array

    // mapping function is expecting a array
    // title
    // image 
    return (
        <div className="ViewUploadSection">
            {/* mapping function called */}

            <div className="claimform"> 
            <h2> Claim Submission 1</h2>
            <img src={ClaimImage}/>
            <p> <b> Claim Details: </b> Honda Door CRV </p>
            <p> <b> Claim Status: </b> Pending</p>
            </div>  
        </div>
    )
}

export default ViewUploads
