import React from 'react'
import { Link } from 'react-router-dom'
import Logo from "../images/logo.png"
import MetaBar from './MetaBar'
const NavBar = () => {
    return (
        <div className="navbox font-face-sn">
        
                    <label className="logoCss"><Link to="/"><img src={Logo}/> </Link> </label>
                    <Link to="/Emf"> Emergency Medical Fund </Link>
                    <Link to="/about">Insurance Coverage</Link>
                    <Link to="/users">Delegates Contributions</Link>
                    <Link to="/login"> Verifier Login </Link>
                    <MetaBar></MetaBar>
        </div>
    )
}

export default NavBar
