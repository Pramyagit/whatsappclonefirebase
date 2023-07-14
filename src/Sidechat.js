import React, { useEffect, useState } from 'react'
import './Sidechat.css'
import { Avatar } from '@mui/material'
import { db } from './firebase'
import { Link } from 'react-router-dom'
const Sidechat = ({id,name,photo,addNewChat}) => {
  
  const[messages,setMessages]=useState('')
  

  const addRoom=()=>{
const roomName=prompt('please enter the room name');
 const roomPhoto=prompt('please enter the photo url');
 if(roomName && roomPhoto)
 {
  db.collection('rooms').add(
    {
      name:roomName,roomPhoto
    }
  )
 }
}

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
      <h2 className='additem' onClick={addRoom}>Add New Chat</h2>
    </div>
    )
  )
}

export default Sidechat