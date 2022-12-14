import { Link } from 'react-router-dom'

export default function Branch(){
    return (
        <div className='branch'>
            <nav className='branch-nav'>
          <Link to="/"><img src="src/assets/sportbud_logo_dark.png" alt="logo" className='dark-logo'/></Link>

          <div className='filters-yellow'>
            <div className="dropdown dropdown-yellow">
            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Date</button>
            <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Dropdown item</a></li>
            </ul>
            </div>
            <div className="dropdown dropdown-yellow">
            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Time</button>
            <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Dropdown item</a></li>
            </ul>
            </div>
            <div className="dropdown dropdown-yellow">
            <button className="btn btn-primary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">Place</button>
            <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Dropdown item</a></li>
            </ul>
            </div>
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