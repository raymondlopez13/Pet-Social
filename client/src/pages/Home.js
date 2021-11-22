import React from 'react';
import Auth from '../utils/auth';
import Profile from './Profile';
import { MdPets } from 'react-icons/md';

function Home() {
    // const [ user, { error } ] = useQuery(USER);
    
    
    return (
        <div>
            {Auth.loggedIn() ? (
                <Profile />
            ) : (
                <div className='landing-container'>
                    <MdPets size='5em'/>
                    <h1>Welcome to My Pets!</h1>
                    <br/>
                    <h2>A place to keep track of your furry friends and their needs</h2>
                    <br/>
                    <h2>Never forget your pets medications, vaccinations, or weight again! </h2>
                    <br/>
                    <h1>Click <a href='/login' className='loginOrSignup'>here</a> to login or <a href='signup' className='loginOrSignup'>here</a> to sign up!</h1>
                </div>
            )}
        </div>
    );
}

export default Home;