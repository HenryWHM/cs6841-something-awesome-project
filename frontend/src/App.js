import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Home from "./pages/forum/Home";
import Replies from "./pages/forum/Replies";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/dashboard' element={<Home />} />
                    <Route path='/:id/replies' element={<Replies />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
