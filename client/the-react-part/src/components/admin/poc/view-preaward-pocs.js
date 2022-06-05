/*
* View-preaward-pocs.js makes a get request to view all pre award pocs within the Pre_Award_Poc table in the SQL database.
* The SQL query can be found in index.js within the 'server' directory of the application.
*
* PreAwardModal is called from pre-award-modal.js to provide update and delete methods.
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
  Segment,
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
    <Segment basic style={{ marginTop: '30px', padding: '0px' }}>
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell width='1'></TableHeaderCell>
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
    </Segment>
  );
};
