import React, { useEffect, useState } from 'react'
import './Chat.css'
import { Avatar, IconButton } from '@mui/material'
import { AttachFile, InsertEmoticon,MoreVert, SearchOutlined, Send } from '@mui/icons-material'
import { useParams } from 'react-router-dom'
import { db } from './firebase'
import {serverTimestamp} from 'firebase/firestore';
// import Picker from 'emoji-picker-react';
import EmojiPicker from 'emoji-picker-react'
import Mic from './Mic'

const Chat = ({user}) => {
  const {roomId}=useParams();
  const [roomData,setRoomData]=useState('');
  const[messages,setMessages]=useState('');
  const[input,setInput]=useState('');
  const [emojiPicker, setEmojiPicker] = useState(null);
  const [speech,setSpeech]=useState('');

  const onEmojiClick = (e, emojiObject) => {
    setInput((input) => input + e.emoji)
    setEmojiPicker(emojiObject);
  };

 

// console.log(user.displayName)
  const submitMessage=(e)=>{
e.preventDefault();
// console.log(serverTimestamp())
db.collection('rooms').doc(roomId).collection('messages').add({
  message:input,
  name:user.displayName,
  timestamp:serverTimestamp(),
});
setInput('');
setEmojiPicker('')

  };
  useEffect(()=>{
    if(roomId){
      db.collection('rooms')
      .doc(roomId).onSnapshot((snapshot)=>setRoomData(snapshot.data()))
    
      db.collection('rooms').doc(roomId).collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot=>setMessages(snapshot.docs.map(doc=>doc.data())))
    }
  },[roomId])


const handleInput=(e)=>{
    setInput(e.target.value)
    // console.log((e.target.value))
}

var today = new Date(messages[0]?.timestamp?.toDate()),
    time = today.getHours() + ':' + today.getMinutes();
   
  return (
    <div className='chat'>
    <div className="chat_header">
      <Avatar src={roomData.roomPhoto}/>
      <div className="chat_headerInfo">
        <h2>{roomData.name}</h2>
        <p>lastseen {new Date(messages[0]?.timestamp?.toDate()).toLocaleTimeString()}</p>
      </div>
      <div className="chat_headerRight">
       <IconButton><SearchOutlined/></IconButton> 
       <IconButton><AttachFile/></IconButton> 
       <IconButton><MoreVert/></IconButton> 
      </div>
      </div>
      <div className="chat_body" key={roomId}>
      {messages && messages.map((message,key)=>(
      <p key={key} className={`chat_message ${message.name === user.displayName &&'chat_receiver'}`}>
        <span className='chat_name'>{
message.name}</span>
{message.message}
  
 <span className='chat_timestamp'>
  {/* {new Date(messages[0]?.timestamp?.toDate()).toLocaleTimeString()} */}
  {time}
      </span>
      </p>
        ))}

      </div>
      <div className="chat_footer">
        {!emojiPicker ? (
          <InsertEmoticon onClick={() => setEmojiPicker((prev) => !prev)} />
        ) : (
          <>
            <InsertEmoticon
              onClick={() => setEmojiPicker((prev) => !prev)}
            />
            <EmojiPicker
              searchDisabled="true"
              previewConfig={{ showPreview: false }}
              emojiStyle="google"
              onEmojiClick={onEmojiClick }
              height={200}
              width="40%"         
            />
          </>
        )}
        <form action="" className='form'>
          <input id="input" placeholder='msg type here' type="text" value={input} 
          onChange={handleInput} required></input>
<button type="submit" onClick={submitMessage}><Send/></button>
        </form>
        <Mic
        value={input}
        setinput={setInput}
        speech={speech}
        setSpeech={setSpeech}/>
      </div>
      </div>
  )
}


export default Chat