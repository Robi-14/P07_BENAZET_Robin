import React from 'react'
import'./Header.css'
import Logo from './logoBlack.svg'
import profil from './profil.svg'
import {NavLink} from"react-router-dom"

export default function Header() {
    return (
        <header>
            <div className="navbar">
                <NavLink exact to ="/">
                    <img src={Logo} alt="Logo Groupomania" className="logo" />
                </NavLink>
                <NavLink exact to ="profil">
                    <img src={profil} alt="Logo profil" className="profil" />
                </NavLink>
            </div>
        </header>
    )
}
