import { MemoryRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoute from './Components/privateroute/PrivateRoute'
import './App.css';
import { ToastContainer } from 'react-toastify';

import Events from './Components/dashboard/events/Events';
import JobStatus from './Components/dashboard/jobstatus/JobStatus';
import Navbar from './Components/dashboard/navbar/Navbar';
import Setting from './Components/dashboard/settings/Setting';

import Home from './Components/dashboard/home/Home';

import {Provider} from 'react-redux';
import {store} from './store/store'
import Login from './Components/auth/login/Login';
import { Logout } from './Components/auth/logout/Logout';
import DeviceLoader from './Components/deviceloader/DeviceLoader';
import Header from './Components/dashboard/header/Header';
import NativeApp from './Components/dashboard/applications/native/NativeApp';
import CustomBin from './Components/dashboard/applications/custom/CustomBin';
import WebApp from './Components/dashboard/applications/WebApp/WebApp';

export default function App() {

  return (
    <Router>
      <Provider store = {store}>
        <ToastContainer />
        <Routes>
          <Route path="/deviceloader" element={<DeviceLoader/>} />
          <Route path="/dashboard" element={<PrivateRoute/>}>
            {/*Anything here is only rendered when logged in.*/}
            <Route path="/dashboard/home" element={<div className="dashboard-layout"><Header header_path='User Dashboard'/><Navbar/><Home /></div>} />
            <Route path="/dashboard/jobstatus" element={<div className="dashboard-layout"><Header header_path='Job Status'/><Navbar/><JobStatus /></div>} />
            <Route path="/dashboard/programs" element={<div className="dashboard-layout"><Header header_path='Native Applications'/><Navbar/><NativeApp /></div>} />
            <Route path="/dashboard/events" element={<div className="dashboard-layout"><Header header_path='Events'/><Navbar/><Events /></div>} />
            <Route path="/dashboard/settings" element={<div className="dashboard-layout"><Header header_path='Settings'/><Navbar/><Setting /></div>} />
          
            <Route path="/dashboard/applets" element={<div className="dashboard-layout"><Header header_path='Web Applets'/><Navbar/><WebApp /></div>} />
            <Route path="/dashboard/custombin" element={<div className="dashboard-layout"><Header header_path='Custom Binaries'/><Navbar/><CustomBin/></div>} />

          </Route>
          {/*Default to login page. o/w redirect to the dashboard*/}
          <Route path="/" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Provider>
    </Router>
  );
}
