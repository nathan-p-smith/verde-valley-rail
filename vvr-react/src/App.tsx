import { useState } from 'react'
import './App.css'
import SampleTable from './components/SampleTable';
import * as Mui from '@mui/material';

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
    </>
  )
}

export default App
