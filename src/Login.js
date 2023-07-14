import React from 'react'
import {auth,provider} from './firebase'
import { Button } from '@mui/material'
import './Login.css'
const Login = ({setUser}) => {

const signIn=()=>{
auth.signInWithPopup(provider).then(result=>{
 sessionStorage.setItem('user',JSON.stringify(result.user));
 setUser(result.user);

// console.log(result);
}).catch((err)=>

  alert(err.messge));
}

  return (
    <div className='login'>
        <div className='login_container'>
          <img src="https://cdn-icons-png.flaticon.com/512/124/124034.png"alt=""   />
<div className="login_text">
  <h1>sign in to wtsapp</h1>
</div>
 </div>
<Button type='submit' onClick={signIn}>sign in with google</Button>
    </div>
  )
}

export default Login