import { MemoryRouter as Router, Routes, Route} from 'react-router-dom';
import Login  from './Components/login/Login';
import Home from './Components/home/Home'
import PrivateRoute from './Components/privateroute/PrivateRoute'
import { AuthContext } from './AuthContext';
import './App.css';
import { useState } from 'react';
import { ToastContainer } from 'react-toastify';



export default function App() {
  const [userToken, setUserToken] = useState(null)

  return (
    <Router>
      <AuthContext.Provider value={[userToken, setUserToken]}>
      <ToastContainer />
        <Routes>
          <Route path="/dashboard" element={<PrivateRoute/>}>
            <Route path="/dashboard" element={<Home />} />
          </Route>
          {/*Default to login page. o/w redirect to the dashboard*/}
          <Route path="/" element={<Login />} />
        </Routes>
      </AuthContext.Provider>
    </Router>
  );
}
