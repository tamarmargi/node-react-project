import './Nav.css';
import { NavLink } from "react-router-dom";

import {useSelector} from "react-redux"
import useAuth from "../featchers/auth/UseAuth";

const Nav = () => {

    const {isUserLoggedIn} = useSelector((state)=>state.auth)
    const [userObj]= useAuth()

    return (
        <nav style={{ marginTop: "3vh", display: "flex", justifyContent: "center", gap: "3vw" }}>
            <NavLink className="nav-link" to="/">בית</NavLink>
            <NavLink className="nav-link" to="/menue">תפריט</NavLink>
            <NavLink className="nav-link" to="/about">אודות</NavLink>
            <NavLink className="nav-link" to="/branches">סניפים</NavLink>
            {userObj.roles==='Admin' &&<NavLink className="nav-link" to="/update">תפריט מנהל</NavLink>}
            {!isUserLoggedIn &&<NavLink className="nav-link" to="/register">הרשמה</NavLink>}
            {!isUserLoggedIn &&<NavLink className="nav-link" to="/login">התחברות</NavLink>}
            {isUserLoggedIn && <NavLink className="nav-link" to="/logout">התנתק</NavLink>}
            {isUserLoggedIn &&<NavLink className="nav-link" to="/MyBasket">העגלה שלי</NavLink>}
        </nav>
    )
}

export default Nav;