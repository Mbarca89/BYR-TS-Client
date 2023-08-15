import React from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';
import Home from './views/Home/Home'
import Nav from './components/Nav/Nav'
import Footer from './components/Footer/Footer';
import Detail from './views/Detail/Detail';
import Admin from './views/Admin/Admin';
import Properties from './views/Properties/Properties';
import Rates from './views/Rates/Rates';
import About from './views/About/About';
import { Toaster } from 'react-hot-toast';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react'; 
import './App.css';

function App() {

  return (
    <div className="App">
      <Toaster></Toaster>
      <TawkMessengerReact
                propertyId="64db6042cc26a871b02f5cbd"
                widgetId="1h7sf00ve"/>
      <Routes>
        <Route element={(
          <>
            <Nav />
            <Outlet />
            <Footer />
          </>
        )}>
          <Route path='/' element={<Home />} />
          <Route path='/detail/:id' element={<Detail />} />
          <Route path='/propiedades' element={<Properties />} />
          <Route path='/tasaciones' element={<Rates />} />
          <Route path='/empresa' element={<About />} />
        </Route>
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </div>
  )
}

export default App;