import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Cover from './Cover.jsx'
import Login from './Login.jsx'
import SignUp from './SignUp.jsx'
import Welcome from './Welcome.jsx'
import Branch from './Branch.jsx'
import NewEvent from "./NewEvent.jsx";
import Room from './Room.jsx'
import Profile from './Profile.jsx'

export default function App() {
  return (
    <Routes>
        <Route exact path="/" element={<Cover />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="signup" element={<SignUp />} />
        <Route exact path="welcome" element={<Welcome />} />
        <Route exact path="branch" element={<Branch />} />
        <Route exact path="newevent" element={<NewEvent />} />
        <Route exact path="room" element={<Room />} />
        <Route exact path="profile" element={<Profile />} />
      </Routes>
  )
}


