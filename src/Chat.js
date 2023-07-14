import React, { useEffect, useState } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@mui/material'
import { AttachFile, InsertEmoticon, Mic, MoreVert, SearchOutlined, Send } from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import { db } from './firebase'
import {serverTimestamp} from 'firebase/firestore';
const Chat = () => {
  const {roomId}=useParams();
  const [roomData,setRoomData]=useState('');
  const[messages,setMessages]=useState('');
  const[input,setInput]=useState('');


  const submitMessage=(e)=>{
e.preventDefault();
console.log(serverTimestamp())
db.collection('rooms').doc(roomId).collection('messages').add({
  message:input,
  name:"suji",
  timestamp: serverTimestamp(),
});
setInput('');
  };
  useEffect(()=>{
    if(roomId){
      db.collection('rooms')
      .doc(roomId).onSnapshot((snapshot)=>setRoomData(snapshot.data()))
    
      db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot=>setMessages(snapshot.docs.map(doc=>doc.data())))
    }
  },[roomId])
  return (
    <div className='chat'>
    <div className="chat_header">
      <Avatar src={roomData.roomPhoto}/>
      <div className="chat_headerInfo">
        <h2>{roomData.name}</h2>
        <p>lastseen {new Date(messages[0]?.timestamp?.toDate()).toUTCString()}</p>
      </div>
      <div className="chat_headerRight">
       <IconButton><SearchOutlined/></IconButton> 
       <IconButton><AttachFile/></IconButton> 
       <IconButton><MoreVert/></IconButton> 
      </div>
      </div>
      <div className="chat_body">
      {messages && messages.map((message)=>(
      <p className={`chat_message ${message.name === 'ramya' &&'chat_receiver'}`}>
        <span className='chat_name'>{
message.name}</span>
{message.message}
 <span className='chat_timestamp'>
 {new Date(messages[messages.length-1]?.timestamp?.toDate()).toUTCString()}
      </span>
      </p>
        ))}

      </div>
      <div className="chat_footer">
        <InsertEmoticon/>
        <form>
          <input placeholder=''type="text" value={input} onChange={e=>setInput(
            e.target.value
          )}></input>
<button onClick={submitMessage}><Send/></button>
        </form>
        <Mic/>
      </div>
      </div>
  )
}

export default Chat