import React, {useState} from 'react'
import {useMetaMask} from 'metamask-react'
import Depoist from '../components/Depoist';
import Withdraw from '../components/Withdraw';
const Users = () => {
    // CD means 
    const { status, connect, account } = useMetaMask();
    const [totalaccount, setaccountTotal] = useState(200);
    var maxNumber = 900;
    var randomNumber = Math.floor((Math.random() * maxNumber) + 1);
    return (
        <div className="flex-box CardPage">
            <h1> Contribute to the Insurance earn APY</h1>
            <h2> Total Size of the Insurance Float. </h2>
            {/* Implement Dynamic number or call float size from database or Smart Contract */}
            <h2> $12,231,{randomNumber}</h2>

            <div className="exchange"> 
                    <div className="column-child"> 
                        <h4> UserAddress's total deposit ${totalaccount}</h4>

                        <div className="exchange-child"> 
                            <Depoist typeOfCall="Float"> </Depoist>
                        </div>
                        <div className="exchange-child"> 
                            <Withdraw typeOfCall="Float"> </Withdraw>
                        </div>
                    </div>
            </div>
             
        </div>
    )
}

export default Users
