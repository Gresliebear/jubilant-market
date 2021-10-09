import React from "react";
import './popup.css'
function EarlyDepoist(props) { 
    
    //boonlean to trigger popup
    return(props.trigger) ? ( 
        <div className="popup"> 
            <div className="popup-inner">
                <button className="close-btn" onClick={() => props.setTrigger(false)}> close </button>
                { props.childern }
                <h3> My popup</h3>
            <p> this is my button triggered popup</p> 
            </div>
        </div>
        ) : "";
}

export default EarlyDepoist