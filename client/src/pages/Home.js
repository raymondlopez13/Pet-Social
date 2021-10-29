import React, { useEffect } from 'react';
import Auth from '../utils/auth';

function Home() {
    // const [ user, { error } ] = useQuery(USER);
    
    
    return (
        <div>
            {Auth.loggedIn() ? (
                <h1>Hello {Auth.getProfile().data.username}</h1>
            ) : (
                <div>Hello new user</div>
            )}
        </div>
    );
}

export default Home;