import React, { useEffect, useState } from 'react';
import Axios from 'axios'; //when adding something to the database
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from 'semantic-ui-react';
import { PreAwardModal } from '../../modal/pre-award-modal';

export const ViewPreAwardPOCs = () => {
  const [pre_award_poc, setList] = useState([]);
  
  useEffect(() => {
    Axios.get('http://localhost:3001/get_pre_award_POCs').then((response) => {
      setList(response.data);
    });
  }, []);

  return (
    <div className='pre-award-poc-table'>
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pre_award_poc.map((pre_award_poc, key) => {
            return (
              <TableRow>
                <TableCell>{pre_award_poc.name}</TableCell>
                <TableCell>
                    <PreAwardModal poc={pre_award_poc} />
                </TableCell>
              </TableRow>
              
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};