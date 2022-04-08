import React, { Fragment, useEffect, useState } from 'react';
import {useNavigate} from 'react-router-dom';

import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa';
import {Link} from 'react-router-dom'


const Header = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));
    // useEffect(() => {console.log("header:", user)},[])
    const onLogout = () => {
        localStorage.removeItem('user');
        navigate('/login')
    }
  return (
    <Fragment>
        <header className="header">
            <div className="logo">
            {user ? (<h4><FaUser className="userIcon"/> {user.name}</h4>) : (<h5><FaUser className="userIcon"/>You are not logged in</h5>)}
            </div>
            <ul>
                {user ? (
                    <li>
                    <button className="btn"onClick={onLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                </li>
                ) : (
                    <Fragment>
                        <li>
                    <Link to="/login"> 
                        <FaSignInAlt /> Login
                    </Link>
                </li>
                <li>
                    <Link to="/register">
                        <FaUser className="userIcon"/> Register
                    </Link>
                </li>
                    </Fragment>
                )}
                
            </ul>
        </header>
    </Fragment>

  )
}

export default Header