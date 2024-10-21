import React from "react";

const Nav = () => {
    const signOut = () => {
        alert("User signed out!");
    };
    return (
        <nav className='navbar w-full p-4 bg-blue-600 dark:bg-gray-800 text-white shadow-md'>
            <h2>Securitify</h2>
            <div className='navbarRight'>
                <button onClick={signOut} className='px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition dark:bg-darkAccent dark:hover:bg-gray-600'>Sign out</button>
            </div>
        </nav>
    );
};

export default Nav;