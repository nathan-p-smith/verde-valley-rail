import React, { useEffect, useState } from 'react';
import * as Mui from '@mui/material';
import api from '../services/Api';
import { StationOption } from '../types/StationOption';

type StationSelectProps = {
    onChange: Function | null;
    value: number | null;
    name: string | undefined;
}

const StationSelect: React.FC<StationSelectProps> = ({ value, name, onChange }) => {
  // Your array of objects

    const [options, setOptions] = useState<StationOption[]>([]);

    async function getStationOptions(){
        var stationOptions = (await api.listStationOptions()).data;
        setOptions(stationOptions);
    }

    useEffect(() => {

        getStationOptions();

    }, []);

  
  // State to manage the selected value
  const [selectedValue, setSelectedValue] = React.useState<number | null>(value);

  const handleChange = (event: any) => {
    setSelectedValue(event.target.value);

    if(onChange)
        onChange(event);
  };

  return (
    <Mui.FormControl fullWidth>
      <Mui.InputLabel id="select-label">Select an option</Mui.InputLabel>
      <Mui.Select
        labelId="select-label"
        id="select"
        value={selectedValue}
        label="Select an option"
        name={name}
        onChange={handleChange}
      >
        {options.map((option) => (
          <Mui.MenuItem key={option.stationId} value={option.stationId}>
            {option.name}
          </Mui.MenuItem>
        ))}
      </Mui.Select>
    </Mui.FormControl>
  );
};

export default StationSelect;
