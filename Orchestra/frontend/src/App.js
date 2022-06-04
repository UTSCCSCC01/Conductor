import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import 'antd/dist/antd.min.css';

import HomePage from './components/HomePage/HomePage';
import NavBarOne from './components/NavBar/NavBarOne';
import NavBarTwo from './components/NavBar/NavBarTwo';
import TopBar from './components/TopBar/TopBar';

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
        </Routes>
      </div>
    </div>
  );
}

export default App;
