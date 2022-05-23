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

export const ViewPreAwardPOCs = () => {
  const [pre_award_poc, setList] = useState([]);
  
  useEffect(() => {
    Axios.get('http://localhost:3001/get_pre_award_POCs').then((response) => {
      setList(response.data);
    });
  }, []);

  return (
    <div className='pre-award-poc-table'>
    <h3 id='add-poc-header'>Pre Award POCs</h3>
      <Table celled>
        <TableHeader>
          <TableHeaderCell>Name</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {pre_award_poc.map((pre_award_poc, key) => {
            return (
              <TableRow>
                <TableCell>{pre_award_poc.name}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};