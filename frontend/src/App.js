import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage';
import './App.css';
import SchedulePage from './pages/SchedulePage';
import SettingsPage from './pages/SettingsPage';
import { Context, initialValue } from './context';
import Loading from './components/Loading';

function App() {
  const [userData, setUserData] = useState(initialValue.userData);
  const [isLoading, setLoading] = useState(initialValue.isLoading);

  const getters = { userData, isLoading };
  const setters = { setUserData, setLoading };

  // Retrieve user data from local storage
  useEffect(() => {
    setters.setLoading(true)
    const localStorageUserData = localStorage.getItem('userData');
    if (localStorageUserData) {
      console.log("localstoragedata already exists")
      setters.setUserData(JSON.parse(localStorageUserData));
      console.log("localstoragedata: ", JSON.parse(getters.userData))
    } else {
      console.log("localstoragedata does not exist")
      // Set default user data if none exists in local storage
      let defaultUserData = {
        tasks: [],
        mode: "light",
      };
      setters.setUserData(defaultUserData);
      localStorage.setItem('userData', JSON.stringify(defaultUserData));
    }
    setters.setLoading(false);
  }, []);

  if (getters.isLoading) {
    return <Loading />;
  }

  return (
    <Context.Provider value={{ getters, setters }}>
      <div className={`min-h-screen ${userData.mode === 'dark' ? 'bg-darkBackground text-lightText' : 'bg-lightBackground text-darkText'}`}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </Context.Provider>
  );
}

export default App;
