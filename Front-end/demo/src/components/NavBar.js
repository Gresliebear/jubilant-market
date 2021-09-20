import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <div className="navbox">
        
                     Logo 
                    <Link to="/"> Emergency Medical Fund </Link>
                    <Link to="/about">Submit Claim</Link>
                    <Link to="/users">Contribute Delegates </Link>
        </div>
    )
}

export default NavBar
