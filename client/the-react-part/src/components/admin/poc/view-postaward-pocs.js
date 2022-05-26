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
import { PostAwardModal } from '../../modal/post-award-modal';

export const ViewPostAwardPOCs = () => {
  const [post_award_poc, setList] = useState([]);
  
  useEffect(() => {
    Axios.get('http://localhost:3001/get_post_award_POCs').then((response) => {
      setList(response.data);
    });
  }, []);

  return (
    <div className='post-award-poc-table'>
      <Table celled>
        <TableHeader>
        <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
        </TableRow>
        </TableHeader>
        <TableBody>
          {post_award_poc.map((post_award_poc, key) => {
            return (
              <TableRow>
                <TableCell>{post_award_poc.name}</TableCell>
                <TableCell>
                    <PostAwardModal poc={post_award_poc} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};