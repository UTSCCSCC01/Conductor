import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.min.css';

import HomePage from './components/HomePage/HomePage';
import NavBarOne from './components/NavBar/NavBarOne';
import NavBarTwo from './components/NavBar/NavBarTwo';
import TopBar from './components/TopBar/TopBar';
import DeviceStatus from './components/DevicePage/DeviceStatus';

const login = true;

function App() {
  return (
    <div>
      {!login 
        ? <div><NavBarOne /></div> 
        : <div className="sidebar"><NavBarTwo /></div>
      }
      {login && <TopBar />}
      <div className={!login ? "App-pre" : "App"}>
        <Routes>
          <Route exact path='/' element={<HomePage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/devices' element={<DeviceStatus />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
