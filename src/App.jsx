import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cover from './Cover.jsx'
import Login from './Login.jsx'
import SignUp from './SignUp.jsx'
import Welcome from './Welcome.jsx'
import Branch from './Branch.jsx'
import NewEvent from "./NewEvent.jsx";
import Room from './Room.jsx'
import Profile from './Profile.jsx'
import Defines from "./context/defines.jsx";

export default function App() {
    let subDefines = {
        category_id: ""
        
    }
    const [defines, setDefines] = useState(subDefines);
    return (
        <Defines.Provider value={{ defines, setDefines }}>
            <BrowserRouter>
                <Routes>
                    <Route exact path="/" element={<Cover />} />
                    <Route path="login" element={<Login />} />
                    <Route path="signup" element={<SignUp />} />
                    <Route path="welcome" element={<Welcome />} />
                    <Route path="branch" element={<Branch />} />
                    <Route path="newevent" element={<NewEvent />} />
                    <Route path="room" element={<Room />} />
                    <Route path="profile" element={<Profile />} />
                </Routes>
            </BrowserRouter>

        </Defines.Provider>
    )
}


