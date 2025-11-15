import React, { useEffect, useState } from "react"
import { useLoginMutation } from "./AuthApiSlice"
import { useNavigate } from "react-router-dom"
import { setToken } from '../../app/AuthSlice'
import { useDispatch } from 'react-redux'
//---------------
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [login, { isError, isLoading, error, data, isSuccess }] = useLoginMutation()
    const [formData, setFormData] = useState({
        userName: "",
        password: ""
    })

    useEffect(() => {
        if (isSuccess) {
            dispatch(setToken(data))
            navigate("/menue")
        }
    }, [isSuccess])

    const handelChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const handelSubmit = async (e) => {
        e.preventDefault()
        await login(formData)
        setFormData({
            userName: "",
            password: ""
        })
    }

    if (isLoading) return <h2>Loading</h2>
    // if (isError) return (
    // <div>
    //     <h2>כניסה למערכת מחייבת הרשמה מראש</h2>
    //     <button onClick={needRegister}>להרשמה</button>
    // </div>
    // )

    return (
        <div>
            <h1 style={{ marginTop: "10vh" }}> Login</h1>
            <form onSubmit={handelSubmit}>
                <div className="card flex justify-content-center" id="registerForm" style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "space-between", marginTop: "10vh" }}>
                    <FloatLabel>
                        <InputText name="userName" onChange={handelChange} value={formData.userName} />
                        <label htmlFor="username">Username</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputText name="password" type="password" onChange={handelChange} value={formData.password} />
                        <label htmlFor="username">Password</label>
                    </FloatLabel>
                </div>
                <div className="card flex flex-wrap justify-content-center gap-3" style={{ marginTop: "3vh", borderColor: "red" }}>
                    <Button type="submit" label="conect" icon="pi pi-check" style={{ border: "solid,2px", borderColor: "red", backgroundColor: "black", color: "red", marginBottom: "51.7vh" }} />
                </div>
                {isError &&
                    <div>
                        <span>שם משתמש או סיסמא לא נמצאים במערכת</span>
                        <button onClick={() => navigate("/register")}>להרשמה</button>
                    </div>
                }
            </form>

        </div>
    )
}
export default Login