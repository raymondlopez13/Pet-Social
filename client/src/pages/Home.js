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
                <div>Hello new user</div>
            )}
        </div>
    );
}

export default Home;