
import {useSelector} from "react-redux"
import {jwtDecode} from "jwt-decode"

const useAuth=()=>{
    const token=useSelector((state)=>state.auth.token)
    let obj
    //במידה ונכנס כאורח
    if(!token){
        obj = {
            userName:"guest",
            password:"guest",
            name:"guest",
            email:"guest@gmail.com",
            phone:"111111111"
        }
    }
    else{
        obj=jwtDecode(token);
    }    
    return [obj]
}

export default useAuth;