import { Outlet } from "react-router-dom"
import Nav from "./Nav"

const Layout = ()=>{
    return (
        <div className="page">
            <Nav></Nav>
            <main>
                <Outlet></Outlet>
            </main>
        </div>
    )
}

export default Layout