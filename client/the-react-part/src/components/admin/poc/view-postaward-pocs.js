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

export const ViewPostAwardPOCs = () => {
  const [post_award_poc, setList] = useState([]);
  
  useEffect(() => {
    Axios.get('http://localhost:3001/get_post_award_POCs').then((response) => {
      setList(response.data);
    });
  }, []);

  return (
    <div className='post-award-poc-table'>
        <h3 id='add-poc-header'>Post Award POCs</h3>
      <Table celled>
        <TableHeader>
          <TableHeaderCell>Name</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {post_award_poc.map((post_award_poc, key) => {
            return (
              <TableRow>
                <TableCell>{post_award_poc.name}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};