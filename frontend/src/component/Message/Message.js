import React, { useState, useEffect } from "react";
import "./Message.css";
import axios from "axios";

export default function Message({ messag }) {
  console.log(messag);
  const userToken = localStorage.getItem("Token");
  const token = userToken;

  const[isEditing, setIsEditing]= useState(false)
  const[editContent, setEditContent]=useState('')

  const dateParser = (date) => {
    let newDate = new Date(date).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    return newDate;
  };

  const handleEdit =()=>{
    const data = {
      content: editContent
    }
    axios.put(`http://localhost:5000/api/messages/${messag.id}`,data,{
      headers: { Authorization: `Bearer ${token}` }
  } )
    
    setIsEditing(false)

  }

  return (
    <div className="message">
      <div className="user_date">
        <p>
          {messag.User.firstname} {messag.User.lastname}
        </p>
        <p>Posté le {dateParser(messag.createdAt)}</p>
      </div>
      <div className="content_attachment">
        {isEditing ? (
          <textarea onChange={(e)=>setEditContent(e.target.value)} autoFocus defaultValue={messag.content}></textarea>
        ) :(<p>{messag.content}</p>)}
        <div>{messag.attachement}</div>
        </div>
        <div className="bouton">
          {isEditing ? (<button onClick={handleEdit}>Valider</button>
          ):(
          <button className='edit' onClick={()=> setIsEditing(true)}>Edit</button>)}
          
          <button className='delete'>Delete</button>
        </div>
    </div>
  );
}
