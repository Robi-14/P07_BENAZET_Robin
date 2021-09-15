import axios from 'axios'
import React, { useState } from 'react'

export default function FormRegister() {
    const [lastname, setLastName] = useState('')
    const [firstname, setFirstName] =  useState('')
    const [email, setEmail] =  useState('')
    const [password, setPassword] =  useState('')
const register = ()=>{
    axios.post('http://localhost:5000/api/user/register', {
        lastname,
        firstname,
        email,
        password,
    })
}

const handleSubmit =(e)=>{
    e.preventDefault()
    register()
}


    return (
        <div>
             <form onSubmit= {(e)=>handleSubmit(e)} > 
                <input onChange={(e)=>setLastName(e.target.value)}  type='text' placeholder='Name'/> 
                <input onChange={(e)=>setFirstName(e.target.value)} type="text" placeholder="Firstname" />
                <input onChange={(e)=>setEmail(e.target.value)}  type='email' placeholder='Email'/>
                <input onChange={(e)=>setPassword(e.target.value)}  type="password" placeholder='Mot de passe' />
                <input type="submit" value="S'inscrire'"/>
            </form>
            
        </div>
    )
}
