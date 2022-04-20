import React, { Fragment,} from 'react';
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
            {user ? (<h1 style={{marginBottom: '-.5em'}}><FaUser className="userIcon"/> {user.name.charAt(0).toUpperCase() + user.name.slice(1)}</h1>) : (<h2><FaUser className="userIcon"/>You are not logged in</h2>)}
            </div>
            <ul>
                {user ? (
                    <li>
                    <button className="btn btn-danger"onClick={onLogout}>
                        <FaSignOutAlt /> Logout
                    </button>
                </li>
                ) : (
                    <Fragment>
                        <li>
                    <Link to="/login" className="btn btn-danger btn-sm"> 
                        <FaSignInAlt /> Login
                    </Link>
                </li>
                <li>
                    <Link to="/register" className="btn btn-dark btn-sm">
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