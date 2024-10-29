import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const loginUser = () => {
        fetch("http://localhost:4000/api/login", {
            method: "POST",
            body: JSON.stringify({
                email,
                password,
            }),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.error_message) {
                    alert(data.error_message);
                } else {
                    alert(data.message);
                    // Store JWT token in localStorage
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("_id", data.id);
                    // Redirect to profile page with user ID (can pass as URL param if needed)
                    if (data.id) {
                        navigate(`/profile/${data.id}`);
                    } else {
                        console.error("User ID is undefined in login response.");
                    }
                }
            })
            .catch((err) => console.error(err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser();
        setEmail("");
        setPassword("");
    };

    return (
        <main className='login'>
            <h1 className='loginTitle'>Log into your account</h1>
            <form className='loginForm' onSubmit={handleSubmit}>
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
                <button className='px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition dark:bg-darkAccent dark:hover:bg-gray-600'>SIGN IN</button>
                <p>
                    Don't have an account? <Link to='/register' className='text-blue-500 hover:text-blue-600 underline transition dark:text-darkAccent dark:hover:text-gray-500 underline'>Create one</Link>
                </p>
            </form>
        </main>
    );
};
export default Login;