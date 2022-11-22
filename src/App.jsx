import { useState } from 'react'
import reactLogo from './assets/react.svg'
import Cover from './cover/Cover.jsx'
import Login from './login/Login.jsx'
import SignUp from './signup/SignUp.jsx'
import React from "react";
import { Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Routes>
        <Route exact path="/" element={<Cover />} />
        <Route exact path="login" element={<Login />} />
        <Route exact path="signup" element={<SignUp />} />
      </Routes>
  )
}


