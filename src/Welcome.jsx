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
  
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
const defaultLocation = { lat: 38.463489, lng: 27.207897 };  

export default function Welcome(){
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
        <div className='welcome'>
        <nav className='welcome-nav'>
          <Link to="/"><img src="src/assets/logo.png" alt="logo" className='logo'/></Link>
          <span className='nav-links'>
            <Link to="/welcome">Home</Link>
            <Link to="/profile">Profile</Link>
          </span>
        </nav>

            <div className='search-bar'>
            <input type="text" placeholder="Find your branch or room"/> <span className='search-icon-box'><i className="bi bi-search"/></span>
            </div>

            <div className='carousel'>
                <h6>Categories</h6>
                <div className='box'>
                    <span className='cat-box-img'>
                        <img src="src/assets/running.png"/>
                        <img src="src/assets/pilates.png"/>
                        <Link to="/branch"><img src="src/assets/cardio.png"/></Link>
                        <img src="src/assets/yoga.png"/>
                    </span>
                    <span className='cat-box-text'>
                        <span>Running</span>
                        <span>Pilates</span>
                        <Link to="/branch"><span>Cardio</span></Link>
                        <span className='extra-margin'>Yoga</span>
                    </span>
                </div>

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

                <h6>Event Rooms Near You</h6>
                <div className='near-event-box'>
                    <div className='event-box-text'>
                        <span>Büyük Park</span>
                        <span>Fethi Sekin Park</span>
                    </div>
                    <div className='event-box-branch-text'>
                        <span>Yoga</span> <span>Running</span>
                    </div>
                    <div className='event-box-img'>
                    <Link to="/room"><img src="src/assets/people-yoga.png"/></Link>
                    <img src="src/assets/people-running.png"/>
                    </div>
                    <div className='km'>
                        <span><i className="bi bi-geo-alt km-icon"></i>1KM </span>
                        <span><i className="bi bi-geo-alt km-icon"></i>4KM</span>
                    </div>
                </div>
            </div>

            <div className='Map'>
                {/* <img src="src/assets/welcome-map-google.png" alt="map" className='welcome-map'/> */}
          <GoogleMap
          className="google-map-welcome"
            center={defaultLocation}
            zoom={15}
            mapContainerStyle={{ height: '520px', width: '770px'}}
          >
            <Marker
              position={{ lat: 38.46698426184403, lng: 27.20696036128919 }}
              icon = {{
                // url: "src/assets/yoga-pin.png"
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              }}
              // className="Marker"
            />
            <Marker
              position={{ lat: 38.466740652105116, lng: 27.20658485206456 }}
              icon = {{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              }}
            />
             <Marker
              position={{ lat: 38.46367189173037, lng: 27.206902745666373 }}
              icon = {{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              }}
            />
            <Marker
              position={ {lat: 38.46257088336663, lng: 27.21602825636435} }
              icon = {{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              }}
            />
            <Marker
              position={ {lat: 38.461688130657755, lng: 27.217124314594948} }
              icon = {{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              }}
            /> 
            <Marker
              position={ {lat: 38.462318648498844, lng: 27.203603032410086} }
              icon = {{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              }}
            />
            <Marker  
              position={ {lat: 38.468919051514554, lng: 27.196540427843992} }
              icon = {{
                url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              }}
            />
            
          </GoogleMap>

            </div>
        </div>
    )
}