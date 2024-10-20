import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Context, useContext } from '../context';

const SettingsPage = () => {
  const { getters, setters } = useContext(Context);
  const navigate = useNavigate();
  const [username, setUsername] = useState(getters.userData.username || 'User');
  const [notificationsEnabled, setNotificationsEnabled] = useState(getters.userData.notificationsEnabled || false);

useEffect(() => {
  if (getters.userData.mode === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
}, [getters.userData.mode]);

  // Toggle dark/light mode
  const toggleMode = () => {
    setters.setUserData((prevUserData) => ({
      ...prevUserData,
      mode: prevUserData.mode === 'light' ? 'dark' : 'light',
    }));
  };

  // Handle username change
  const handleUsernameChange = () => {
    if (username) {
      setters.setUserData((prevUserData) => ({
        ...prevUserData,
        username: username,
      }));
      alert('Username updated successfully!');
    } else {
      alert('Please enter a valid username.');
    }
  };

  // Toggle notifications
  const toggleNotifications = () => {
    const confirmToggle = window.confirm(
      notificationsEnabled
        ? 'Are you sure you want to disable notifications?'
        : 'Do you want to enable notifications?'
      );

      if (confirmToggle) {
        setNotificationsEnabled((prev) => !prev);
        setters.setUserData((prevUserData) => ({
          ...prevUserData,
          notificationsEnabled: !prevUserData.notificationsEnabled,
        }));
      }
  };

  return (
    <div className={`min-h-screen ${getters.userData.mode === 'dark' ? 'bg-darkBackground text-lightText' : 'bg-lightBackground text-darkText'} py-10`}>
      <div className="max-w-3xl mx-auto p-8 bg-white dark:bg-black text-black dark:text-white shadow-lg rounded-lg">
        <h1 className="text-4xl font-bold mb-8">Settings Page</h1>

        {/* Username Setting */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Update Username</h2>
          <input
            className="p-2 border border-gray-300 dark:border-gray-700 rounded-md mb-4 w-full bg-white text-black dark:bg-gray-900 dark:text-white"
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 dark:bg-darkAccent dark:hover:bg-gray-700 transition"
            onClick={handleUsernameChange}
          >
            Save Username
          </button>
        </div>

        {/* Mode Toggle */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Display Mode</h2>
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 dark:bg-darkAccent dark:hover:bg-gray-700 transition"
            onClick={toggleMode}
          >
            {getters.userData.mode === 'light' ? 'Enable Dark Mode' : 'Enable Light Mode'}
          </button>
        </div>

        {/* Notifications Toggle */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Notifications</h2>
          <label className="flex items-center space-x-3">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-blue-600 dark:text-darkAccent"
              checked={notificationsEnabled}
              onChange={toggleNotifications}
            />
            <span className="text-lg">Enable Notifications</span>
          </label>
        </div>

        {/* Navigate Back to Home */}
        <div className="mt-10">
          <button
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 dark:bg-darkAccent dark:hover:bg-gray-700 transition"
            onClick={() => navigate('/')}
          >
            Go Back Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
