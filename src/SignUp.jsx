
import React, { useState, useEffect,useContext } from "react";
import { Link } from 'react-router-dom'
import { Select, Space, Input, Button, Row, Col } from 'antd';
import videoBg from './assets/yoga_video.mp4'
import axios from 'axios';
import Defines from "./context/defines";


export default function SignUp() {
    
    let { defines, setDefines } = useContext(Defines);

    let options = []

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        let URL = "//164.90.184.39:9999/categories";
        //   console.log(URL);
        axios
            .get(URL)
            .then(Response => Response.data.forEach(item => options.push({ label: item.title, value: item._id })))
            .catch(function (error) {
                console.log(error);
            })
            .then(() => setCategories(options))

    }, [])


 

    const [profile, setProfile] = useState({
        parent_id: "",
        google_oauth2_id: "",
        status: true,
        sort: 1,
        lang: "en",
        title: "",
        contents: {
            nickname: "",
            firstname: "",
            lastname: "",
            email:"",
            password:"",
            location: "",
            about: "",
            favorite_branches: [],
            loyalty: [],
            fair_play: [],
            performance: []
        }
    })

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    function validateForm() {

        return (email.length > 0 && password.length > 0);

    }

    function handleSubmit(event) {

        event.preventDefault();

    }

    useEffect(() => {
        setProfile(prev => {
            const newProfile = { ...prev };
            newProfile.title = profile.contents.firstname +' '+ profile.contents.lastname ;
            return newProfile;
        })
    },[profile])

    return (

        <div className="signup">

            <video src={videoBg} autoPlay loop muted />

            <div className="signup-content">
                <nav className='signup-nav'>
                    <Link to="/"><img src="src/assets/logo.png" alt="logo" className='logo' /></Link>
                </nav>
                <br />
                <br />
                <br />
                <br />

                <Row>
                    <Col span={6} offset={9}>

                        <Space direction="vertical" style={{ width: "100%" }}>
                            <Input className='form-control-2' placeholder="Nickname" style={{ width: "100%" }} onChange={e => {
                                const value = e.target.value
                                setProfile(prev => {
                                    const newProfile = { ...prev };
                                    newProfile.contents.nickname = value;
                                    return newProfile;
                                })

                            }} />

                            <Input className='form-control-2' placeholder="Firstname" style={{ width: "100%" }} onChange={e => {
                                const value = e.target.value
                                setProfile(prev => {
                                    const newProfile = { ...prev };
                                    newProfile.contents.firstname = value;
                                    return newProfile;
                                })

                            }} />

                            <Input className='form-control-2' placeholder="Lastname" style={{ width: "100%" }} onChange={e => {
                                const value = e.target.value
                                setProfile(prev => {
                                    const newProfile = { ...prev };
                                    newProfile.contents.lastname = value;
                                    return newProfile;
                                })

                            }} />

                            <Input className='form-control-2' placeholder="Email" style={{ width: "100%" }} onChange={e => {
                                const value = e.target.value
                                setProfile(prev => {
                                    const newProfile = { ...prev };
                                    newProfile.contents.email = value;
                                    return newProfile;
                                })

                            }} />

                            <Input.Password className='form-control-2' placeholder="Password" style={{ width: "100%" }} onChange={e => {
                                const value = e.target.value
                                setProfile(prev => {
                                    const newProfile = { ...prev };
                                    newProfile.contents.password = value;
                                    return newProfile;
                                })

                            }} />

                            <Input className='form-control-2' placeholder="Location" style={{ width: "100%" }} onChange={e => {
                                const value = e.target.value
                                setProfile(prev => {
                                    const newProfile = { ...prev };
                                    newProfile.contents.location = value;
                                    return newProfile;
                                })

                            }} />

                            <Input className='form-control-2' placeholder="About You" style={{ width: "100%" }} onChange={e => {
                                const value = e.target.value
                                setProfile(prev => {
                                    const newProfile = { ...prev };
                                    newProfile.contents.about = value;
                                    return newProfile;
                                })

                            }} />
                            <Select  className='form-control-2' style={{ width: "100%" ,height:"35px", color:"#000000"}}
                                mode="multiple"
                                allowClear
                                placeholder="Favorite Branches"
                                onChange={e => {
                                    const value = e
                                    setProfile(prev => {
                                        const newProfile = { ...prev };
                                        newProfile.contents.favorite_branches = value;
                                        return newProfile;
                                    })
                                }}
                                options={categories}
                            />



                        </Space>


                    </Col>
                </Row>
                <Row>
                    <Col span={12} offset={9}>
                        <div className="signup-bottom-text">
                            <p>Already a member? <Link to="/Login">Sign In</Link></p>
                        </div>      </Col>
                    <Col span={4} offset={11} className="signup-bottom-text">
                        <Button className='create-room-btn' style={{ width: "85px", margin:"0px 0px"}} onClick={() => {
                            localStorage.clear();

                            let URL = "//164.90.184.39:9999/profiles"
                            axios
                                .post(URL, profile)
                                .then(response => {

                                    window.location='/login'
                                    // console.log(response)
                                })
                                .catch(function (error) {
                                    console.log(error);
                                })
                        }}>Sign Up</Button>
                    </Col>
                </Row>




            </div>

        </div>

    );

}