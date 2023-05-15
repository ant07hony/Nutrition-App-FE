import header from './header.css'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import {getUserToken, clearUserToken} from '../../utilities/authToken'



const Header = (props) => {
    return (
        <header className="header">
            <h1>Nutrition Journal APP</h1>
            <h3 className="profile-pic">Welcome </h3>
            <Nav />
        </header>
    )
}

export default Header

const logout = () => {
    clearUserToken()
   
}

const Nav = () => (

    <nav className="nav">
    <div className="navbar">
        <Link to='/journal'>
         Home
        </Link>


    </div>
        {/* <div>Nutrition Journal</div> */}
    </nav>
)

