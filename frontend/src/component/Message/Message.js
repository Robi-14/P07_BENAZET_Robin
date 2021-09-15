import React, { useState, useEffect } from "react";
import "./Message.css";
import axios from "axios";

export default function Message({ messag }) {
  console.log(messag);
  const userToken = localStorage.getItem("Token");
  const token = userToken;

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

  return (
    <div className="message">
      <div className="user_date">
        <p>
          {messag.User.firstname} {messag.User.lastname}
        </p>
        <p>Posté le {dateParser(messag.createdAt)}</p>
      </div>
      <div className="content_attachment">
        <p>{messag.content}</p>
        <div>{messag.attachement}</div>
        </div>
        <div className="bouton">
          <button className='edit'>Edit</button>
          <button className='delete'>Delete</button>
        </div>
    </div>
  );
}
