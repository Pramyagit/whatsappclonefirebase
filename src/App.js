import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
function App() {
  return (
    <div className="app">
      {/* <h1>wtsapp clone</h1> */}
      <div className="app_body">
      <BrowserRouter>
        <Sidebar/>
  <Routes>
    <Route path="/rooms/:roomId" element={<Chat/>}/>
    <Route path="/" element={<Chat/>}/>
        {/* <Chat/> */}
  </Routes>
      </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
