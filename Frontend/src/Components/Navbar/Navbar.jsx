import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import nav_dropdown_icon from '../Assets/nav_dropdown.png'

function Navbar() {
    const [menu,setmenu]=useState('Shop')
    const {getTotalCartItems}=useContext(ShopContext)
    const menuRef=useRef()

    const dropdown_toggle=(e)=>{
        menuRef.current.classList.toggle('nav-menu-visible')
        e.target.classList.toggle('open')
    }

    return (
        <div className='navbar'>
            <div className="nav-logo">
                <img src={logo} alt=""/>
                <p>SHOPPER</p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={nav_dropdown_icon} alt=''/>

            <ul ref={menuRef} className='nav-menu'>
                <li onClick={()=>{setmenu("Shop")}}><Link to='/' style={{textDecoration:'none'}}>Shop</Link>{menu==='Shop'?<hr/>:<></>}</li>
                <li onClick={()=>{setmenu("Men")}}><Link to='/mens' style={{textDecoration:'none'}}>Men</Link>{menu==='Men'?<hr/>:<></>}</li>
                <li onClick={()=>{setmenu("Women")}}><Link to='/womens' style={{textDecoration:'none'}}>Women</Link>{menu==='Women'?<hr/>:<></>}</li>
                <li onClick={()=>{setmenu("Kids")}}><Link to='/kids' style={{textDecoration:'none'}}>Kids</Link>{menu==='Kids'?<hr/>:<></>}</li>
            </ul>
            <div className='nav-login-cart'>
                <Link to='/login'><button>Login</button></Link>
                <Link to='/cart'><img src={cart_icon} alt=""/></Link>
                <div className='nav-cart-count'>{getTotalCartItems()}</div>
            </div>
        </div>

    )
}

export default Navbar
