// FindTrip.js
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import api from '../services/Api';
import { TripGrid } from '../components/TripGird';
import { TripSearchResult } from '../types/TripSearchResult';
import { TripSearchFilter } from '../types/TripSearchFilter';
import StationSelect from '../components/StationSelect';

const Trip = () => {

    const { tripId } = useParams();
    
    
    
    
    

  return (
    <div>
      
    TRIP { tripId }

    </div>
  );
};

export default Trip;
