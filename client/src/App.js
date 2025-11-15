
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from './featchers/HomePage';
import Layout from './components/Layout';
import About from './featchers/About';
import Branches from './featchers/Barnches';
import Menue from './featchers/menu/Menu';
import AddCategory from './featchers/menu/categories/AddCategory';
import AddProduct from './featchers/menu/products/AddProduct';
import UpdateProduct from './featchers/menu/products/UpdateProduct';
import Register from './featchers/auth/Register';
import Login from './featchers/auth/Login';
import LogOut from './featchers/auth/Logout';
import AddExtra from './featchers/menu/extras/AddExtra';
import AddTopping from './featchers/menu/toppings/AddTopping';
import UpdateTopping from './featchers/menu/toppings/UpdateTopping';
import ChooseTopping from './featchers/busket/ChooseTopping';
import MyBasket from './featchers/busket/MyBasket';
import AdminMenu from './featchers/menu/AdminMenu';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Layout/>}>
            <Route index element={<Home/>}></Route>
            <Route path='/about' element={<About/>}></Route>
            <Route path='/branches' element={<Branches/>}></Route>
            <Route path='/menue' element={<Menue/>}></Route>
            <Route path='/menue/addCategory' element={<AddCategory/>}></Route>
            <Route path='/menue/addProduct/:categoryId' element={<AddProduct/>}></Route>
            <Route path='/menue/updateProduct/:categoryId/:productId' element={<UpdateProduct/>}></Route>
            <Route path='/menue/addExtra/:categoryId/:productId' element={<AddExtra/>}></Route>
            <Route path='/menue/addTopping/:categoryId/:productId/:extraId' element={<AddTopping/>}></Route>
            <Route path='/menue/updateTopping/:categoryId/:productId/:extraId/:toppingId' element={<UpdateTopping/>}></Route>
            <Route path = '/register' element={<Register/>}></Route>
            <Route path = '/login' element={<Login/>}></Route>
            <Route path='/logout' element={<LogOut/>}></Route>
            <Route path = '/chooseTopping/:categoryId/:productId' element = {<ChooseTopping/>}></Route>
            <Route path = '/myBasket' element = {<MyBasket/>}></Route>
            <Route path='/update' element = {<AdminMenu/>}></Route>
          </Route>
        </Routes>
      </Router>

    </div>
  )
}

export default App;
