import React from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import { IoIosLogIn } from "react-icons/io";

function Header() {
    return (

        <header id="main-header">

            <div className="header-content">
                <Link to="/">Super Events</Link>
                <Link to="/login"><IoIosLogIn /> <span>Entrar</span></Link>
            </div>

        </header>
    );
}

export default Header;