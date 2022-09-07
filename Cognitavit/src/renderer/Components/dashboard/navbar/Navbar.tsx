import { Link } from 'react-router-dom';
import './Navbar.css'
import logo from './assets/logo.png'

const Navbar = () => {
    return (
        <div className="navbar">
            <div className="logo">
                <img src={logo} width="150px" alt="Orchestra Logo" />
            </div>
    
            <nav className="menu-options">
                <Link to='/dashboard/home'>Home</Link>
                <Link to='/dashboard/events'>Upcoming Events</Link> 
                <Link to='/dashboard/jobstatus'>Job status</Link> 
                
                <Link to='/dashboard/applets'>Web Applets</Link> 
                <Link to='/dashboard/programs'>Native Programs</Link> 
                <Link to='/dashboard/custombin'>Custom Binaries</Link> 

                <Link to='/dashboard/settings'>Device Information</Link> 

            </nav>
             
    
        </div>
    )
};

export default Navbar;
