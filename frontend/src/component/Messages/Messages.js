import React, {useState, useEffect} from 'react'
import'./Messages.css'
import axios from 'axios'
 

export default function Messages() {
    const userToken =localStorage.getItem('Token')
    const token= userToken;
    console.log(token);
    const [messages, setMessages]= useState([])
    const [content, setContent] = useState('')
// appel a l'api recuperation des message
    const getMessages = () =>{ axios.get('http://localhost:5000/api/messages/',{headers: {"Authorization" : `Bearer ${token}`} } ).then((res)=> setMessages(res.data))}


useEffect(()=>{ getMessages()},[])

console.log(messages)

// mise en forme de la date du post
const dateParser =(date)=>{ 
    let newDate = new Date(date).toLocaleDateString('fr-FR', {month: 'long',year:"numeric", day:"numeric"})
    return newDate
}

const handleSubmit = (e)=> {
    e.preventDefault();
   
   
    axios.post('http://localhost:5000/api/messages/new',{
        
        content,
        attachment:""},
    {
        headers: {    
            "Authorization" : `Bearer ${token}`}}


    ).then (()=>{
        setContent('')
        getMessages()
    });




}


    return (
    <div className="message-container">
        <form onSubmit={(e)=>handleSubmit(e)}>
            <textarea placeholder="Quoi de neuf ?" onChange={(e)=>setContent(e.target.value)} value={content}></textarea>
            <input type="submit" value="Publier"/>
        </form>
    
        <div className='message-list'>
            {messages.map((message)=>   
                <div className="message">
                    <div className="user_date">
                        <p>{message.User.firstname} {message.User.lastname}</p>
                        <p> Posté le {dateParser(message.createdAt)}</p>
                    </div>
                    <div className="content_attachment"> 
                        <p>{message.content}</p>
                        <div>{message.attachment}</div>
                    </div>
        </div>
            )}
        </div>
    </div>
    )
}
