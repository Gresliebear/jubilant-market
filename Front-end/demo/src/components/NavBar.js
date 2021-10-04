import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../images/logo.png"
import MetaBar from './MetaBar'
const NavBar = () => {
    return (
        <div className="navbox font-face-sn">
        
                    <label><img src={Logo}/> </label>
                    <Link to="/"> Emergency Medical Fund </Link>
                    <Link to="/about">Insurance Coverage</Link>
                    <Link to="/users">Delegates Contributions</Link>
                    <MetaBar></MetaBar>
        </div>
    )
}

export default NavBar
