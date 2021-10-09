import React from 'react'
import {useMetaMask} from 'metamask-react'
import { LoginFetch } from '../components/LoginCalls/loginfetch';

const Login = () => {
    const { status, connect, account } = useMetaMask();
    
    
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
                    <button className="btn-main"> Login </button>
                </div>
            
            </div>
        </div>
    )
}

export default Login
