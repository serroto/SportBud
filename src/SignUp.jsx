
import React, { useState } from "react";

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Link } from 'react-router-dom'
import videoBg from './assets/yoga_video.mp4'

export default function SignUp() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  function validateForm() {

    return (email.length > 0 && password.length > 0);

  }

  function handleSubmit(event) {

    event.preventDefault();

  }

  return (

    <div className="signup">

     <video src={videoBg} autoPlay loop muted/>
      
      <div className="signup-content">
      <nav className='signup-nav'>
          <Link to="/"><img src="src/assets/logo.png" alt="logo" className='logo'/></Link>
      </nav>

      <Form onSubmit={handleSubmit} className="signup-form">

        <h2 className="signup-header">Join Us ✨🖖</h2>
        <Form.Group size="lg" controlId="name">

{/* <Form.Label>Email</Form.Label> */}

<Form.Control

  type="name"

  placeholder="Your name"

/>

</Form.Group>

        <Form.Group size="lg" controlId="email">

          {/* <Form.Label>Email</Form.Label> */}

          <Form.Control

            type="email"

            placeholder="Your mail"

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

        <Button block size="lg" type="submit" disabled={!validateForm()} className="signup-form-button">

          Sign Up

        </Button>

        <div className="signup-bottom-text">
        <p>Already a member? <Link to="/Login">Sign In</Link></p>
        </div>
      </Form>

      </div>

    </div>

  );

}