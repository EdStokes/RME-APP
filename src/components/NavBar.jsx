import { NavLink, useLocation, Link } from "react-router-dom";
import "../styles.css";
import logo from '../logo.jpeg';

function NavBar() {
    const location = useLocation();

    return (
        <div className="navBar">
            <div className="navBarLeft">
                <img src={logo} alt='Site Logo' className="navLogo" />
                <h2>STN1 RME</h2>
            </div>
            <div className="navBarCenter">
                {location.pathname === '/Passdown' && (
                    <div>
                        <Link to="/passdown/passdownForm" className="createPassdownLink">Create Passdown</Link>
                        <Link to="/passdown/searchPassdownLink" className="searchPassdownButton">Search</Link>
                    </div>
                )}
            </div>
            <div className="navBarRight">
                <NavLink to="/" exact className="homeLink">Home</NavLink>
                <NavLink to="/Passdown" exact className="passdownLink">Passdown</NavLink>
                <NavLink to="/Safety" exact className="safetyLink">Safety</NavLink>
            </div>
        </div>
    )
}

export default NavBar;