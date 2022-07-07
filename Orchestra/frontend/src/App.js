import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.min.css';

import HomePage from './components/HomePage/HomePage';
import NavBarOne from './components/NavBar/NavBarOne';
import NavBarTwo from './components/NavBar/NavBarTwo';
import TopBar from './components/TopBar/TopBar';
import DeviceStatusPage from './components/DevicePage/DeviceStatusPage';
import DeviceListPage from './components/DevicePage/DeviceListPage';
import Marketplace from './components/Marketplace/Marketplace';

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
          <Route path='/devices' element={<DeviceStatusPage />} />
          <Route path='/devices/list' element={<DeviceListPage />} />
          <Route path='/marketplace/' exact element={<Marketplace />} />
          {/* <Route path='/marketplace/:botId' element={<BotDetailPage />} /> */}
          {/* <Route path='/marketplace/:bot' element={<BotDetailPage />} /> */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
