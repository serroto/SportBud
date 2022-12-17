import { Link } from 'react-router-dom'

export default function Profile(){
    return(
        <div className="profile">
          <nav className='profile-nav'>
          <Link to="/"><img src="src/assets/logo.png" alt="logo" className='logo'/></Link>
          <span className='nav-links light'>
            <Link to="/welcome">Home</Link>
            <Link to="/profile">Profile</Link>
          </span>
          </nav>
          <img className='profile-img' src="src/assets/profile-pic.png" alt="" />
          <div className='profile-info'>
            <h4 className='user-name-title'>SERRA ATALAY</h4>
            <div className='about'>
              <h6 className='about-title'>ABOUT</h6>
              <p>Hi, I'm Serra. I professionally do pilates and i like to do group runs.</p>
            </div>
            <div className='fav-branches'>
            <h6 className='fav-branches-title'>FAVORITE BRANCHES</h6>
              <img src="src/assets/people-yoga.png" alt="" />
              <img src="src/assets/people-running.png" alt="" />
            </div>
            <div className='ratings'>
              <div className='ratings-numbers'><span>8.7</span><span>8.7</span><span>9.4</span></div>
              <div className='ratings-areas'><span>Loyalty</span><span>Fair Play</span><span>Performance</span></div>
            </div>
            <div className='events-created'>
              <p>17/30 Succesful events created</p>
            </div>

          </div>
        </div>
    );
}