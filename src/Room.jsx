import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Input, Select, Space } from 'antd';
import axios from 'axios';


const handleChange = (type, user_id, activity_id, score) => {

    // console.log(`selected ${type}, ${user_id}, ${activity_id},${score}`);

    let evaluation = {
        loyalty: type === 'loyalty' ? [{ "user_id": JSON.parse(localStorage.getItem('defines'))._id, "activity_id": activity_id, "score": parseInt(score) }] : [],
        fair_play: type === 'fair_play' ? [{ "user_id": JSON.parse(localStorage.getItem('defines'))._id, "activity_id": activity_id, "score": parseInt(score) }] : [],
        performance: type === 'performance' ? [{ "user_id": JSON.parse(localStorage.getItem('defines'))._id, "activity_id": activity_id, "score": parseInt(score) }] : []
    }

    console.log(user_id);

    let URL = "//164.90.184.39:9999/profiles/evaluations/" + user_id

    axios
        .put(URL, evaluation)
        .then(response => {
            console.log(response)
        })
        .catch(function (error) {
            console.log(error);
        })


};


const checkPoint = async (type, user_id, activity_id, voted_person_id) => {

    // console.log(`selected ${type}, ${user_id}, ${activity_id},${score}`);

    let point = {
        "activity_id": activity_id,
        "user_id": user_id // Oylayan kişi yani login olan
    }

    // console.log(point);

    let URL = "//164.90.184.39:9999/profiles/check_point/" + type + "/" + voted_person_id // Oylanan Kişi
    // console.log(URL);

    let deneme = await axios
        .post(URL, point)
        .then(response => response.data)
        .catch(error => console.log(error))

   return deneme

};

