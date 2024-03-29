import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import dayjs from 'dayjs';

import axios from 'axios';
import { Input, Select, TimePicker, InputNumber} from 'antd';

export default function NewEvent() {

    const [data, setData] = useState(
        {
            parent_id: "",
            status: true,
            sort: 1,
            lang: "en",
            title: "Activity Name",
            contents: {
                category_id: "638e675d4321c700312ff674",
                admin_id: "63979d62e86bed0031cecaf3",
                admin: "irem",
                location: "",
                latitude: "38.462742",
                longitude: "27.166210",
                min_client: 3,
                max_client: 12,
                capacity: 3,
                duration: 40,
                slogan: "",
                short_description: "",
                description: "",
                clients_infos: [],
                startedActRoom: moment().format(),
                finishedActRoom: "2022-12-21"
            }
        }
    );
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        let URL = "//164.90.184.39:9999/categories";
        console.log(URL);
        axios
            .get(URL)
            .then(response => {
                let list = [];
                response.data.forEach(element => {
                    list.push({
                        value: element._id,
                        label: element.title
                    })
                });
                setCategories(list)
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [])

    const oldRoomPic = useRef();
    const [startDate, setStartDate] = useState(new Date());
    const format = 'HH:mm';

    return (
        <div className="create-new-event">
            <nav className='new-event-nav'>
                <Link to="/"><img src="src/assets/logo.png" alt="logo" className='logo' /></Link>

                <span className='nav-links light'>
                    <Link to="/welcome">Home</Link>
                    <Link to="/profile">Profile</Link>
                    <div className='logout' onClick={()=>{
                        localStorage.clear()
                        window.location = '/Login'
                    }}>Logout</div>
                </span>
            </nav>

            <div >
                <h6 className='new-event-h'>Create New Event</h6>
                <div className='new-event-box'>

                    <div className='filters-gray'>

                        <div className="maps-gray">
                            <i className="bi bi-geo-alt pin-icon"></i>
                            <Input placeholder="Place" className='location-picker' onChange={(e) => {
                                const value = e.target.value;
                                console.log(value);
                                setData(prev => {
                                    const newData = { ...prev };
                                    newData.contents.location = value;
                                    return newData;
                                })
                            }} style={{ width: 180, marginLeft: 23 }} />
                        </div>
                        <div className='date-filter-gray'>
                            <i className="bi bi-calendar-check calendar-icon"></i>
                            <DatePicker selected={startDate} onChange={(date) => { 
                                const value = moment(date).toISOString();
                                    console.log(value);
                                    setData(prev => {
                                        const newData = { ...prev };
                                        newData.contents.startedActRoom = value;
                                        return newData;
                                    })
                                }} className="date-picker" />
                            <TimePicker defaultValue={dayjs('13:30', format)} format={format} onChange={(time) => { 
                                const value = moment(time).toISOString();
                                    console.log(value);
                                    setData(prev => {
                                        const newData = { ...prev };
                                        newData.contents.startedActRoom = data.contents.startedActRoom.substr(0,10) + value.substr(10,14);
                                        return newData;
                                    })
                                }} className="time-picker" />
                        </div>

                        <div className='room-capacity'>
                            <i className="bi bi-people people-icon"></i>
                            <span>Room's Capacity</span>
                            <InputNumber min={3} max={12} defaultValue={3} onChange={(e) => {
                                    const value = e;
                                    console.log(value);
                                    setData(prev => {
                                        const newData = { ...prev };
                                        newData.contents.capacity = value;
                                        return newData;
                                    })
                                }}/>
                        </div>

                        <div className='branch-selection'>
                            <img src="src/assets/phone-running.png" alt="" className='phone-running' />
                            <span>Room's Branch</span>
                            <Select
                                labelInValue
                                defaultValue={{
                                    value: '638e675d4321c700312ff674',
                                    label: 'Cardio',
                                }}
                                style={{
                                    width: 120,
                                }}
                                onChange={(e) => {
                                    const value = e.value;
                                    console.log(value);
                                    setData(prev => {
                                        const newData = { ...prev };
                                        newData.contents.category_id = value;
                                        return newData;
                                    })
                                }}
                                options={categories}
                            />
                        </div>

                        <div className='room-name'>
                            <span>Room's Title</span>
                            <Input placeholder="Enter title" onChange={(e) => {
                                const value = e.target.value;
                                console.log(value);
                                setData(prev => {
                                    const newData = { ...prev };
                                    newData.title = value;
                                    return newData;
                                })
                            }} />
                        </div>

                        <div className='room-slogan'>
                            <span>Room's Slogan</span>
                            <Input placeholder="Enter slogan" onChange={(e) => {
                                const value = e.target.value;
                                console.log("slogan", value);
                                setData(prev => {
                                    const newData = { ...prev };
                                    newData.contents.slogan = value;
                                    return newData;
                                })
                            }} />
                        </div>

                        <button className='create-room-btn' onClick={() => { 
                            axios.post("//164.90.184.39:9999/activities", data)
                            .then(response => {
                                localStorage.setItem('activity_id',response.data._id)
                                setTimeout(()=>{window.location = "/room";}, 3000);
                            })
                            .catch(error => {
                                console.log(error);
                            })
                            
                        }}>Create Room</button>

                    </div>
                </div>

                <div className='new-event-result-box'>

                    <img src="src/assets/cardio-1.png" alt="" style={{display: data.contents.category_id === '638e675d4321c700312ff674' ? 'block' : 'none'}} />
                    <img src="src/assets/people-running.png" alt="" style={{display: data.contents.category_id === '638e69544321c700312ff679' ? 'block' : 'none'}} />
                    <img src="src/assets/yoga-room-pic.png" alt="" style={{display: data.contents.category_id === '638e69cd4321c700312ff67b' ? 'block' : 'none'}} />
                    <img src="src/assets/people-yoga.png" alt="" style={{display: data.contents.category_id === '639f73052b33750031d145f9' ? 'block' : 'none'}} />
                    <div>
                        <p>{data.title}</p>
                        <p><i className="bi bi-geo-alt pin-icon white-icon"></i>{data.contents.location}</p>
                        <p><i className="bi bi-clock clock-icon white-icon"></i>{data.contents.startedActRoom.substr(0,10)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}