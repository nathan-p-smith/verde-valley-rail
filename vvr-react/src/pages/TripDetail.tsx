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
import { Trip } from '../types/Trip';

const TripDetail = () => {

    const { tripId } = useParams();
    const [trip, setTrip] = useState<Trip | null>(null);

    if(!tripId)
        throw ("");

    useEffect(() => {

        const load = async () => {

            const tripResponse = await api.getTrip(parseInt(tripId, 10));
            setTrip(tripResponse.data);


        }

        load();

    }, []);  
    
    
    

  return (
    <div>
      
    TRIP { trip?.tripId }

    <div>
        { trip?.route.startStation.name } to { trip?.route.endStation.name }
    </div>

    </div>
  );
};

export default TripDetail;
