import React, { useEffect } from 'react';
import Auth from '../utils/auth';
import Profile from './Profile';

function Home() {
    // const [ user, { error } ] = useQuery(USER);
    
    
    return (
        <div>
            {Auth.loggedIn() ? (
                <Profile />
            ) : (
                <h1>Hello, click <a href='/login'>here</a> to login or <a href='signup'>here</a> to sign up!</h1>
            )}
        </div>
    );
}

export default Home;