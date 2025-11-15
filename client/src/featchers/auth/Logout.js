import { useDispatch, useSelector } from "react-redux"
import apiSlice from "../../app/ApiSlice"
import { useNavigate } from "react-router-dom"
import { removeToken } from "../../app/AuthSlice"

const LogOut = ()=>{
     const {isUserLoggedIn} = useSelector((state)=>state.auth)
     
     const dispatch = useDispatch()
     const navigate = useNavigate()
     const handleLogoutClick=()=>{
        dispatch(removeToken())
        dispatch(apiSlice.util.resetApiState())
        navigate("/")
     }

     return (
        <div>
        {isUserLoggedIn && <button onClick={handleLogoutClick}>התנתק</button>}
        </div>
     )
}
export default LogOut