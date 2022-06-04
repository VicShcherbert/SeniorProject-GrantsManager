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
  Segment,
} from 'semantic-ui-react';
import { UserModal } from '../../modal/user-modal';

export const ViewUsers = () => {
  const [users, setList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/get_users').then((response) => {
      setList(response.data);
    });
  }, []);

  const getUserAccess = (id) => {
    if (id == 1) {
      return (
        <Segment
          basic
          style={{
            margin: '0px',
            padding: '0px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Icon name='check circle' size='small' color='grey' />
        </Segment>
      );
    }
  };

  return (
    <Segment basic style={{ marginTop: '30px', padding: '0px' }}>
      <Table celled>
        <TableHeader>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell style={{textAlign: 'center'}}>Administrator</TableHeaderCell>
          <TableHeaderCell width='1'></TableHeaderCell>
        </TableHeader>
        <TableBody>
          {users.map((user, key) => {
            return (
              <TableRow>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{getUserAccess(user.id)}</TableCell>
                <TableCell>
                  <UserModal user={user} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Segment>
  );
};
