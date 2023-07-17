import { useState } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './Login';
function App() {
const[user,setUser]=useState(sessionStorage.getItem('user')? JSON.parse(sessionStorage.getItem('user')): "")
// console.log()
  return !user?<Login setUser={setUser}/>:
  (
    <div className="app">
      {/* <h1>wtsapp clone</h1> */}
      <div className="app_body">
      <BrowserRouter>
        <Sidebar setUser={setUser} user={user}/>
  <Routes>
    <Route path="/rooms/:roomId" element={<Chat user={user} emojipicker/>}/>
    <Route path="/" element={<Chat user={user}/>}/>
        {/* <Chat/> */}
  </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
