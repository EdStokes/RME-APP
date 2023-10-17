import { NavLink, useLocation, Link } from "react-router-dom";
import React, {useState} from "react";
import "../styles.css";
import logo from '../logo.jpeg';


function NavBar({handleAddworkButton, handleSubmitPassdownButton, handleShiftEditButton}) {
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
                        <Link to="/passdown/createPassdown" className="createPassdownLink">Create Passdown</Link>
                        <Link to="/passdown/searchPassdown" className="searchPassdownButton">Search</Link>
                    </div>
                )}
                {location.pathname === '/passdown/createPassdown' && (
                    <div>
                        <button className="addWorkButton" onClick={handleShiftEditButton}>Shift Info</button>
                        <button className="addWorkButton" onClick={handleAddworkButton} >Add Workorder</button>
                        <button className="sendPassdownButton" onClick={handleSubmitPassdownButton}>Submit End of Shift Passdown</button>
                        
                    </div>
                )}
            </div>
            <div className="navBarRight">
                <NavLink to="/" exact className="homeLink">Home</NavLink>
                <NavLink to="/Passdown" exact className="passdownLink">Passdown</NavLink>
            </div>
        </div>
    )
}

export default NavBar;