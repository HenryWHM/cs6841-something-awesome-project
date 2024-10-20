import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ username, email, password });
        setEmail("");
        setUsername("");
        setPassword("");
    };
    return (
        <main className='register'>
            <h1 className='registerTitle'>Create an account</h1>
            <form className='registerForm' onSubmit={handleSubmit}>
                <label htmlFor='username'>Username</label>
                <input
                    type='text'
                    name='username'
                    id='username'
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor='email'>Email Address</label>
                <input
                    type='text'
                    name='email'
                    id='email'
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition dark:bg-darkAccent dark:hover:bg-gray-600'>REGISTER</button>
                <p>
                    Have an account? <Link to='/' className='text-blue-500 hover:text-blue-600 underline transition dark:text-darkAccent dark:hover:text-gray-500 underline'>Sign in</Link>
                </p>
            </form>
        </main>
    );
};

export default Register;