import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

function Nav() {
    const logout = event => {
        event.preventDefault();
        Auth.logout();
      };

    return (
        <header>
            <div>
                <h1>
                    My Pets
                </h1>
            </div>
            <nav>
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