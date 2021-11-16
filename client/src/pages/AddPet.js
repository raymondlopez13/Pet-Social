import React from 'react';
import { ADD_PET, UPLOAD_PHOTO } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
import { MdOutlineArrowBack } from 'react-icons/md';
import { GiConfirmed } from 'react-icons/gi';
import { back } from '../utils/addPetFunctions';

function AddPet() {
    const [ addPet ] = useMutation(ADD_PET);
    const [ uploadFile ] = useMutation(UPLOAD_PHOTO);
    let file;
    async function confirm(event) {
        event.preventDefault();
        if(document.getElementById('pet-name').value === '' || null) {
            formError('Name');
            return
        } 
        else if(document.getElementById('select').value === '' || null) {
            formError('Type');
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
            await uploadFile({
                variables: {file}
            });
            await addPet({
                variables: {
                    name: document.getElementById('pet-name').value,
                    type: document.getElementById('select').value,
                    breed: document.getElementById('pet-breed').value,
                    weight: document.getElementById('pet-weight').value,
                    medications: document.getElementById('pet-medications').value,
                    vaccinations: document.getElementById('pet-vaccinations').value,
                    // photo: `http://localhost:3001/images/${file.name}`,
                    photo: `/images/${file.name}`
                }
            });
        } else {
            await addPet({
                variables: {
                    name: document.getElementById('pet-name').value,
                    type: document.getElementById('select').value,
                    breed: document.getElementById('pet-breed').value,
                    weight: document.getElementById('pet-weight').value,
                    medications: document.getElementById('pet-medications').value,
                    vaccinations: document.getElementById('pet-vaccinations').value,
                }
            });
        }
        
        
        back(event);

    }
    const handleChange = async event => {
        file = event.target.files[0];      
    }

    function formError(err) {
        document.getElementById('formError').innerHTML = `${err} is a required field.`
    }
    return (
        <main>
            <table className='pet-info'>
                <thead colSpan='2'>
                    <h1>
                        <input
                            id='pet-name'
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
                            id="pet-breed"
                            required
                        />
                    </td>
                </tr>

                <tr>
                    <th>
                        Type:
                    </th>
                    <td>
                        <select className='select' id ='select' required>
                            <option value='Dog'>Dog</option>
                            <option value='Cat'>Cat</option>
                        </select>
                    </td>
                </tr>
                
                <tr>
                    <th>
                        Weight(pounds):
                    </th>
                    <td>
                        <input
                            id="pet-weight"
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
        </main>
    );
}

export default AddPet;