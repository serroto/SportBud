import { Link, useLocation } from 'react-router-dom'
import React, { useState } from "react";
import { useRef, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { TimePicker } from 'antd';
import dayjs from 'dayjs';

export default function NewEvent(){
    const [selectedImage, setSelectedImage] = useState(null);
    const oldRoomPic = useRef();
    const [startDate, setStartDate] = useState(new Date());
    const format = 'HH:mm';

    return(
        <div className="create-new-event">
            <nav className='new-event-nav'>
          <Link to="/"><img src="src/assets/logo.png" alt="logo" className='logo'/></Link>
          </nav>

          <div >
                <h6 className='new-event-h'>Create New Event</h6>
                <div className='new-event-box'>

            <div className='filters-gray'>
                
            <div className="maps-gray">
            <i className="bi bi-geo-alt pin-icon"></i>
            {/* <span>Choose Location</span> */}
            <div id='map-itself'></div>
            
            </div>
            <div className='date-filter-gray'>
            <i className="bi bi-calendar-check calendar-icon"></i>
            <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="date-picker"/>
            <TimePicker defaultValue={dayjs('13:30', format)} format={format} className="time-picker"/>
            </div>

            <div className='room-capacity'>
            <i className="bi bi-people people-icon"></i>
            <span>Room's Capacity</span> <input type="number" id="capacity-ctr" min="3" max="12" placeholder='3'></input>
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
            <span>Room's Title</span> <input placeholder='Enter Title'></input>
            </div>

            <div className='room-slogan'>
            <span>Room's Slogan</span> <input placeholder='Enter slogan'></input>
            </div>

            <button className='create-room-btn'>Create Room</button>
            
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
                <p>Yaşam Parkı</p>
                <p><i className="bi bi-geo-alt pin-icon white-icon"></i> 4 KM</p>
                <p><i className="bi bi-clock clock-icon white-icon"></i> December 8, 8 PM</p>
                </div>
            </div>
            </div>
        </div>
    );
}