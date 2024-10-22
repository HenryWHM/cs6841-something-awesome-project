import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import ForumHome from "./pages/forum/Home";
import Replies from "./pages/forum/Replies";
import Profile from "./pages/Profile";

const App = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Login />} />
                    <Route path='/register' element={<Register />} />
                    <Route path='/profile' element={<Profile />} />
                    <Route path='/forum/dashboard' element={<ForumHome />} />
                    <Route path='/forum/:id/replies' element={<Replies />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App;
