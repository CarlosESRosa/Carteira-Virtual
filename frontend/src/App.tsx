import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/register';

import './App.css';
import './pages/Home/Home.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={ <Login/> } />
        <Route path="/register" element={ <Register/> } />
        <Route path="/home" element={ <Home/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
