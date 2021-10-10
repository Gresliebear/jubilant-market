import React from 'react'
import {useMetaMask} from 'metamask-react'
import { LoginFetch } from '../components/LoginCalls/loginfetch';
import { useHistory } from "react-router-dom";

const Login = () => {
    const { status, connect, account } = useMetaMask();
    const history = useHistory();
    
    const handleClick = () => {
        history.push("/verifier");
    }
    
    return (
        <div className='loginCss'>
            <h1>Hello UserAddress </h1> <h3> {account}</h3>
            <div className="flex-boxCenter"> 

                    
                <div className="flex-childLogin">
                    <h3> Username: </h3> <input type="text" value="Verifier" placeholder="Verifier"/> 
                </div>
                <div className="flex-childLogin">
                    <h3> Password: </h3> <input type="text" value="Verifier" placeholder="Verifier"/> 
                </div>
                <div className="flex-childLoginbutton">
                    <button className="btn-main" onClick={handleClick}> Login </button>
                </div>
            
            </div>
        </div>
    )
}

export default Login
