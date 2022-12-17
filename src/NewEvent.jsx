import { Link, useLocation } from 'react-router-dom'
import React, { useState } from "react";
import { useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    geocodeByPlaceId,
    getLatLng,
  } from 'react-places-autocomplete';

import reactElementToJSXString from 'react-element-to-jsx-string';
import { useNavigate } from 'react-router-dom';

export default function NewEvent(){
    const [selectedImage, setSelectedImage] = useState(null);
    const oldRoomPic = useRef();
    const [startDate, setStartDate] = useState(new Date());
    const format = 'HH:mm';

    const[address,setAdress] = useState();
    const [coordinates, setCoordinates] = useState({
        lat:null,
        lng:null
    })
    const handleSelect = async value=>{
        const results = await geocodeByAddress(value);
        const ll = await getLatLng(results[0])
        // you can pass ll
        setAdress(value)
        setCoordinates(ll)
    }

    const [eventDate, setEventDate] = useState();

    const setEventDateF = async value=>{
        setEventDate(value);
    }

    const [title, setTitle] = useState('');
    const [capacity, setCapacity] = useState('');
    const [slogan, setSlogan] = useState('');


    const navigate = useNavigate();
    const toNewRoom=()=>{
      navigate('/newroom',{state:{name:title, place:address, time: JSON.stringify(eventDate), capacity: capacity, slogan:slogan}});
        }

    return(
        <div className="create-new-event">
          <nav className='new-event-nav'>
          <Link to="/"><img src="src/assets/logo.png" alt="logo" className='logo'/></Link>

          <span className='nav-links light'>
            <Link to="/welcome">Home</Link>
            <Link to="/profile">Profile</Link>
          </span>
          </nav>

          <div >
                <h6 className='new-event-h'>Create New Event</h6>
                <div className='new-event-box'>

            <div className='filters-gray'>
                
            <div className="maps-gray">
            <i className="bi bi-geo-alt pin-icon"></i>
            <PlacesAutocomplete
        value={address}
        onChange={setAdress}
        onSelect={handleSelect}
        className="location-picker"
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div key={suggestions.description}>
            <input
              {...getInputProps({
                placeholder: 'Place',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading..</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </PlacesAutocomplete>
            </div>
            <div className='date-filter-gray'>
            <i className="bi bi-calendar-check calendar-icon"></i>
            <DatePicker selected={startDate} value={eventDate} onChange={(date) => {setStartDate(date);setEventDate();}} onSelect={setEventDateF} className="date-picker"/>
            <TimePicker defaultValue={dayjs('13:30', format)} format={format} className="time-picker"/>
            </div>

            <div className='room-capacity'>
            <i className="bi bi-people people-icon"></i>
            <span>Room's Capacity</span> <input type="number" id="capacity-ctr" min="3" max="12" placeholder='3' onChange={event => setCapacity(event.target.value)}></input>
            </div>

            <div className='branch-selection'>
            <img src="src/assets/phone-running.png" alt="" className='phone-running'/>
            <span>Room's Branch</span> 
            <div className='branch-scroll'>
                <span>Running</span>
                <span>Pilates</span>
                <span>Cardio</span>
                <span>Yoga</span>
                </div>
            </div>

            <div className='room-name'>
            <span>Room's Title</span> <input placeholder='Enter Title' onChange={event => setTitle(event.target.value)}></input>
            </div>

            <div className='room-slogan'>
            <span>Room's Slogan</span> <input placeholder='Enter slogan' onChange={event => setSlogan(event.target.value)}></input>
            </div>

            <button className='create-room-btn' onClick={()=>{toNewRoom()}}>Create Room</button>
            
            </div>
            </div>
            
            <div className='new-event-result-box'>

            {selectedImage && (
            <div>
            <img alt="not fount" width={"160px"} height={"120px"} src={URL.createObjectURL(selectedImage)} />
            <br />
            <button onClick={()=>setSelectedImage(null)} className="remove-btn">Remove</button>
            </div>
             )}
             <input
             style={{display:'none'}}
             type="file"
             name="myImage"
             onChange={(event) => {
             console.log(event.target.files[0]);
             setSelectedImage(event.target.files[0]);
            }}
            ref={oldRoomPic}
            />
                <img src="src/assets/yoga-room-pic.png" alt="" className='yoga-room-pic' onClick={(event)=> {const oldPic = oldRoomPic.current; oldPic.click(); event.currentTarget.classList.add("hide")} }/>
                <div>
                <p>{title}</p>
                <p><i className="bi bi-geo-alt pin-icon white-icon"></i>{address}</p>
                <p><i className="bi bi-clock clock-icon white-icon"></i>{JSON.stringify(eventDate)}</p>
                </div>
            </div>
            </div>
        </div>
    );
}