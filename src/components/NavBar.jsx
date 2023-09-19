import { NavLink } from "react-router-dom";
import "../styles.css";

function NavBar() {

    return (
        <div className="navBar">
            <h2>STN1 RME</h2>
            <NavLink to="/" exact className="homeLink">Home</NavLink>
            <NavLink to="/Passdown" exact className="passdownLink">Passdown</NavLink>
            <NavLink to="/Safety" exact>Safety</NavLink>
        </div>
    )
}

export default NavBar;