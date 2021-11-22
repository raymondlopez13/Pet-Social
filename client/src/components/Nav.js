import React from 'react';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdPets } from 'react-icons/md';

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
                    <a href='/'><MdPets /></a>
                </h1>
            </div>
            <button className='dropdown' onClick={dropdown} id ='hamburger'>
                <GiHamburgerMenu />
            </button>
            <nav className='hidden' id="nav">
                {Auth.loggedIn() ? (
                    <>
                        <a href='/' className='logout' onClick={logout}>
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