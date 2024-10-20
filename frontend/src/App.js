import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
