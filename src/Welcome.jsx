import { Link } from 'react-router-dom'
import React, { useEffect, useState, useContext } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import dayjs from 'dayjs';
import { Input, Select, TimePicker, InputNumber } from 'antd';
import axios from 'axios';

import { GoogleMap, Marker } from '@react-google-maps/api';
import Defines from './context/defines';
let defaultLocation;

export default function Welcome() {
    const [startDate, setStartDate] = useState(new Date());
    const [search, setSearch] = useState(0);

    const format = 'HH:mm';
    const [address, setAdress] = useState("")
    const [time, setTime] = useState("");

    let { defines, setDefines } = useContext(Defines);

    const [categories, setCategories] = useState([]);

    const [activities, setActivities] = useState([]);

    // const [user, setUser] = useState({});


    useEffect(() => {

        
        if(localStorage.getItem('defines') === null ||  JSON.parse(localStorage.getItem('defines'))['deleted'] != 0){
            window.location = "/login";
        }

        let URL1 = "//164.90.184.39:9999/categories";
        axios
            .get(URL1)
            .then(response => setCategories(response.data))
            .catch(function (error) {
                console.log(error);
            })

        let URL2 = "//164.90.184.39:9999/activities";

        axios
            .get(URL2)
            .then(response => {

                let list = search ? response.data.filter(
                    item => (item.contents.startedActRoom.substr(0, 10) === startDate.toISOString().split("T")[0] )
                    && item.contents.location.includes(address))
                    : response.data 
                    setActivities(list)

                // let list = search ? response.data.filter(item => item.contents.startedActRoom.substr(0, 10) === startDate.toISOString().split("T")[0] ) : response.data
                //  console.log(list)
                 

                // let list2 = search ?  item.contents.location.includes(address) : response.data
                //  console.log(list)
                // setActivities(list2)
            })
            .catch(function (error) {
                console.log(error);
            })

        navigator.geolocation.getCurrentPosition(function (position) {
            defaultLocation = { lat: position.coords.latitude, lng: position.coords.longitude }
        });

        // setUser(JSON.parse(localStorage.getItem('defines')))
    }, [startDate, address, time])


    function convertLatLng(x) {
        return parseFloat(x);
    }
    function renderSwitch(x) {
        switch (x) {
            case '638e675d4321c700312ff674':
                return 'src/assets/cardio-pin.png';
            case '638e69544321c700312ff679':
                return 'src/assets/running-pin.png';
            case '638e69cd4321c700312ff67b':
                return 'src/assets/pilates-pin.png';
            case '639f73052b33750031d145f9':
                return 'src/assets/yoga-pin.png';
            default:
                return 'src/assets/cardio-pin.png';
        }
    }
    function renderBranchPic(x) {
        switch (x) {
            case '638e675d4321c700312ff674':
                return 'src/assets/cardio.png';
            case '638e69544321c700312ff679':
                return 'src/assets/running.png';
            case '638e69cd4321c700312ff67b':
                return 'src/assets/pilates.png';
            case '639f73052b33750031d145f9':
                return 'src/assets/yoga.png';
            default:
                return 'src/assets/cardio.png';
        }
    }

    return (
        <div className='welcome'>
            <nav className='welcome-nav'>
                <Link to="/"><img src="src/assets/logo.png" alt="logo" className='logo' /></Link>
                <span className='nav-links'>
                    <Link to="/welcome">Home</Link>
                    <Link to="/profile">Profile</Link>
                    <div className='logout' onClick={() => {
                        localStorage.clear()
                        window.location = '/Login'
                    }}>Logout</div>

                </span>
            </nav>

            {/* <div className='search-bar'>
                <input type="text" placeholder="Find your branch or room" /> <span className='search-icon-box'><i className="bi bi-search" /></span>
            </div> */}

            <div className='carousel'>
                <h6>Categories</h6>
                <div className='cat-box'>

                    <span className='cat-box-img'>
                        {
                            categories.map((x, y) => <span key={y}>
                                <Link to="/branch"><img src={renderBranchPic(x._id)} onClick={() => {
                                    localStorage.setItem('category_id', x._id)
                                    window.location = "/branch";
                                }} /></Link>
                            </span>
                            )
                        }
                    </span>
                    <span className='cat-box-text'>
                        {
                            categories.map((x, y) => <span key={y}>
                                <span><span style={{ cursor: 'pointer' }} onClick={() => {
                                    console.log(x._id);
                                    setDefines(prev => {
                                        const newDefines = { ...prev };
                                        newDefines.category_id = x._id;
                                        return newDefines;
                                    })
                                    window.location = "/branch";
                                }} >{x.title}</span></span>
                            </span>
                            )
                        }
                    </span>
                </div>

                <div className='filters-yellow'>
                    <DatePicker selected={startDate} onChange={(date) => {
                        // console.log(date.toISOString().split("T")[0]);
                        // console.log(activities[0].contents.startedActRoom.substr(0, 10));
                        // console.log(activities.filter(item => item.contents.startedActRoom.substr(0, 10) === date.toISOString().substr(0, 10)))
                        setStartDate(date)
                        setSearch(1)

                    }} className="date-picker-yellow" />
                    {/* <TimePicker placeholder='Time' format={format} onChange={(time)
 => {
                        setTime(time)
;
                    }} className="time-picker-yellow" /> */}
                    <Input
                        value={address}
                        onChange={(e) => {
                            const value = e.target.value;
                            // console.log(value);
                            setAdress(value)
                            setSearch(1)
                        }}
                        className="location-search-input-yellow"
                        placeholder='Place'
                        style={{ width: 130 }}
                    />
                </div>

                <h6>Popular Event Rooms</h6>

                <div className='welcome-event-box'>
                    {
                        activities.map((x, y) =>
                            <div key={y}
                                // Geçici kapatıldı:
                                style={{ display: x.contents.startedActRoom.substr(0, 10) === startDate.toISOString().split("T")[0] && x.contents.location.includes(address) ? "block" : "none" }}
                            >
                                <span className='branch-box-img' onClick={() => {
                                    localStorage.setItem('activity_id', x._id);
                                    window.location = "/room";
                                }}>
                                    <img src="src/assets/cardio-1.png" alt="" style={{ display: x.contents.category_id === '638e675d4321c700312ff674' ? 'block' : 'none' }} />
                                    <img src="src/assets/people-running.png" alt="" style={{ display: x.contents.category_id === '638e69544321c700312ff679' ? 'block' : 'none' }} />
                                    <img src="src/assets/yoga-room-pic.png" alt="" style={{ display: x.contents.category_id === '638e69cd4321c700312ff67b' ? 'block' : 'none' }} />
                                    <img src="src/assets/people-yoga.png" alt="" style={{ display: x.contents.category_id === '639f73052b33750031d145f9' ? 'block' : 'none' }} />
                                    <p>{x.title}</p>
                                    <p>{x.contents.location}</p>
                                    <p>{x.contents.startedActRoom.substr(0, 10)}</p>
                                </span>
                            </div>
                        )
                    }

                </div>
            </div>

            <div className='Map'>
                <GoogleMap
                    className="google-map-welcome"
                    center={defaultLocation}
                    zoom={15.2}
                    mapContainerStyle={{ height: '520px', width: '770px' }}
                >
                    {
                        activities.map((x, y) => <span key={y}>
                            <Marker
                                position={{ lat: convertLatLng(x.contents.latitude), lng: convertLatLng(x.contents.longitude) }}
                                icon={{
                                    url: renderSwitch(x.contents.category_id),
                                    scaledSize: new google.maps.Size(50, 50)
                                }}
                                title={x.title}
                                onClick={() => {
                                    localStorage.setItem('activity_id', x._id);
                                    window.location = "/room";
                                }}
                            />
                        </span>
                        )
                    }

                </GoogleMap>

            </div>
        </div>
    )
}