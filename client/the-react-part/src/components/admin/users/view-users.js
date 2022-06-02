/*
* View-users.js makes a get request to view all users within the Users table in the SQL database.
* The SQL query can be found in index.js within the 'server' directory of the application.
*
* UserModal is called from user-modal.js to provide update and delete methods.
*/

import React, { useEffect, useState } from 'react';
import Axios from 'axios';  
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
          <TableHeaderCell width = "1"></TableHeaderCell>
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