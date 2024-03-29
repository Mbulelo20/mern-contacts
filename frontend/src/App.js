import React, { Fragment } from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Header from './components/Header'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import {ToastContainer,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'


function App() {
  return (
    <Fragment>
      <Router>
        <div className="container" style={{width: '70%', margin:'auto'}}>
          <Header />
          <Routes>
            <Route path='/' element={<Dashboard />}/>
            <Route path='/login' element={<Login />}/>
            <Route path='/register' element={<Register />}/>
          </Routes>
        </div>
      </Router>
      <ToastContainer/>
    </Fragment>
  );
}

export default App;
