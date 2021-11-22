import React from 'react';
import Auth from '../utils/auth';
import { FaUserCircle, FaDog, FaCat } from 'react-icons/fa';
import { USER } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';

function Profile() {
    const { loading, data } = useQuery(USER, {
        variables: {username: Auth.getProfile().data.username}
    });
    function AddPet(event) {
        event.preventDefault();
        window.location.href = '/add-pet'
    }
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
                        <button onClick={AddPet} className='add-pet'>Add Pet</button>
                    </div>
                    <div className='pets'>
                        {data.user.pets.map(function(pet) {
                            return (
                                <a href={`/${pet.name}`} className='Pet'>
                                    {pet.photo ? (
                                        <div className='img-container'>
                                            <img src={pet.photo} alt='Pet' className="pet-img"/>
                                        </div>
                                    ) : (
                                        <div>
                                            {pet.type === 'Dog' ? (
                                                <FaDog size='5em' color='gray' className='pet-icon'/>
                                            ) : (
                                                <FaCat size='5em' color='gray' className='pet-icon'/>
                                            )}
                                        </div>
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