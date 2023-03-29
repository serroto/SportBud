import React, { useEffect, useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { Space, Input, Button, Row, Col } from 'antd';
import axios from 'axios';
import videoBg from './assets/running_video.mp4';
import Defines from "./context/defines";


export default function Login() {
    const { defines, setDefines } = useContext(Defines);


    const [login, setLogin] = useState({
        email: "",
        password: ""
    });

    useEffect(()=>{
    

    })

    return (

        <div className="login">
            <video src={videoBg} autoPlay loop muted />

            <div className="login-content">
                <nav className='login-nav'>
                    <Link to="/"><img src="src/assets/logo.png" alt="logo" className='logo' /></Link>
                </nav>
                <br />
                <br />
                <br />
                <br />

                <Row>
                    <Col span={6} offset={9}>

                        <Space direction="vertical" style={{ width: "100%" }}>

                            <Input className='form-control-2' placeholder="Enter Email" style={{ width: "100%" }} onChange={e => {
                                const value = e.target.value
                                setLogin(prev => {
                                    const newLogin = { ...prev };
                                    newLogin.email = value;
                                    return newLogin;
                                })

                            }} />

                            <Input.Password className='form-control-2' placeholder="Enter Password" style={{ width: "100%" }} onChange={e => {
                                const value = e.target.value
                                setLogin(prev => {
                                    const newLogin = { ...prev };
                                    newLogin.password = value;
                                    return newLogin;
                                })

                            }} />

                        </Space>


                    </Col>
                </Row>
                <Row>

                    <Col span={4} offset={11} className="signup-bottom-text">
                        <Button className='create-room-btn' style={{ width: "85px", margin: "10px 0px" }} onClick={() => {

                            let URL = "//164.90.184.39:9999/profiles/login?email=" + login.email + "&password=" + login.password

                            axios
                                .get(URL)
                                .then(response => {
 
                                   if(response.data.contents.email === login.email) {
                                    // console.log(response.data.contents.email)

                                        localStorage.setItem('defines', JSON.stringify(response.data))

                                        window.location ='/welcome'
                                   }

                                })
                                .catch(function (error) {
                                    console.log(error);
                                })
                        }}>Login</Button>
                    </Col>
                </Row>

            </div>

        </div>

    );

}