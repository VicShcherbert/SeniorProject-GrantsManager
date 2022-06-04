import React, { useEffect, useState } from 'react';
import Axios from 'axios'; //when adding something to the database
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Segment
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
    <Segment basic style={{ marginTop: '30px', padding: '0px' }}>
      <Table celled>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell width='1'></TableHeaderCell>
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
    </Segment>
  );
};
