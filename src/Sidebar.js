import React, { useEffect, useState } from 'react'
import './Sidebar.css';
import { Avatar,IconButton } from '@mui/material';
import { DonutLarge, Search } from '@mui/icons-material';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Sidechat from './Sidechat';
import {db} from './firebase';
import { Button } from '@mui/material';
import { Close } from '@mui/icons-material';
const Sidebar = ({setUser,user}) => {
    const [rooms,setRooms]=useState([]);
    
  useEffect(()=>{
   const unsubscribe= db.collection('rooms').onSnapshot(
        (snapshot)=>{
            setRooms(
                snapshot.docs.map(
                (doc)=>({
                id:doc.id,
                data:doc.data(),
            }))
           )
        });
        return ()=> unsubscribe();
    },[]);
    // console.log(rooms)
    return (
    <div className='sidebar'>

          <Button  className="close" onClick={()=>{
        sessionStorage.setItem('user','');
        setUser('');
      }}>
        <Close/>logout</Button>
        <div className="sidebar_header">
            <Avatar
            // src="https://www.freepnglogos.com/uploads/bill-gates-png/hq-download-bill-gates-speech-transparent-png-image-8.png"
           src={user.photoURL}
           />
           {user.displayName}
            <div className='headerRight'>
                <IconButton><DonutLarge/></IconButton>
                <IconButton><ChatIcon/></IconButton>
                <IconButton><MoreVertIcon/></IconButton>
            </div>
            </div>

            <div className='side_searchbar'>
                <div className="serach_container">
                    <Search/>
                <input placeholder='search ' type="text"></input>
                </div>
            </div>
            <div className='addItems'>
               <Sidechat addNewChat/>
               {
                rooms.map((room)=>(
                    <Sidechat
                    key={room.id}
                    id={room.id}
                    // message={room.data.message}
                    name={room.data.name}
                    photo={room.data.roomPhoto}/>
                ))
               }
            </div>
            </div>
  )
}

export default Sidebar