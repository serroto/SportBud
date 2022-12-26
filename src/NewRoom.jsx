import { Link } from 'react-router-dom'
import {useLocation} from 'react-router-dom';

export default function NewRoom(){
    const newInput = useLocation();
    return(
        <div className="activity-room">
          <nav className='activity-room-nav'>
          <Link to="/"><img src="src/assets/sportbud_logo_dark.png" alt="logo" className='dark-logo'/></Link>
          <span className='nav-links'>
            <Link to="/welcome">Home</Link>
            <Link to="/profile">Profile</Link>
          </span>
          </nav>
          <div>
            <div className='room-info'>
                <div className='room-info-upper'>
                <p className='passed-name'>{newInput.state.name}</p>
                <p className='passed-place'><i className="bi bi-geo-alt-fill white-icon"></i> {newInput.state.place}</p>
                <p className='passed-time'><i className="bi bi-clock-fill white-icon"></i> {newInput.state.date} {/* <span className='span-margin'>14 PM</span> */}</p>
                </div>
                <div className='room-info-bottom'>
                    <p><b>{newInput.state.slogan}</b></p>
                    <p>Room admin <span className='darker'><Link to="/profile">@SERRATALAY</Link></span></p>
                    <p className='passed-capacity'>This room's capacity is <span className='darker'>{newInput.state.capacity} people.</span></p>
                    <button className='mail-button'>Join the Room</button>
                </div>
            </div>
            <div className='chat'>
                <img src="src/assets/new-chat.png" alt="" className='chat-img'/>
            </div>
          </div>
        </div>
    );
}