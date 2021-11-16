import React from 'react';
import Auth from '../utils/auth';
import { USER } from '../utils/queries';
import { EDIT_PET, DELETE_PET, UPLOAD_PHOTO } from '../utils/mutations';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { MdOutlineArrowBack, MdDeleteForever } from 'react-icons/md';
import { GiConfirmed } from 'react-icons/gi';
import { back } from '../utils/addPetFunctions';

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
    async function confirm(event) {
        event.preventDefault();
        if(document.getElementById('pet-name').value === '' || null) {
            formError('Name');
            return
        } 
        else if(document.getElementById('pet-breed').value === '' || null) {
            formError('Breed');
            return
        }
        else if(document.getElementById('pet-weight').value === '' || null) {
            formError('Weight');
            return
        }
        if(file) {
            const photoUpload = await uploadFile({
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
                    photo: photoUpload.data.uploadFile
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
    }

    function formError(err) {
        document.getElementById('formError').innerHTML = `${err} is a required field.`
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
                                    required
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
                                    required
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
                                    required
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
                    <tr>
                        <th id='formError'></th>
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