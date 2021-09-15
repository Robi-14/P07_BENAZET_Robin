import React, { useState, useEffect } from "react";
import "./Home.css";
import Header from "../../component/Header/Header";
import axios from "axios";
import Message from "../../component/Message/Message";

export default function Home() {
  const userToken = localStorage.getItem("Token");
  const token = userToken;
  const [messages, setMessages] = useState([]);
  const [content, setContent]= useState('')
  const [error, setError]=useState(false)
  

  const getMessages = () => {
    axios
      .get("http://localhost:5000/api/messages/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setMessages(res.data));
  };
  useEffect(() => {
    getMessages();
  }, []);

  const handleSubmit=(e)=>{
      e.preventDefault()

      if(content.length<5){
          setError(true)

      }else{
          
          axios.post('http://localhost:5000/api/messages/new',{
              content,
              attachement:""
            },{
                headers: { Authorization: `Bearer ${token}` }
            }).then(()=>{
                setContent('')
                getMessages()
                setError(false)
            }
                )
            }
}
  
  return (
    <>
      <Header />
      <div className="message-container">
        <form onSubmit={(e)=>handleSubmit(e)}>
          <textarea
          style={{border: error ? "2px solid red" : "2px solid steelblue"}}
            onChange={(e)=>setContent(e.target.value)}
            placeholder="Quoi de neuf ?"
            value={content}
          ></textarea>
          {error&& <p className="errortxt">Veuillez écrire un minimum de 5 caractères</p>}
          <input type="submit" value="Publier" />
        </form>
        <ul>
        {messages
          .map((messag) => (
            <Message key={messag.id} messag={messag} />
          ))}
        </ul>
      </div>
    </>
  );
}
