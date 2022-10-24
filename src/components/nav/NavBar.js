import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {

    return <ul className="navbar">
        <li><h3>Townsfolk Generator</h3></li>
        <li>
            <Link className="navbar__link" to="/villages">My Villages</Link>
        </li>
        <li>
            <Link className="navbar__link" to="/login">Sign Out</Link>
        </li>
    </ul>
}