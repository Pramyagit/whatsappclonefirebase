import React from 'react'
import './Sidechat.css'
import { Avatar } from '@mui/material'
const Sidechat = ({id,name,photo,addNewChat}) => {
  return (
    !addNewChat?(
    <div className="sideChat">
      <Avatar src={photo}/>
      <div className="sidechat_info">
        <h2>{name}</h2>
        <p>msg here</p>
      </div>
    </div>
    ):(
    <div className='sidechat'>
      <h2 className='additem'>Add New Chat</h2>
    </div>
    )
  )
}

export default Sidechat