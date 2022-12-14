import { Link } from 'react-router-dom'

export default function Welcome(){
    return (
        <div className='welcome'>
            <nav className='welcome-nav'>
          <Link to="/"><img src="src/assets/logo.png" alt="logo" className='logo'/></Link>

          <div className='filters-yellow'>
            <div className="dropdown dropdown-yellow">
            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Date</button>
            <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">20.11.22</a></li>
            </ul>
            </div>
            <div className="dropdown dropdown-yellow">
            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Time</button>
            <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">12AM</a></li>
            </ul>
            </div>
            <div className="dropdown dropdown-yellow">
            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Place</button>
            <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Aşık Veysel Park</a></li>
            </ul>
            </div>
            </div>
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
                <img src="src/assets/welcome-map.png" alt="map" className='welcome-map'/>
            </div>
        </div>
    )
}