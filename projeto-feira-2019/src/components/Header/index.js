import React from 'react';
import {Link} from 'react-router-dom';
import './header.css';

function Header(){
    return(
        <header id="main-header">
            <div className="header-content">
                <Link to="/">Super Events</Link>
                <Link to="/login">Sing In</Link>
            </div>
        </header>
    );
}

export default Header;