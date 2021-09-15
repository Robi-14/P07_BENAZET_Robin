import React from 'react'
import FormLogin from '../../component/FormLogin/FormLogin'
import Header from '../../component/Header/Header'
import './Login.css'

export default function Login() {
    return (
        <>
            <Header/>
            <h1 className='connexion'> Connexion</h1>
            <FormLogin/>
        </>
    )
}
