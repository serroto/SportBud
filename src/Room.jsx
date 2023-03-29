import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input } from 'antd';
import axios from 'axios';
import moment from 'moment';

export default function Room() {

    let [data1, setData1] = useState({});
    let [data2, setData2] = useState({});
    let [data3, setData3] = useState([]);

    let [message, setMessage] = useState({
        activity_id: localStorage.getItem('activity_id'),
        profile_id: JSON.parse(localStorage.getItem('defines'))._id,
        nickname: JSON.parse(localStorage.getItem('defines')).contents.nickname,
        text: ""
    });

    useEffect(() => {
        console.log(message)
        let URL1 = "//164.90.184.39:9999/activities?id=" + localStorage.getItem('activity_id');
        // console.log(URL1);
        axios
            .get(URL1)
            .then(response => setData1(response.data))
            .catch(function (error) {
                console.log(error);
            })

        let URL2 = "//164.90.184.39:9999/activities?id=" + localStorage.getItem('activity_id');
        axios
            .get(URL2)
            .then(response => {
                // console.log(response.data.contents.clients_infos)
                setData2(response.data.contents)

            })
            .catch(errors => console.log(errors))


        let URL3 = "//164.90.184.39:9999/activitieschats?id=" + localStorage.getItem('activity_id');
        axios
            .get(URL3)
            .then(response => {

                setData3(response.data.filter(item => item.activity_id === localStorage.getItem('activity_id')))

            })
            .catch(errors => console.log(errors))

    }, [])
    return (
        <div className="activity-room">
            <nav className='activity-room-nav'>
                <Link to="/"><img src="src/assets/sportbud_logo_dark.png" alt="logo" className='dark-logo' /></Link>
                <span className='nav-links'>
                    <Link to="/welcome">Home</Link>
                    <Link to="/profile">Profile</Link>
                    <div className='logout' onClick={()=>{
                        localStorage.clear()
                        window.location = '/Login'
                    }}>Logout</div>
                </span>
            </nav>
            <div>
                <div className='room-info'>
                    <div className='room-info-upper'>
                        <p>{data1.title}</p>
                        <p><i className="bi bi-geo-alt-fill white-icon"></i>{data2.location}</p>
                        <p><i className="bi bi-clock-fill white-icon"></i> {moment(data2.startedActRoom).format('YYYY-MM-DD')}</p>
                    </div>
                    <div className='room-info-bottom'>
                        <p><b>{data2.slogan}</b></p>
                        <p>ROOM ADMIN <span className='darker'>{data2.admin}</span></p>
                        <p>THIS ROOM'S CAPACITY<span className='darker'>: {data2.capacity}</span></p>
                        <p>PARTICIPANTS</p>
                        {data2.clients_infos && data2.clients_infos.map((x, y) => (
                                <p className='participants' key={y}>{x.user_name}</p>
                            ))}

                        <button className='mail-button' style={{marginTop:"15px", display: data2.clients_infos && data2.clients_infos.length <= data2.capacity ? 'block' : 'none' }} onClick={() => {
							
							let URL = "//164.90.184.39:9999/activities/" + localStorage.getItem('activity_id');
                            
							axios
								.put(URL, {
                                    
                                        user_id: JSON.parse(localStorage.getItem("defines"))._id,
                                        user_name: JSON.parse(localStorage.getItem("defines")).contents.firstname + " " + JSON.parse(localStorage.getItem("defines")).contents.lastname
                                    
                                })
								.then(response => {
								  console.log(response.data)
                                  window.location.reload()
                                    
                                });
                                
						}}><i className="bi bi-plus-lg"></i>  JOIN ROOM</button>
                    </div>
                </div>

                <div className='app'>
                    <div className='screen join-screen'>
                        <div className="form">
                            <h2>Join Chatroom</h2>
                            <div className="form-input">
                                <label>Username</label>
                                <Input placeholder='Mesajınızı giriniz ...' onChange={() => {
                                    setData(prev => {
                                        const newData = { ...prev };
                                        newData.contents.capacity = value;
                                        return newData;
                                    })
                                }} />

                            </div>
                            <div className="form-input">
                                <button className="join-user">Join</button>
                            </div>
                        </div>

                    </div>
                    <div className='screen chat-screen active'>
                        <div className="header">
                            <div className="logo">Chatroom</div>
                            <button className="exit-chat">Exit</button>
                        </div>
                        <div className="messages">

                            {data3.map((x, y) => <div key={y}className={x.profile_id === JSON.parse(localStorage.getItem('defines'))._id ? "message my-message" : "message other-message"}>
                                    <div>
                                        <div className="name">{x.nickname}</div>
                                        <div className="text">{x.text}</div>
                                    </div>
                                </div>

                            )}
                        </div>
                        <div className="typebox">
                            <Input type="text" className="message-input" onChange={ e =>{
                                let value = e.target.value
                                setMessage(prev => {
                                    const newMessage = { ...prev };
                                    newMessage.text = value;
                                    return newMessage;
                                })
                            }} />
                            <button className='send-message' onClick={()=>{

                                let URL = "//164.90.184.39:9999/activitieschats"

                                axios
                                    .post(URL, message)
                                    .then(response => {window.location.reload()}) 
                                    .catch(function (error) {
                                        console.log(error);
                                    })

                            }}>Send</button>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
}