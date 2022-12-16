import { Link } from 'react-router-dom'

export default function Room(){
    return(
        <div className="activity-room">
          <nav className='activity-room-nav'>
          <Link to="/"><img src="src/assets/sportbud_logo_dark.png" alt="logo" className='dark-logo'/></Link>
          </nav>
          <div>
            <div className='room-info'>
                <div className='room-info-upper'>
                <p>YOGA ROOM 1</p>
                <p><i class="bi bi-geo-alt-fill white-icon"></i> Büyük Park</p>
                <p><i class="bi bi-clock-fill white-icon"></i> December 5, 6 PM</p>
                </div>
                <div className='room-info-bottom'>
                    <p><b>If you want to get rid of the tiredness of the week, you should join our yoga event!</b></p>
                    <p>ROOM ADMIN <span className='darker'>@IREMFOCALI</span></p>
                    <p>THIS ROOM'S CAPACITY IS FULL <span className='darker'>6/6.</span></p>
                    <p className='darker'>SIGN IN TO THE WAITING LIST</p>
                    <button className='mail-button'><i class="bi bi-envelope-fill"></i>Sign me in</button>
                </div>
            </div>
            <div className='chat'>
                <img src="src/assets/new-chat.png" alt="" className='chat-img'/>
            </div>
          </div>
        </div>
    );
}