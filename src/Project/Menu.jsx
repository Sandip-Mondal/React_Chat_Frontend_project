import React from 'react'
import { NavLink } from "react-router-dom";

const Menu = () => {
    return (
        <div className='flex justify-around'>
            <NavLink to="/signup" className={({ isActive }) => isActive ? "text-red-800" : null}>
                <div className='flex flex-col'>
                    <i className="fa fa-registered text-2xl text-center cursor-pointer" aria-hidden="true"></i>
                    <h2>signUp</h2>
                </div>
            </NavLink>
            <NavLink to="/login" className={({ isActive }) => isActive ? "text-red-800" : null}>
                <div className='flex flex-col'>
                    <i className="fa fa-user text-2xl text-center cursor-pointer" aria-hidden="true"></i>
                    <h2>loginin</h2>
                </div>
            </NavLink>
        </div>
    )
}

export default Menu;
