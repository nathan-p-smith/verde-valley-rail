import { useState, useEffect } from 'react'
import './App.css'
import SampleTable from './components/SampleTable';
import * as Mui from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FindTrip from './pages/FindTrip';
import TripDetail from './pages/TripDetail';
import ChooseSeats from './pages/ChooseSeats';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import { useAuth } from './context/AuthContext';
import api from "./services/Api";


function App() {

  const { isLoggedIn, login, setCustomer, customer } = useAuth();

  useEffect(() => {
    
    var jwt = localStorage.getItem("vv-customer-jwt");

    if(!jwt)
      return;

    login();

    api.getCustomer().then(resp => {
      setCustomer(resp.data);
    });

  }, []);

  
  
  return (
    
      <>
        <div>Logged In: {isLoggedIn ? "Logged In" : "Anonymous"}</div>
        <div>{customer ? `Hello ${customer.firstName}` : null}</div>
        <Router>
          <nav>
            <ul>
              <li>
                <Link to="/find-trip">Find Trip</Link>
              </li>
              <li>
                <Link to="/choose-seats">Choose Seats</Link>
              </li>
              <li>
                
              </li>
            </ul>
          </nav>
          <Routes>
            <Route path="/find-trip" element={<FindTrip />} />
            <Route path="/trip-detail/:tripId" element={<TripDetail />} />
            <Route path="/choose-seats" element={<ChooseSeats />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/checkout" element={<Checkout/>} />
          </Routes>
        </Router>
      </>
    
  )
}

export default App
