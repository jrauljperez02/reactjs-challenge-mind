import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AuthProvider } from './context/AuthContext'


import Profile from './pages/Profile';
import WrapperUsers from './pages/Users/WrapperUsers';
import WrapperTeams from './pages/Teams/WrapperTeams'
import WrapperAccounts from './pages/Account/WrapperAccounts';
import LoginPage from './pages/LoginPage';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path = 'login' element = {<LoginPage/>}/>
          <Route path = "profile" element={<Profile />} />
          <Route path = 'users' element = {<WrapperUsers/>}/>
          <Route path = 'teams' element = {<WrapperTeams/>} />
          <Route path = 'accounts' element = {<WrapperAccounts/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;