
import React, { useState } from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import "./Login.css";
import { Link } from 'react-router-dom'
import videoBg from '../assets/running_video.mp4'

export default function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function validateForm() {

    return (email.length > 0 && password.length > 0);
    // return (email.length > 0 && password.length > 0)?(true):(false);

  }

  function handleSubmit(event) {

    event.preventDefault();

  }

  return (

    <div className="login">

     <video src={videoBg} autoPlay loop muted/>
      
      <div className="login-content">
      <nav className='login-nav'>
          <Link to="/"><img src="src/assets/logo.png" alt="logo" className='logo'/></Link>
      </nav>

      <Form onSubmit={handleSubmit} className="login-form">

        <h1 className="login-header">Welcome Back 🏃‍♀️</h1>
        <Form.Group size="lg" controlId="email">

          {/* <Form.Label>Email</Form.Label> */}

          <Form.Control

            type="email"

            placeholder="Email"

            value={email}

            onChange={(e) => setEmail(e.target.value)}

          />

        </Form.Group>

        <Form.Group size="lg" controlId="password">

          {/* <Form.Label>Password</Form.Label> */}

          <Form.Control

            type="password"

            placeholder="Password"

            value={password}

            onChange={(e) => setPassword(e.target.value)}

          />

        </Form.Group>

        <Button block size="lg" type="submit" disabled={!validateForm()} className="login-form-button">

          Sign In

        </Button>

        <div className="login-bottom-text">
        <p>Forgot your password?</p>
        </div>

      </Form>

      </div>

    </div>

  );

}