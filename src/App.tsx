import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Home from './views/Home/Home'
import Nav from './components/Nav/Nav'
import './App.css';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route element={(
          <>
            <Nav />
            <Outlet />
          </>
        )}>
          <Route path='/' element={<Home />} />         
        </Route>
      </Routes>
    </div>
  )
}

export default App;