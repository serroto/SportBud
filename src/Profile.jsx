import { Link } from 'react-router-dom'

export default function Profile(){
    return(
        <div className="profile">
          <nav className='activity-room-nav'>
          <Link to="/"><img src="src/assets/sportbud_logo_dark.png" alt="logo" className='dark-logo'/></Link>
          </nav>
        </div>
    );
}