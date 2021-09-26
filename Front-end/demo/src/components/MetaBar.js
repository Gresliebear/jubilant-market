import React from 'react'
import {useMetaMask} from 'metamask-react'
const MetaBar = () => {

    const { status, connect, account } = useMetaMask();

    if (status === "initializing") return <div className="button6">Synchronisation with MetaMask ongoing...</div>

    if (status === "unavailable") return <div className="button6">MetaMask not available :(</div>

    if (status === "notConnected") return <button  className="button6" onClick={connect}>Connect to MetaMask</button>

    if (status === "connecting") return <div className="button6"> Connecting...</div>

    if (status === "connected") return <div className="button6">Connected: <p> {account} </p></div>

    return (
        <div>
        {/* MetaMask React implementation
            <div className="navbox2"> 
            
            </div> */}
        </div>
    )
}

export default MetaBar
