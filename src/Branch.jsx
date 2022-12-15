import { Link } from 'react-router-dom'
import React, { useState } from "react";
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

export default function Branch(){
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
    return (
        <div className='branch'>
            <nav className='branch-nav'>
          <Link to="/"><img src="src/assets/sportbud_logo_dark.png" alt="logo" className='dark-logo'/></Link>

          <div className='filters-yellow'>
          <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} className="date-picker-yellow"/>
          <TimePicker placeholder='Time' format={format} className="time-picker-yellow"/>
          <PlacesAutocomplete
        value={address}
        onChange={setAdress}
        onSelect={handleSelect}
        className="location-picker-yellow"
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div key={suggestions.description}>
            <input
              {...getInputProps({
                placeholder: 'Place',
                className: 'location-search-input-yellow',
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
            </nav>

            <div className='search-bar'>
            <input type="text" placeholder="Cardio"/> <span className='search-icon-box'><i className="bi bi-search"/></span>
            </div>

            <div className='branch-description'><span>Branch Info:</span> Cardio is defined as any type of exercise that gets your heart rate up and keeps it up for a prolonged period of time.</div>

            <div className='branch-rooms carousel'>
                <div className='branch-box'>
                    <span className='branch-box-img'>
                    <img src="src/assets/cardio-1.png" alt="" />
                    </span>
                    <span>
                        <img src="src/assets/cardio-1-text.png" alt="" className='cardio-text'/>
                    </span>
                    {/* <div className='box-text'>
                    <span>Aşık Veysel Park</span>
                    <p><i className="bi bi-geo-alt km-icon"></i>1km </p>
                    </div> */}
                </div>
                <div className='branch-box'>
                    <span className='branch-box-img'>
                    <img src="src/assets/cardio-2.png" alt="" />
                    </span>
                    <span>
                        <img src="src/assets/cardio-2-text.png" alt="" className='cardio-text'/>
                    </span>
                    {/* <span className='box-text'>
                    <span>Fethi Sekin Park <br />2km</span>
                    <p><i className="bi bi-geo-alt km-icon"></i>2km </p>
                    </span> */}
                </div>
                <Link to="/newevent">
                <div className='box'>
                    {/* <span className='plus-icon'><i class="bi bi-plus-lg"/></span> */}
                    <span><img src="src/assets/plus-sign.png" alt="" className='plus-sign'/></span>
                    <span className='plus-text'>Create New Event</span>
                </div>
                </Link>
            </div>

            <div className='Map'>
                <img src="src/assets/branch-map.png" alt="map" className='branch-map'/>
            </div>
        </div>
    )
}