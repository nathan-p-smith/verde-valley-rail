import { useState } from 'react'
import './App.css'
import SampleTable from './components/SampleTable';
import * as Mui from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FindTrip from './pages/FindTrip';
import TripDetail from './pages/TripDetail';
import ChooseSeats from './pages/ChooseSeats';
import { useAuth } from './context/AuthContext';


function App() {

  const { isLoggedIn } = useAuth();

  
  
  return (
    
      <>
        <div>Logged In: {isLoggedIn ? "Logged In" : "Anonymous"}</div>
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
          </Routes>
        </Router>
      </>
    
  )
}

export default App
