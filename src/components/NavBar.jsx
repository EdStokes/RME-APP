import { NavLink } from "react-router-dom";

function NavBar() {

    return (
        <div>
            <NavLink to="/" exact>Home</NavLink>
            <NavLink to="/Passdown" exact>Passdown</NavLink>
            <NavLink to="/Safety" exact>Safety</NavLink>
        </div>
    )
}

export default NavBar;