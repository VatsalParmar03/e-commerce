import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import { Link, useNavigate } from 'react-router-dom'
import logo from '../Assets/mmart-logo.jpg'
// import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown.png'
import axios from 'axios';

const Navbar = () => {

  let [menu, setMenu] = useState("shop");
  const [searchVal, setSearchVal] = useState('');
  const [searchedResults, setSearchResults] = useState([]);
  const { getTotalCartItems } = useContext(ShopContext);

  const navigate = useNavigate();
  const menuRef = useRef();

  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle('nav-menu-visible');
    e.target.classList.toggle('open');
  }

  const fetchSearchedResults = async () => {
    const response = await axios.get("http://localhost:4000/search/products?query=" + searchVal, {});
    console.log("response :: ", response.data)
    setSearchResults([...response.data])
  }

  return (
    <div className='nav'>
      <Link to='/' onClick={() => { setMenu("shop") }} style={{ textDecoration: 'none' }} className="nav-logo">
        <img src={logo} alt="logo" />
        <p>MODERN MART</p>
      </Link>
      <img onClick={dropdown_toggle} className='nav-dropdown' src={nav_dropdown} alt="" />
      <ul ref={menuRef} className="nav-menu">
        <li onClick={() => { setMenu("shop") }}><Link to='/' style={{ textDecoration: 'none' }}>Home</Link>{menu === "shop" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("clothing") }}><Link to='/clothing' style={{ textDecoration: 'none' }}>Clothing</Link>{menu === "clothing" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("electronics") }}><Link to='/electronics' style={{ textDecoration: 'none' }}>Electronics</Link>{menu === "electronics" ? <hr /> : <></>}</li>
        <li onClick={() => { setMenu("furniture") }}><Link to='/furniture' style={{ textDecoration: 'none' }}>Furniture</Link>{menu === "furniture" ? <hr /> : <></>}</li>
        <li >
          <div className='searchbar'>
            <div style={{
              display: "block",
              width: "200px"
            }}>
              <div>
                <input
                value={searchVal}
                style={{
                  height: "35px"
                }} type="text" onChange={(event) => {
                  setSearchVal(event.target.value)
                  if (event.target.value) {
                    fetchSearchedResults();

                  } else {
                    setSearchResults([]);
                  }
                }} placeholder="Search" />
              </div>
              <section className="autocomplete" style={{
                position: "relative",
                top: "-21px",
                maxHeight: "250px",
                width: "100%",
                overflowY: "scroll",
                overflowX: "hidden"
              }}>

                <section style={{
                  display: "block"
                }}>
                  {searchedResults.map((item) => {
                    return <div onClick={()=>{
                      navigate(`/product/${item.id}`);
                      setSearchResults([]);
                    }}>{item.name}</div>;
                  })}
                </section>
              </section>
            </div>

          </div>
        </li>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem('auth-token')
          ? <>
            <button onClick={() => { localStorage.removeItem('auth-token'); window.location.replace("/"); }}>Logout</button>
            <button onClick={() => {
              navigate("/orders");
            }}>My Orders</button>
          </>
          : <Link to='/login' style={{ textDecoration: 'none' }}><button>Login</button></Link>}
        <Link to="/cart"><img src={cart_icon} alt="cart" /></Link>
        <div className="nav-cart-count">{getTotalCartItems()}</div>
      </div>
    </div>
  )
}

export default Navbar
