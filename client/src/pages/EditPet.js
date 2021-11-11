import React from 'react';
import Auth from '../utils/auth';
import { USER } from '../utils/queries';
import { EDIT_PET, DELETE_PET, UPLOAD_PHOTO } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { MdOutlineArrowBack, MdDeleteForever } from 'react-icons/md';
import { GiConfirmed } from 'react-icons/gi';

function EditPet() {
    const [ editPet ] = useMutation(EDIT_PET);
    const [ deletePet ] = useMutation(DELETE_PET);
    const [ uploadFile ] = useMutation(UPLOAD_PHOTO)
    const { loading, data } = useQuery(USER, {
        variables: {username: Auth.getProfile().data.username}
    });
    let file;
    let pet = {};
    if (!loading) {
        const petName = window.location.href.split('/');
        pet = data.user.pets.find(pet => pet.name === petName[petName.length - 2]);
    }
    function back(event) {
        event.preventDefault();
        window.location.href = `/${document.getElementById('pet-name').value}`;
    }
    async function confirm(event) {
        event.preventDefault();
        if(file) {
            await uploadFile({
                variables: {file}
            });
            await editPet({
                variables: {
                    _id: pet._id,
                    name: document.getElementById('pet-name').value,
                    breed: document.getElementById('pet-breed').value,
                    weight: document.getElementById('pet-weight').value,
                    medications: document.getElementById('pet-medications').value,
                    vaccinations: document.getElementById('pet-vaccinations').value,
                    photo: `/images/${file.name}`
                }
            });
        } else {
            await editPet({
                variables: {
                    _id: pet._id,
                    name: document.getElementById('pet-name').value,
                    breed: document.getElementById('pet-breed').value,
                    weight: document.getElementById('pet-weight').value,
                    medications: document.getElementById('pet-medications').value,
                    vaccinations: document.getElementById('pet-vaccinations').value,
                }
            });
        }
        back(event);

    }
    async function deleteMyPet(event) {
        event.preventDefault();
        await deletePet({
            variables: {
                _id: pet._id
            }
        });
        window.location.href = '/';
    }
    const handleChange = async event => {
        file = event.target.files[0];
        if (!file) return 
        
    }
    return (
        <main>
            {loading ? (<div></div>) : (
                <div>
                    <table className='pet-info'>
                        <thead colSpan='2'>
                            <h1>
                                <input
                                    id='pet-name'
                                    defaultValue={pet.name}
                                    />
                            </h1>
                        </thead>
                        
                        <tr>
                            <thead>
                                Seperate vaccinations and medications by commas
                            </thead>
                        </tr>

                        <tr>
                            <th>
                                Breed:
                            </th>
                            <td>
                                <input
                                    defaultValue={pet.breed}
                                    id="pet-breed"
                                />
                            </td>
                        </tr>
                        
                        <tr>
                            <th>
                                Weight(pounds):
                            </th>
                            <td>
                                <input
                                    id="pet-weight"
                                    defaultValue={pet.weight}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th>
                                Medications:
                            </th>
                            <td>
                                <input
                                    id='pet-medications'
                                    defaultValue={pet.medications}
                                />
                            </td>
                        </tr>

                        <tr>
                            <th>
                                Vaccinations:
                            </th>
                            <td>
                                <input
                                    id='pet-vaccinations'
                                    defaultValue={pet.vaccinations}
                                />
                            </td>
                        </tr>
                        <tr>
                    <th>Photo</th>
                    <td>
                        <input
                            type='file'
                            onChange={handleChange}
                            className='file-select'
                        />
                    </td>
                </tr>

                    </table>

                    <button className='back-btn' onClick={back}>
                        <MdOutlineArrowBack size='2em'/>
                    </button>
                    <button onClick={confirm} className='back-btn'>
                        <GiConfirmed size='2em' />
                    </button>
                    <button onClick={deleteMyPet} className='back-btn'>
                        <MdDeleteForever size='2em' />
                    </button>
                </div>
            )}
        </main>
    );
}

export default EditPet;