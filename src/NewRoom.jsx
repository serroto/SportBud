import { Link } from 'react-router-dom'
import {useLocation} from 'react-router-dom';

export default function NewRoom(){
    const newInput = useLocation();
    return(
        <div className="activity-room">
          <nav className='activity-room-nav'>
          <Link to="/"><img src="src/assets/sportbud_logo_dark.png" alt="logo" className='dark-logo'/></Link>
          </nav>
          <div>
            <div className='room-info'>
                <div className='room-info-upper'>
                <p>{newInput.state.name}</p>
                <p><i className="bi bi-geo-alt-fill white-icon"></i> {newInput.state.place}</p>
                <p><i className="bi bi-clock-fill white-icon"></i> {newInput.state.time} </p>
                </div>
                <div className='room-info-bottom'>
                    <p><b>{newInput.state.slogan}</b></p>
                    <p>Room admin <span className='darker'>@SERRATALAY</span></p>
                    <p>This room's capacity is <span className='darker'>{newInput.state.capacity} people.</span></p>
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