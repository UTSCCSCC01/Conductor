import { MemoryRouter as Router, Routes, Route} from 'react-router-dom';
import PrivateRoute from './Components/privateroute/PrivateRoute'
import { AuthContext } from './AuthContext';
import './App.css';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';

import Events from './Components/dashboard/events/Events';
import JobStatus from './Components/dashboard/jobstatus/JobStatus';
import Navbar from './Components/dashboard/navbar/Navbar';
import Setting from './Components/dashboard/settings/Setting';
import Login  from './Components/login/Login';
import Home from './Components/dashboard/home/Home';



export default function App() {
  const [userToken, setUserToken] = useState(null)

  return (
    <Router>
      <AuthContext.Provider value={[userToken, setUserToken]}>
        <ToastContainer />
        <Routes>
          <Route path="/dashboard" element={<PrivateRoute/>}>
            {/*Anything here is only rendered when logged in.*/}
            <Route path="/dashboard/home" element={<div className="dashboard-layout"><Navbar/><Home /></div>} />
            <Route path="/dashboard/jobstatus" element={<div className="dashboard-layout"><Navbar/><JobStatus /></div>} />
            <Route path="/dashboard/events" element={<div className="dashboard-layout"><Navbar/><Events /></div>} />
            <Route path="/dashboard/settings" element={<div className="dashboard-layout"><Navbar/><Setting /></div>} />
          </Route>
          {/*Default to login page. o/w redirect to the dashboard*/}
          <Route path="/" element={<Login />} />
        </Routes>
      </AuthContext.Provider>
    </Router>
  );
}