export default function Room() {

    // function user_name(user_id)
    //    console.log(user_id)
    // }


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

        if (localStorage.getItem('defines') === null || JSON.parse(localStorage.getItem('defines'))['deleted'] != 0) {
            window.location = "/login";
        }
        // console.log(message)
        // console.log(JSON.parse(localStorage.getItem('defines')));


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



        // console.log(JSON.parse(localStorage.getItem('defines'))._id , data2.admin_id)


    }, [])
    return (

        <div className="activity-room">
            <nav className='activity-room-nav'>
                <Link to="/"><img src="src/assets/sportbud_logo_dark.png" alt="logo" className='dark-logo' /></Link>
                <span className='nav-links'>
                    <Link to="/welcome">Home</Link>
                    <Link to="/profile">Profile</Link>
                    <div className='logout' onClick={() => {
                        localStorage.clear()
                        window.location = '/Login'
                    }}>Logout</div>
                </span>
            </nav>
            <div>
                <div className='room-info'>
                    <div className='room-info-upper'>
                        <p style={{ fontSize: '17px' }}>{data1.title}</p>
                        <p><i className="bi bi-geo-alt-fill white-icon"></i>{data2.location}</p>
                        <p><i className="bi bi-clock-fill white-icon"></i> {(data2.startedActRoom + "").substr(0, 10) + " " + (data2.startedActRoom + "").substr(11, 5)}</p>
                    </div>
                    <div className='room-info-bottom'>
                        <p style={{ fontStyle: 'italic' }}><b>{data2.slogan}</b></p>
                        <p>ROOM ADMIN <span className='darker'>: {data2.admin}</span></p>
                        <p>THIS ROOM'S CAPACITY <span className='darker'>: {data2.capacity}</span></p>
                        <p>PARTICIPANTS</p>
                        {/* {data2.clients_infos && data2.clients_infos.map((x, y) => (
                            <p key={y}>{x.user_name}</p>
                        ))} */}

                        {data2.clients_infos && data2.clients_infos.map((x, y) => (

                            <div key={y}>
                                <Space wrap style={{ flexWrap: 'no-wrap', display: 'flex', marginBottom: '7px' }}>
                                    <p style={{ fontSize: '14px' }} key={y}>{x.user_name}</p>
                                    <Select
                                       // disabled={checkPoint("fair_play", JSON.parse(localStorage.getItem('defines'))._id, localStorage.getItem('activity_id'), x.user_id) ? true:false}
                                        defaultValue="0"
                                        style={{ width: 120 }}
                                        onChange={(score) => {

                                            handleChange("fair_play", x.user_id, localStorage.getItem('activity_id'), score)

                                        }}
                                        options={[
                                            { value: "0", label: "Fairplay" },
                                            { value: "1", label: "1" },
                                            { value: "2", label: "2" },
                                            { value: "3", label: "3" },
                                            { value: "4", label: "4" },
                                            { value: "5", label: "5" },
                                            { value: "6", label: "6" },
                                            { value: "7", label: "7" },
                                            { value: "8", label: "8" },
                                            { value: "9", label: "9" },
                                            { value: "10", label: "10" }
                                        ]}
                                    />
                                    <Select
                                        // disabled={checkPoint("performance", JSON.parse(localStorage.getItem('defines'))._id, localStorage.getItem('activity_id'), x.user_id)}
                                        defaultValue="0"
                                        style={{ width: 120 }}
                                        onChange={(score) => {

                                            handleChange("performance", x.user_id, localStorage.getItem('activity_id'), score)

                                        }}
                                        options={[
                                            { value: "0", label: "Performance" },
                                            { value: "1", label: "1" },
                                            { value: "2", label: "2" },
                                            { value: "3", label: "3" },
                                            { value: "4", label: "4" },
                                            { value: "5", label: "5" },
                                            { value: "6", label: "6" },
                                            { value: "7", label: "7" },
                                            { value: "8", label: "8" },
                                            { value: "9", label: "9" },
                                            { value: "10", label: "10" }
                                        ]}
                                    />
                                    <Select
                                        // disabled={checkPoint("loyalty", JSON.parse(localStorage.getItem('defines'))._id, localStorage.getItem('activity_id'), x.user_id)}
                                        defaultValue="0"
                                        style={{ width: 120 }}
                                        onChange={(score) => {

                                            handleChange("loyalty", x.user_id, localStorage.getItem('activity_id'), score)

                                        }}
                                        options={[
                                            { value: "0", label: "Loyalty" },
                                            { value: "1", label: "1" },
                                            { value: "2", label: "2" },
                                            { value: "3", label: "3" },
                                            { value: "4", label: "4" },
                                            { value: "5", label: "5" },
                                            { value: "6", label: "6" },
                                            { value: "7", label: "7" },
                                            { value: "8", label: "8" },
                                            { value: "9", label: "9" },
                                            { value: "10", label: "10"}
                                        ]}
                                    />
                                </Space>
                            </div>
                        ))}

                        {data2.clients_infos && (
                            <div>
                                {!(data2.clients_infos.find(i => i.user_id === JSON.parse(localStorage.getItem('defines'))._id)) && (
                                    <div>
                                        {/* console.log(Lenght : {data2.clients_infos.length})
                                        console.log(Capa : {data2.capacity}) */}
                                        <button className='mail-button' style={{
                                            display: (data2.clients_infos && (data2.clients_infos.length) < data2.capacity)

                                                && JSON.parse(localStorage.getItem('defines'))._id != data2.admin_id
                                                ? 'block' : 'none'
                                        }} onClick={() => {
                                            // console.log(request);


                                            let URL = "//164.90.184.39:9999/activities/" + localStorage.getItem('activity_id');

                                            axios
                                                .put(URL, {
                                                    operation: "update",
                                                    user_id: JSON.parse(localStorage.getItem("defines"))._id,
                                                    user_name: JSON.parse(localStorage.getItem("defines")).contents.firstname + " " + JSON.parse(localStorage.getItem("defines")).contents.lastname

                                                })
                                                .then(response => {
                                                    //console.log(response.data)
                                                    window.location.reload()

                                                });

                                        }}><i className="bi bi-plus-lg"></i>  JOIN ROOM</button>

                                    </div>
                                )}
                            </div>
                        )}



                        {data2.clients_infos && (
                            <div>
                                {(data2.clients_infos.find(i => i.user_id === JSON.parse(localStorage.getItem('defines'))._id)) && (
                                    <div>

                                        <button className='mail-button' style={{
                                            display: (data2.clients_infos && data2.clients_infos.length <= data2.capacity) ? 'block' : 'none'
                                        }} onClick={() => {
                                            // console.log(requset);


                                            let URL = "//164.90.184.39:9999/activities/" + localStorage.getItem('activity_id');

                                            axios
                                                .put(URL, {
                                                    operation: "delete",
                                                    user_id: JSON.parse(localStorage.getItem("defines"))._id

                                                })
                                                .then(response => {
                                                    //console.log(response.data)
                                                    window.location.reload()

                                                });

                                        }}><i className="bi bi-x-circle-fill"></i>  EXIT ROOM</button>

                                    </div>
                                )}
                            </div>
                        )}







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
                                        const Data = { ...prev };
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

                            {data3.map((x, y) => <div key={y} className={x.profile_id === JSON.parse(localStorage.getItem('defines'))._id ? "message my-message" : "message other-message"}>
                                <div>
                                    <div className="name">{x.nickname}</div>
                                    <div className="text">{x.text}</div>
                                </div>
                            </div>

                            )}
                            {/* <div className="update">
                            Abc is joined the conversation
                            </div> */}



                        </div>
                        <div className="typebox">
                            <Input type="text" className="message-input" onChange={e => {
                                let value = e.target.value
                                setMessage(prev => {
                                    const newMessage = { ...prev };
                                    newMessage.text = value;
                                    return newMessage;
                                })
                            }} />
                            <button className='send-message' onClick={() => {

                                let URL = "//164.90.184.39:9999/activitieschats"

                                axios
                                    .post(URL, message)
                                    .then(response => { window.location.reload() })
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