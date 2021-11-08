import React from 'react';
import Auth from '../utils/auth';
import { USER } from '../utils/queries';
import { useQuery } from '@apollo/react-hooks';
import { MdOutlineArrowBack } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';

function Pet() {
    const { loading, data } = useQuery(USER, {
        variables: {username: Auth.getProfile().data.username}
    });
    let pet = {};
    if (!loading) {
        const petName = window.location.href.split('/').pop();
        pet = data.user.pets.find(pet => pet.name === petName);
    }
    function back(event) {
        event.preventDefault();
        window.location.href = '/';
    }
    function edit(event) {
        event.preventDefault();
        window.location.href = `/${pet.name}/edit`;
    }
    return (
        <main>
            {loading ? (<div></div>) : (
                <div>
                    <table className='pet-info'>
                        <thead colSpan='2'>
                            <h1>
                                {pet.name}
                            </h1>
                        </thead>
                        

                        <tr>
                            <th>
                                Breed:
                            </th>
                            <td>
                                {pet.breed}
                            </td>
                        </tr>
                        
                        <tr>
                            <th>
                                Weight(pounds):
                            </th>
                            <td>
                                {pet.weight}
                            </td>
                        </tr>

                        <tr>
                            <th>
                                Medications:
                            </th>
                            <td>
                                {pet.medications}
                            </td>
                        </tr>

                        <tr>
                            <th>
                                Vaccinations:
                            </th>
                            <td>
                                {pet.vaccinations}
                            </td>
                        </tr>

                    </table>

                    <button className='back-btn' onClick={back}>
                        <MdOutlineArrowBack size='2em'/>
                    </button>
                    <button className='back-btn' onClick={edit}>
                        <AiOutlineEdit size='2em' />
                    </button>
                </div>
            )}
        </main>
    );
}

export default Pet;