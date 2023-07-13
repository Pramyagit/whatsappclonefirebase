import React, { useEffect, useState } from 'react'
import './Sidechat.css'
import { Avatar } from '@mui/material'
import { db } from './firebase'
import { Link } from 'react-router-dom'
const Sidechat = ({id,name,photo,addNewChat}) => {
  
  const[messages,setMessages]=useState('')
  
  useEffect(()=>{
    if(id){
      db.collection('rooms')
      .doc(id)
      .collection('messages')
      .orderBy('timestamp','desc')
      .onSnapshot((snapshot)=>setMessages(snapshot.docs.map((doc)=>doc.data())));
    }
  },[id]);
  // console.log(messages);
  return (
    !addNewChat?(
      <Link to={`/rooms/${id}`}>

    <div className="sideChat">
      <Avatar src={photo}/>
      <div className="sidechat_info">
        <h2>{name}</h2>
        <p>{messages[0]?.message}</p>
      </div>
    </div>
      </Link>
    ):(
    <div className='sidechat'>
      <h2 className='additem'>Add New Chat</h2>
    </div>
    )
  )
}

export default Sidechat