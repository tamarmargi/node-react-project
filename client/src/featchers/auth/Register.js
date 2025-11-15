// import './auth.css';
import React, { useState } from "react"
import { useRegisterMutation } from "./AuthApiSlice"
import { useNavigate } from "react-router-dom"

//------------
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from "primereact/floatlabel";
import { Button } from 'primereact/button';

const Register = () => {

    const navigate = useNavigate()
    const [register, { isError, isLoading, error, data }] = useRegisterMutation()
     //------------------
    const [formData, setFormData] = useState({
        userName: "",
        password: "",
        name: "",
        email: "",
        phon: ""

    })
    const handelChange = (e) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    const [allDetails, setAllDetails] = useState(true)
    const handelSubmit = (e) => {
        e.preventDefault()
        if(formData.userName === "" || formData.password === "" || formData.name === ""){
            setAllDetails(false)
            return
        }
        register(formData)
        setFormData({
            userName: "",
            password: "",
            name: "",
            email: "",
            phon: ""

        })
        navigate("/login")
    }

    if (isLoading) return <h2>Loading</h2>
    if (isError) return <h2>error</h2>

    return (
        <div>
            <h1 style={{marginTop:"10vh"}}> Register</h1>
            <form onSubmit={handelSubmit}>
                <div className="card flex justify-content-center" id="registerForm" style={{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between", marginTop:"10vh"}}>
                    <FloatLabel>
                        <InputText name="userName" id="username" value={formData.userName} onChange={handelChange} />
                        <label htmlFor="username">Username</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputText type="password" name="password" onChange={handelChange} value={formData.password} />
                        <label htmlFor="Password">Password</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputText name="name" onChange={handelChange} value={formData.name} />
                        <label htmlFor="Name">Name</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputText type="email" name="email" onChange={handelChange} value={formData.email} />
                        <label htmlFor="Email">Email</label>
                    </FloatLabel>
                    <FloatLabel>
                        <InputText name="phon" onChange={handelChange} value={formData.phom} />
                        <label htmlFor="Phon">Phon</label>
                    </FloatLabel>
                </div>
                <div className="card flex flex-wrap justify-content-center gap-3" style={{marginTop: "3vh", bacolor: "red"}}>
                    <Button  type="submit" label="Send" icon="pi pi-check"  style={{border:"solid,2px",borderColor: "red", backgroundColor:"black",color:"red", marginBottom:"35vh"}}  />
                </div>
            </form>
            {!allDetails && <span>כל הפרטים נדרשים</span>}
        </div>
    )
}

export default Register