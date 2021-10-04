import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../images/logo.png"
import MetaBar from './MetaBar'
const NavBar = () => {
    return (
        <div className="navbox">
        
                    <label><img src={Logo}/> </label>
                    <Link to="/"> Emergency Medical Fund </Link>
                    <Link to="/about">Submit Claim</Link>
                    <Link to="/users">Delegates Contributions</Link>
                    <MetaBar></MetaBar>
        </div>
    )
}

export default NavBar
