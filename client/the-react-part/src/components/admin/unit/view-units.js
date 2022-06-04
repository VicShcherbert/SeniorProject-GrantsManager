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
  Segment
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
    <Segment basic style={{ marginTop: '30px', padding: '0px' }}>
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Unit</TableHeaderCell>
            <TableHeaderCell width='1'></TableHeaderCell>
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
    </Segment>
  );
};
