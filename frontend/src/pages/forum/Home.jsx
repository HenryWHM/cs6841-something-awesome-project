import React, { useState } from "react";
import Nav from "./Nav";

const Home = () => {
    const [thread, setThread] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ thread });
        setThread("");
    };
    return (
        <>
            <Nav />
            <main className='home'>
                <h2 className='homeTitle'>Create a Thread</h2>
                <form className='homeForm' onSubmit={handleSubmit}>
                    <div className='home__container'>
                        <label htmlFor='thread'>Title / Description</label>
                        <input
                            type='text'
                            name='thread'
                            required
                            value={thread}
                            onChange={(e) => setThread(e.target.value)}
                        />
                    </div>
                    <button className='px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition dark:bg-darkAccent dark:hover:bg-gray-600'>CREATE THREAD</button>
                </form>
            </main>
        </>
    );
};

export default Home;