import React from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';

import Auth from '../utils/auth';

function Nav() {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
      };
    const dropdown = event => {
        event.preventDefault();
        const nav = document.getElementById('nav');
        if (nav.classList.contains('hidden')) {
            nav.classList.remove('hidden');
        } else {
            nav.classList.add('hidden');
        }
    }
    return (
        <header>
            <div>
                <h1>
                    <a href='/'>My Pets</a>
                </h1>
            </div>
            <button className='dropdown' onClick={dropdown}>
                <GiHamburgerMenu />
            </button>
            <nav className='hidden' id="nav">
                {Auth.loggedIn() ? (
                    <>
                        <Link to='/user'>
                            User
                        </Link>
                        <a href='/' onClick={logout}>
                            Logout
                        </a>
                    </>
                ) : (
                    <>
                        <Link to='/login'>
                            Login
                        </Link>
                        <Link to='/signup'>
                            Sign up
                        </Link>
                    </>
                )}
            </nav>
        </header>
    );
}

export default Nav;