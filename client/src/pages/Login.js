import React, { useState } from 'react';
import Auth from '../utils/auth';
import { useMutation } from '@apollo/react-hooks';
import { LOGIN } from '../utils/mutations'

function Login() {
    const [ formState, setFormState ] = useState({ username: '', password: ''});
    const [ login, { error } ] = useMutation(LOGIN);

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
            const { data } = await login({
            variables: { ...formState }
            });
    
            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }
    
        // clear form values
        setFormState({
            email: '',
            password: ''
        });
    };
    return (
        <main>
            <div className='login-container'>
                <h1>Login</h1>
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

                    {error && <h2 className='login-fail'>Login failed</h2>}
                </div>
            </div>
        </main>
    );
}

export default Login;