/*
* View-units.js makes a get request to view all units within the Units table in the SQL database.
* The SQL query can be found in index.js within the 'server' directory of the application.
*
* UnitModal is called from unit-modal.js to provide update and delete methods.
*/

import React, { useEffect, useState } from 'react';
import Axios from 'axios';  
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from 'semantic-ui-react';
import { UnitModal } from '../../modal/unit-modal';

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
        <TableRow>
            <TableHeaderCell>Unit</TableHeaderCell>
            <TableHeaderCell width = "1"></TableHeaderCell>
        </TableRow>
        </TableHeader>
        <TableBody>
          {unit.map((unit, key) => {
            return (
              <TableRow>
                <TableCell>{unit.name}</TableCell>
                <TableCell>
                    <UnitModal unit={unit} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};