import { Link } from 'react-router-dom'
import React, { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Input } from 'antd';
import axios from 'axios';
import moment from "moment";
import "moment-timezone";
import { GoogleMap, Marker } from '@react-google-maps/api';
const defaultLocation = { lat: 38.46498609609608, lng: 27.205795416060997 };
import Defines from './context/defines';
moment.locale("tr"); // Türkiye saatine göre ayarlandı.
export default function Branch() {

    const [search, setSearch] = useState(0);
    const [time, setTime] = useState("");
    const [startDate, setStartDate] = useState(new Date());
    const format = 'HH:mm';
    const [address, setAdress] = useState();


    const [activities, setActivities] = useState([]);
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState({});
    const [user, setUser] = useState({});

    // const [category_id, setCategory_ID] = useState(0);
    useEffect(() => {
        console.log(moment(startDate).tz("Turkey").format('YYYY-MM-DD'));

        if(localStorage.getItem('defines') === null ||  JSON.parse(localStorage.getItem('defines'))['deleted'] != 0){
            window.location = "/login";
        }

        // console.log(localStorage.getItem('category_id'));
        let URL1 = "//164.90.184.39:9999/categories";
        axios
            .get(URL1)
            .then(response => {
                let list = response.data.filter(item => item._id === localStorage.getItem('category_id'))
                setCategories(list)
            })
            .catch(function (error) {
                console.log(error);
            })

        let URL2 = "//164.90.184.39:9999/activities";

        axios
            .get(URL2)
            .then(response => {
                let list = search ?  response.data.filter(
                    item => address === "" ? 
                        item.contents.startedActRoom.substr(0, 10) === moment(startDate).tz("Turkey").format('YYYY-MM-DD') 
            
                        :  item.contents.location.toLowerCase().includes(address.toLowerCase())
                    
                    )
                    : response.data.filter(item => item.contents.category_id === localStorage.getItem('category_id'))
                // console.log(list)
                setActivities(list)
            })
            .catch(function (error) {
                console.log(error);
            })



        let URL3 = "//164.90.184.39:9999/categories?id=" + localStorage.getItem('category_id')
        axios
            .get(URL3)
            .then(response => {

                setCategory(response.data.contents)

            })
            .catch(errors => console.log(errors))


      

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

    return (
        <div className='branch'>
            <nav className='branch-nav'>
                <Link to="/"><img src="src/assets/sportbud_logo_dark.png" alt="logo" className='dark-logo' /></Link>
                <span className='nav-links light'>
                    <Link to="/welcome">Home</Link>
                    <Link to="/profile">Profile</Link>
                    <div className='logout' onClick={()=>{
                        localStorage.clear()
                        window.location = '/Login'
                    }}>Logout</div>
                </span>
            </nav>

            <div className='carousel branch-carousel'>

            <div className='search-bar'>
                {
                    categories.map((x, y) =>
                        <div key={y} style={{ display: x._id === localStorage.getItem('category_id') ? "block" : "none" }}>
                            <input type="text" placeholder={x.title} disabled /> <span className='search-icon-box'><i className="bi bi-search" /></span>
                        </div>
                    )
                }
            </div>

            <div className='branch-description'><span>Branch Info:</span>
                {
                    categories.map((x, y) =>
                        <div key={y} style={{ display: x._id === localStorage.getItem('category_id') ? "block" : "none" }}>
                            <span alt="branch-desc">{x.contents.short_description}</span>
                        </div>
                    )
                }
            </div>
            <div className='filters-yellow'>
                    <DatePicker selected={startDate} onChange={(date) => {
                        // console.log(date.toISOString().split("T")[0]);
                        // console.log(activities[0].contents.startedActRoom.substr(0, 10));
                        // console.log(activities.filter(item => item.contents.startedActRoom.substr(0, 10) === date.toISOString().substr(0, 10)))
                        setStartDate(date)
                        setSearch(1)

                    }} className="date-picker-yellow" />
                    {/* <TimePicker placeholder='Time' format={format} onChange={(time) => {
                        setTime(time);
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
            <br />
            <br />
            <br />
            <h6 style={{color:"#000000"}}>Popular Event Rooms</h6>
                
   
                <div className='welcome-event-box'>
                    {
                        activities.map((x, y) =>
                            <div key={y}
                            // Geçici kapatıldı:
                            // style={{display:x.contents.startedActRoom.substr(0, 10) === startDate.toISOString().substr(0, 10) ? "block" : "none"}}
                            >
                                <span className='branch-box-img' onClick={()=>{
                                    localStorage.setItem('activity_id', x._id)
                                    window.location = "/room";
                                }}>
                                    <img src="src/assets/cardio-1.png" alt="" style={{ display: x.contents.category_id === '638e675d4321c700312ff674' ? 'block' : 'none' }} />
                                    <img src="src/assets/people-running.png" alt="" style={{ display: x.contents.category_id === '638e69544321c700312ff679' ? 'block' : 'none' }} />
                                    <img src="src/assets/yoga-room-pic.png" alt="" style={{ display: x.contents.category_id === '638e69cd4321c700312ff67b' ? 'block' : 'none' }} />
                                    <img src="src/assets/people-yoga.png" alt="" style={{ display: x.contents.category_id === '639f73052b33750031d145f9' ? 'block' : 'none' }} />
                                    <p alt="activity-name">{x.title}</p>
                                    <p>{x.contents.location}</p>
                                    <p>{x.contents.startedActRoom.substr(0, 10)}</p>
                                </span>
                            </div>
                        )
                    }

                </div>

            <div className='branch-rooms carousel' style={{marginLeft:"0px",marginTop:"50px", paddingBottom:"50px"}}>

                <Link to="/newevent" style={{marginLeft:"0px"}}>
                    <div className='cat-box'>
                        <span><img src="src/assets/plus-sign.png" alt="" className='plus-sign' /></span>
                        <span className='plus-text'>Create New Event</span>
                    </div>
                </Link>
            </div>
            </div>

            <div className='Map branch-map'>
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
                            />
                        </span>
                        )
                    }

                </GoogleMap>

            </div>
        </div>
    )
}