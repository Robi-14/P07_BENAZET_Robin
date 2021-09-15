import React, {useState, useEffect} from 'react'
import axios from 'axios'
import"./Profil.css"
import Header from "../../component/Header/Header"

export default function Profil() {
    const userId = localStorage.getItem('userId')
    const token= localStorage.getItem('Token')
    const [user, setUser] = useState([])
    const getUser = () =>{ axios.get(`http://localhost:5000/api/user/${userId}`,{headers: {"Authorization" : `Bearer ${token}`} } ).then((res)=> setUser(res.data))}
    
    useEffect(()=> {
        getUser()},[])

    

    return (
        <div>
            <Header/>
            <div className='profil-container'>
                <h1>Profil</h1>
                <div className="container">
                    <h3 className="label">Votre Nom</h3>
                    <p className="name">{user.lastname}</p>
                </div>
                <div className="container">
                    <h3 className="label">Votre prénom</h3>
                    <p className="name">{user.firstname}</p>
                </div>
                <div className="container">
                    <h3 className="label">Votre Email</h3>
                    <p className="name">{user.email}</p>
                </div>
            </div>

        </div>
    )
}
