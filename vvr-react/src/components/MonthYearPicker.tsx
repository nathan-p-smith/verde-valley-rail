import React, { useState, useEffect } from 'react';
import { MenuItem, Select, InputLabel, FormControl, Grid } from '@mui/material';

interface MonthYearPickerProps {
  value: Date;
  onChange: (value: Date) => void;
}

const MonthYearPicker: React.FC<MonthYearPickerProps> = ({ value, onChange }) => {
  const [months, setMonths] = useState<number[]>(Array.from({ length: 12 }, (_, i) => i + 1));
  const [years, setYears] = useState<number[]>([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const futureYears = Array.from({ length: 12 }, (_, i) => currentYear + i);
    setYears(futureYears);
  }, [currentYear]);

  const handleMonthChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedDate = new Date(value);
    selectedDate.setMonth(event.target.value as number - 1); // Month is 0-indexed
    selectedDate.setDate(1); // Set day to the first day of the month
    onChange(selectedDate);
  };

  const handleYearChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const selectedDate = new Date(value);
    selectedDate.setFullYear(event.target.value as number);
    selectedDate.setDate(1); // Set day to the first day of the month
    onChange(selectedDate);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Month</InputLabel>
          <Select value={value.getMonth() + 1} onChange={handleMonthChange}>
            {months.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel>Year</InputLabel>
          <Select value={value.getFullYear()} onChange={handleYearChange}>
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default MonthYearPicker;
