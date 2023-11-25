import * as React from 'react';
import * as Mui from '@mui/material';

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function SampleTable() {
  return (
    <Mui.TableContainer component={Mui.Paper}>
      <Mui.Table sx={{ minWidth: 650 }} aria-label="simple table">
        <Mui.TableHead>
          <Mui.TableRow>
            <Mui.TableCell>Dessert (100g serving)</Mui.TableCell>
            <Mui.TableCell align="right">Calories</Mui.TableCell>
            <Mui.TableCell align="right">Fat&nbsp;(g)</Mui.TableCell>
            <Mui.TableCell align="right">Carbs&nbsp;(g)</Mui.TableCell>
            <Mui.TableCell align="right">Protein&nbsp;(g)</Mui.TableCell>
          </Mui.TableRow>
        </Mui.TableHead>
        <Mui.TableBody>
          {rows.map((row) => (
            <Mui.TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <Mui.TableCell component="th" scope="row">
                {row.name}
              </Mui.TableCell>
              <Mui.TableCell align="right">{row.calories}</Mui.TableCell>
              <Mui.TableCell align="right">{row.fat}</Mui.TableCell>
              <Mui.TableCell align="right">{row.carbs}</Mui.TableCell>
              <Mui.TableCell align="right">{row.protein}</Mui.TableCell>
            </Mui.TableRow>
          ))}
        </Mui.TableBody>
      </Mui.Table>
    </Mui.TableContainer>
  );
}