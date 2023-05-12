import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'antd';

import axios from 'axios';

export default function Profile() {
    
    const [successful, setSuccessful] = useState({});
    const [profiles1, setProfiles1] = useState({});
    const [profiles2, setProfiles2] = useState({});

    const [score, setScore] = useState({
        loyalty: 0,
        fair_play: 0,
        performance: 0
    });

    useEffect(() => {

        if(localStorage.getItem('defines') === null ||  JSON.parse(localStorage.getItem('defines'))['deleted'] != 0){
            window.location = "/login";
        }

        let loyalty = 0
        let fair_play = 0
        let performance = 0

        if (Array.isArray(profiles2.loyalty) && Array.isArray(profiles2.fair_play) && Array.isArray(profiles2.performance)) {

            profiles2.loyalty.forEach(item => {

                loyalty = loyalty + parseInt(item.score);

            })

            profiles2.fair_play.forEach(item => {

                fair_play = fair_play + parseInt(item.score);

            })

            profiles2.performance.forEach(item => {
                performance = performance + parseInt(item.score);

            })

            console.log(loyalty)
            setScore(prev => {
                const newScore = { ...prev };
                newScore.loyalty = loyalty  / profiles2.loyalty.length;
                newScore.fair_play = fair_play / profiles2.fair_play.length;
                newScore.performance = performance / profiles2.performance.length;
                return newScore;
            })
        }


    }, [profiles2.loyalty, profiles2.fair_play, profiles2.performance])


    useEffect(() => {

        // console.log(JSON.parse(localStorage.getItem('defines'))._id)

        let URL = "//164.90.184.39:9999/profiles/successful?id=" + JSON.parse(localStorage.getItem('defines'))._id
        axios
            .get(URL)
            .then(response => setSuccessful(response.data))
            .catch(errors => console.log(errors))

        //
        let URL1 = "//164.90.184.39:9999/profiles?id=" + JSON.parse(localStorage.getItem('defines'))._id
        axios
            .get(URL1)
            .then(response => {

                setProfiles1(response.data)

            })
            .catch(errors => console.log(errors))


        let URL2 = "//164.90.184.39:9999/profiles?id=" + JSON.parse(localStorage.getItem('defines'))._id
        axios
            .get(URL2)
            .then(response => {

                setProfiles2(response.data.contents)

            })
            .catch(errors => console.log(errors))

    }, [])


    return (
        <div className="profile">
            <nav className='profile-nav'>
                <Link to="/">
                    <img src="src/assets/logo.png" alt="logo" className='logo' />
                </Link>
                <span className='nav-links light'>
                    <Link to="/welcome">Home</Link>
                    <Link to="/profile">Profile</Link>
                    <div className='logout' onClick={()=>{
                        localStorage.clear()
                        window.location = '/Login'
                    }}>Logout</div>
                </span>
            </nav>
            <img className='profile-img' src="src/assets/profile-pic.png" alt="" />
            <div className='profile-info'>
                <h4 className='user-name-title'>{profiles1.title}</h4>
                <div className='about'>
                    <h6 className='about-title'>ABOUT</h6>
                    <p>{profiles2.about}</p>

                </div>
                <div className='fav-branches'>
                    <h6 className='fav-branches-title'>FAVORITE BRANCHES</h6>
                    {profiles2.favorite_branches && profiles2.favorite_branches.map((x,y)=><div style={{ float: "left" }} key={y}> 
                    <img src="src/assets/cardio-1.png" alt="" style={{display: x === '638e675d4321c700312ff674' ? 'block' : 'none' }} />
                    <img src="src/assets/people-running.png" alt="" style={{ display: x === '638e69544321c700312ff679' ? 'block' : 'none' }} />
                    <img src="src/assets/yoga-room-pic.png" alt="" style={{ display: x === '638e69cd4321c700312ff67b' ? 'block' : 'none' }} />
                    <img src="src/assets/people-yoga.png" alt="" style={{ display: x === '639f73052b33750031d145f9' ? 'block' : 'none' }} />
                    </div>)}


                    {/* <img src="src/assets/people-yoga.png" alt="" />
                    <img src="src/assets/people-running.png" alt="" /> */}
                </div>
                <div className='ratings'>
                    <span>Loyalty <br/>{isNaN(score.loyalty) ?0:score.loyalty}</span>
                    <span>Fair Play<br/>{isNaN(score.fair_play) ?0:score.fair_play}</span>
                    <span>Performance<br/>{isNaN(score.performance) ?0:score.performance}</span>
                </div>
                <div className='events-created'>
                    <p>{successful.message}</p>
                </div>

            </div>
        </div>
    );
}