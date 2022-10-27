import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';

// import { AuthProvider } from './context/AuthContext'


import Profile from './pages/Users/Profile';
import WrapperUsers from './pages/Users/WrapperUsers';
import WrapperTeams from './pages/Teams/WrapperTeams'
import WrapperAccounts from './pages/Account/WrapperAccounts';

const App = () => {
  return (
    <BrowserRouter>
      <Sidebar>

        <Routes>
          <Route path = "profile" element={<Profile />} />
          <Route path = 'users' element = {<WrapperUsers/>}/>
          <Route path = 'teams' element = {<WrapperTeams/>} />
          <Route path = 'accounts' element = {<WrapperAccounts/>}/>
        
        </Routes>

      </Sidebar>
    </BrowserRouter>
  );
};

export default App;