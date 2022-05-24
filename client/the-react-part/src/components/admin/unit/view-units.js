import React, { useEffect, useState } from 'react';
import Axios from 'axios'; //when adding something to the database
import {
  Icon,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from 'semantic-ui-react';

export const ViewUnits = () => {
  const [unit, setList] = useState([]);
  
  useEffect(() => {
    Axios.get('http://localhost:3001/get_units').then((response) => {
      setList(response.data);
    });
  }, []);

  return (
    <div className='unit-table'>
      <Table celled>
        <TableHeader>
          <TableHeaderCell>Unit</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {unit.map((unit, key) => {
            return (
              <TableRow>
                <TableCell>{unit.name}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};