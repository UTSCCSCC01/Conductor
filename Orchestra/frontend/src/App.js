import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.min.css';

import HomePage from './components/HomePage/HomePage';
import NavBarOne from './components/NavBar/NavBarOne';
import NavBarTwo from './components/NavBar/NavBarTwo';
import TopBar from './components/TopBar/TopBar';
import DeviceStatusPage from './components/DevicePage/DeviceStatusPage';
import DeviceListPage from './components/DevicePage/DeviceListPage';
import UploadBotPage from './components/UploadBotPage/UploadBotPage';
import Marketplace from './components/Marketplace/Marketplace';

import {Provider} from 'react-redux';
import { ToastContainer } from 'react-toastify';
import Login from './components/auth/login/Login';
import { Logout } from './components/auth/logout/Logout';
import  Register  from './components/auth/register/Register';

import PrivateRoute from './components/privateroute/PrivateRoute'
import Register2 from './components/auth/register/Register2';

import { BrowserRouter } from "react-router-dom";

const login = false;

function App() {
  let login = true;
  return (
    <BrowserRouter>
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/2" element={<Register2 />} />
          {/*Anything here is only rendered when logged in.*/}
          <Route path="/dashboard" element={<PrivateRoute/>}>
            <Route path="/dashboard" element={<div className='dashboard-layout'><NavBarTwo/> <TopBar/> <HomePage /></div>} />
            <Route path="/dashboard/home" element={<div className='dashboard-layout'><NavBarTwo/> <TopBar/> <HomePage /></div>} />
            <Route path="/dashboard/devices" element={<div className='dashboard-layout'><NavBarTwo/> <TopBar/> <DeviceStatusPage /></div>} />
            <Route path="/dashboard/devices/list" element={<div className='dashboard-layout'><NavBarTwo/> <TopBar/> <DeviceListPage /></div>} />
            <Route path="/dashboard/upload" element={<div className='dashboard-layout'><NavBarTwo/> <TopBar/> <UploadBotPage /></div>} />
            <Route path="/dashboard/marketplace" element={<div className='dashboard-layout'><NavBarTwo/> <TopBar/> <Marketplace /></div>} />
          </Route>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
