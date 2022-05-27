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
import { UserModal } from '../../modal/user-modal';

export const ViewUsers = () => {
  const [users, setList] = useState([]);
  
  useEffect(() => {
    Axios.get('http://localhost:3001/get_users').then((response) => {
      setList(response.data);
    });
  }, []);

  const getUserAccess = (id) => {
      if(id == 1){
        return(
            <Icon name='check circle' size='small' color='grey'/>
        )
      }
  }

  return (
    <div className='users-table'>
      <Table celled>
        <TableHeader>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Administrator</TableHeaderCell>
          <TableHeaderCell></TableHeaderCell>
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
    </div>
  );
};