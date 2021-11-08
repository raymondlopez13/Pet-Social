import React from 'react';
import { ADD_PET } from '../utils/mutations';
import { useMutation } from '@apollo/react-hooks';
import { MdOutlineArrowBack } from 'react-icons/md';
import { GiConfirmed } from 'react-icons/gi';

function AddPet() {
    const [ addPet ] = useMutation(ADD_PET);
    function back(event) {
        event.preventDefault();
        window.location.href = `/`;
    }
    async function confirm(event) {
        event.preventDefault();
        await addPet({
            variables: {
                name: document.getElementById('pet-name').value,
                type: document.getElementById('select').value,
                breed: document.getElementById('pet-breed').value,
                weight: document.getElementById('pet-weight').value,
                medications: document.getElementById('pet-medications').value,
                vaccinations: document.getElementById('pet-vaccinations').value
            }
        });
        back(event);

    }
    return (
        <main>
            <table className='pet-info'>
                <thead colSpan='2'>
                    <h1>
                        <input
                            id='pet-name'
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
                        />
                    </td>
                </tr>

                <tr>
                    <th>
                        Type:
                    </th>
                    <td>
                        <select className='select' id ='select'>
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