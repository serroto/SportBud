import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { Input, Select, DatePicker, Space, InputNumber, ConfigProvider } from 'antd';

// The default locale is en-US, if you want to use other locale, just set locale in entry file globally.
import dayjs from 'dayjs';
import 'dayjs/locale/tr';
import locale from 'antd/locale/tr_TR';

import axios from 'axios';
import moment from "moment";
import "moment-timezone";


import PlacesAutocomplete, {
    geocodeByAddress,
    getLatLng,
} from 'react-places-autocomplete';

moment.locale("tr"); // Türkiye saatine göre ayarlandı.

export default function NewEvent(props) {

    const [startDate, setStartDate] = useState(new Date());



    const [address, setAdress] = useState("");

    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    });

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const ll = await getLatLng(results[0]);
        setAdress(value);
        data.contents.location = address;
        setCoordinates(ll);
        console.log(ll);
        data.contents.latitude = ll.lat;
        data.contents.longitude = ll.lng;
    }


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
                admin: JSON.parse(localStorage.getItem('defines')).contents.nickname,
                location: address,
                latitude: coordinates.lat,
                longitude: coordinates.lng,
                min_client: 3,
                max_client: 12,
                capacity: 3,
                duration: 40,
                slogan: "",
                short_description: "",
                description: "",
                clients_infos: [],
                startedActRoom: "",
                finishedActRoom: ""
            }
        }
    );

    const [categories, setCategories] = useState([]);

    useEffect(() => {

        let URL = "//164.90.184.39:9999/categories";
        // console.log(URL); 
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

        //console.log(moment().tz("Turkey").format("YYYY-MM-DD HH:mm"))



        // 2023-03-26T11:09:25.000Z



    }, [])



    const activityDateTime = (value) => {

        const dateObject = new Date(value); // tarih/saat değerini Date nesnesine çevirir
        const tzOffset = 180;
        const utcDate = new Date(dateObject.getTime() + (tzOffset * 60 * 1000)); // yerel saat dilimini UTC saat dilimine çevirir
        const isoString = utcDate.toISOString(); // UTC formatında tarih/saat değerini elde eder

        console.log('onOk: ', isoString);

        setData(prev => {
            const newData = { ...prev };
            newData.contents.startedActRoom = isoString;
            return newData;
        })
    };

    return (
        <div className="create-new-event">
            <nav className='new-event-nav'>
                <Link to="/"><img src="src/assets/logo.png" alt="logo" className='logo' /></Link>

                <span className='nav-links light'>
                    <Link to="/welcome">Home</Link>
                    <Link to="/profile">Profile</Link>
                    <div className='logout' onClick={() => {
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
                            <PlacesAutocomplete
                                value={address}
                                onChange={setAdress}
                                onSelect={handleSelect}
                            >
                                {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                    <div>
                                        <input
                                            {...getInputProps({
                                                placeholder: 'Places',
                                                className: 'location-search-input',
                                            })}
                                        />
                                        <div className="autocomplete-dropdown-container">
                                            {loading && <div>Loading...</div>}
                                            {suggestions.map((suggestion, y) => {
                                                const className = suggestion.active
                                                    ? 'suggestion-item--active'
                                                    : 'suggestion-item';
                                                const style = suggestion.active
                                                    ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                                                    : { backgroundColor: '#ffffff', cursor: 'pointer' };
                                                return (
                                                    <div key={y}
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
                            <Space direction="vertical" size={12}>
                                <ConfigProvider locale={locale}>
                                    <DatePicker
                                        showTime={{
                                            format: 'HH:mm',
                                        }}
                                        format="YYYY-MM-DD HH:mm"
                                        onOk={activityDateTime}
                                        onChange={activityDateTime}
                                    />
                                </ConfigProvider>
                            </Space>

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
                            }} />
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
                                    // console.log(response.data.contents.category_id);
                                    localStorage.setItem('activity_id', response.data._id)
                                    setTimeout(() => { window.location = "/room"; }, 3000);
                                })
                                .catch(error => {
                                    console.log(error);
                                })

                        }}>Create Room</button>

                    </div>
                </div>

                <div className='new-event-result-box'>

                    <img src="src/assets/cardio-1.png" alt="" style={{ display: data.contents.category_id === '638e675d4321c700312ff674' ? 'block' : 'none' }} />
                    <img src="src/assets/people-running.png" alt="" style={{ display: data.contents.category_id === '638e69544321c700312ff679' ? 'block' : 'none' }} />
                    <img src="src/assets/yoga-room-pic.png" alt="" style={{ display: data.contents.category_id === '638e69cd4321c700312ff67b' ? 'block' : 'none' }} />
                    <img src="src/assets/people-yoga.png" alt="" style={{ display: data.contents.category_id === '639f73052b33750031d145f9' ? 'block' : 'none' }} />
                    <div>
                        <p>{data.title}</p>
                        <p><i className="bi bi-geo-alt pin-icon white-icon"></i>{data.contents.location}</p>
                        <p><i className="bi bi-clock clock-icon white-icon"></i>{data.contents.startedActRoom.substr(0, 10)}</p>
                        <p>{data.contents.startedActRoom.substr(11,5)}</p>

                    </div>
                </div>
            </div>
        </div>
    );
}