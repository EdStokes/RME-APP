import { NavLink } from "react-router-dom";

function NavBar() {

    return (
        <div>
            <NavLink to="/" exact></NavLink>
            <NavLink to="/Passdown" exact>Passdown</NavLink>
            <NavLink to="/Safety" exact></NavLink>
        </div>
    )
}

export default NavBar;