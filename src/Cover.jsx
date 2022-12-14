import { Link } from 'react-router-dom'

export default function Cover(){
    return (
        <div className='cover'>
            <nav className='cover-nav'>
                <Link to="/"><img src="src/assets/logo.png" alt="logo" className='logo'/></Link>
                <div className='register'>
                <Link to="/Login" className='nav-link'>Login</Link>
                <Link to="/SignUp" className='nav-link'>Sign Up</Link>
                </div>
            </nav>
            <div className='bottom-text'>
                <h1>SPORTBUD</h1>
                <div>
                    <span>09.22.21</span>
                    <span>5:00 AM</span>
                    <span>Belden Cove</span>
                </div>
            </div>
        </div>
    )
}
