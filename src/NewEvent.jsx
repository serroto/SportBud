import { Link } from 'react-router-dom'
import React, { useState } from "react";
import { useRef, useEffect } from 'react';

export default function NewEvent(){
    const [selectedImage, setSelectedImage] = useState(null);
    const oldRoomPic = useRef();
    return(
        <div className="create-new-event">
            <nav className='new-event-nav'>
          <Link to="/"><img src="src/assets/logo.png" alt="logo" className='logo'/></Link>
          </nav>

          <div >
                <h6 className='new-event-h'>Create New Event</h6>
                <div className='new-event-box'>

            <div className='filters-gray'>
                
            <div className="dropdown dropdown-gray">
            <i className="bi bi-clock clock-icon"></i>
            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Place</button>
            <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Dropdown item</a></li>
            </ul>
            </div>
            <div className="dropdown dropdown-gray side-by-side">
            <i className="bi bi-geo-alt pin-icon"></i>
            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Date</button>
            <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Dropdown item</a></li>
            </ul>
            </div>
            <div className="dropdown dropdown-gray side-by-side">
            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Time</button>
            <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Dropdown item</a></li>
            </ul>
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
            <button onClick={()=>setSelectedImage(null)}>Remove</button>
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
                <img src="src/assets/yoga-room-pic.png" alt="" onClick={()=> {const oldPic = oldRoomPic.current; oldPic.click(); current.classList.add("hide")} }/>
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