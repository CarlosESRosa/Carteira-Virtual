import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={ <Login/> } />
        <Route path="/register" element={ <Register/> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
