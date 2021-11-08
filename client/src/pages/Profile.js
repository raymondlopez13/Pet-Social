import React, { useEffect } from 'react';
import Auth from '../utils/auth';
import { FaUserCircle } from 'react-icons/fa';
import { USER } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import { FaDog, FaCat } from 'react-icons/fa';

function Profile() {
    const { loading, data } = useQuery(USER, {
        variables: {username: Auth.getProfile().data.username}
    });
    useEffect(() => {
    }, [data])
    
    return (
        <main>
            { loading ? (
                <h2>Loading</h2>
            ) : (
                <div>
                    <div className='user'>
                        <FaUserCircle size="10em" color="gray"/>
                        <h1>
                            {Auth.getProfile().data.username}
                        </h1>
                    </div>
                    <div className='pets'>
                        {data.user.pets.map(function(pet) {
                            return (
                                <a href='#' className='Pet'>
                                    {pet.type === 'Dog' ? (
                                        <FaDog size='5em' color='gray' className='pet-icon'/>
                                    ) : (
                                        <FaCat size='5em' color='gray' className='pet-icon'/>
                                    )}
                                    <h1>{pet.name}</h1>
                                </a>
                            )
                        })}
                    </div>
                </div>
            )}
            
        </main>
    );
}

export default Profile;