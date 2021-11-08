import React, { useState } from 'react';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/react-hooks';
import { ADD_USER, LOGIN } from '../utils/mutations'

function Signup() {
    const [ formState, setFormState ] = useState({ email: '', username: '', password: ''});
    const [ signup, { error } ] = useMutation(ADD_USER);
    const [ login ] = useMutation(LOGIN);

    const handleChange = event => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value
          });
    }
    const formSubmit = async event => {
        event.preventDefault();
    
        try {
            const signupUser = await signup({
            variables: { ...formState }
            });
            console.log(signupUser);
            const { data } = await login({
                variables: {
                    username: signupUser.data.addUser.username,
                    password: formState.password
                }
            })
            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }
    
        // clear form values
        setFormState({
            email: '',
            username: '',
            password: ''
        });
    };
    return (
        <main>
            <div className='login-container'>
                <h1>Signup</h1>
                <div className="card-body">
                    <form className='form-vertical' onSubmit={formSubmit}>
                        <input
                            placeholder="Your username"
                            name="username"
                            id="username"
                            value={formState.username}
                            onChange={handleChange}
                        />
                        <input
                            placeholder="Your email"
                            name="email"
                            id="email"
                            value={formState.email}
                            onChange={handleChange}
                        />
                        <input
                            placeholder="******"
                            name="password"
                            type="password"
                            id="password"
                            value={formState.password}
                            onChange={handleChange}
                        />
                        <button className='submit-btn' type="submit">
                            Submit
                        </button>
                    </form>

                    {error && <div className='login-fail'>Login failed</div>}
                </div>
            </div>
        </main>
    );
}

export default Signup;