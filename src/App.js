import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
function App() {
  return (
    <div className="app">
      {/* <h1>wtsapp clone</h1> */}
      <div className="app_body">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  );
}

export default App;
