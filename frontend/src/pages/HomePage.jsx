import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext, Context } from '../context';

const HomePage = () => {
  const { getters } = useContext(Context);
  const navigate = useNavigate();

  return (
    <div className={`min-h-screen flex flex-col justify-center items-center ${getters.userData.mode === 'dark' ? 'bg-darkBackground text-lightText' : 'bg-lightBackground text-darkText'}`}>

      {/* Navbar */}
      <header className="w-full p-4 bg-blue-600 dark:bg-gray-800 text-white shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">My Personal Schedular App</h1>
          <nav className="space-x-4">
            <button className="hover:text-gray-300" onClick={() => navigate("/schedule")}>Schedule</button>
            <button className="hover:text-gray-300" onClick={() => navigate("/settings")}>Settings</button>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-5xl font-extrabold underline mb-6">
          Welcome to Your Personal Scheduler!
        </h1>
        <p className="mb-8 text-lg">
          Organize your tasks and settings efficiently with our tools.
        </p>

        <div className="space-x-4">
          <button
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition dark:bg-darkAccent dark:hover:bg-gray-600"
            onClick={() => navigate("/schedule")}
          >
            Go to Schedule Page
          </button>
          <button
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg shadow-md transition dark:bg-darkAccent dark:hover:bg-gray-600"
            onClick={() => navigate("/settings")}
          >
            Go to Settings Page
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full p-4 bg-blue-600 dark:bg-gray-800 text-white text-center shadow-md">
        <p>&copy; 2024 My Personal Schedular App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;
