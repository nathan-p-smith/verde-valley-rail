import { useState } from 'react'
import './App.css'
import SampleTable from './components/SampleTable';
import * as Mui from '@mui/material';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import FindTrip from './pages/FindTrip';
import Trip from './pages/Trip';
import ChooseSeats from './pages/ChooseSeats';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <Mui.Button variant="contained">Hello world</Mui.Button>
      </div>
      <div>
        <SampleTable></SampleTable>
      </div>
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
          <Route path="/trip/:tripId" element={<Trip />} />
          <Route path="/choose-seats" element={<ChooseSeats />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
