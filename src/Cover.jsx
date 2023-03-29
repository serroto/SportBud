import React, { useContext, useEffect } from "react";
import { Link } from 'react-router-dom'
import Defines from "./context/defines";

export default function Cover(){
    let {defines, setDefines} = useContext(Defines);
    useEffect(() => {
        // console.log(defines.title);
    },[])
    return (
        <div className='cover'>
            <nav className='cover-nav'>
                <Link to="/"><img src="src/assets/logo.png" alt="logo" className='logo'/></Link>
                <div className='register'>
                <Link to="/Login" className='nav-link'>Login</Link>
                <Link to="/SignUp" className='nav-link'>Sign Up</Link>
                </div>
            </nav>
            <div className='bottom-text'>
                <h1>SPORTBUD</h1>
                <div>
                    <span>09.22.21</span>
                    <span>5:00 AM</span>
                    <span>Belden Cove</span>
                </div>
            </div>
        </div>
    )
}
