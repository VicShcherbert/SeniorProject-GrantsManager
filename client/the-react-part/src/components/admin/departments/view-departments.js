/*
* View-departments.js makes a get request to view all departments within the Departments table in the SQL database.
* The SQL query can be found in index.js within the 'server' directory of the application.
*
* DepartmentModal is called from department-modal.js to provide update and delete methods.
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
} from 'semantic-ui-react';
import { DepartmentModal } from '../../modal/department-modal';

export const ViewDepartments = () => {
  const [departments, setList] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:3001/get_departments').then((response) => {
      setList(response.data);
    });
  }, []);

  return (
    <Segment basic style={{marginTop: '30px', padding: '0px'}}>
      <Table celled>
        <TableHeader>
          <Table.Row>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell width='1'></TableHeaderCell>
          </Table.Row>
        </TableHeader>
        <TableBody>
          {departments.map((department, key) => {
            return (
              <TableRow>
                <TableCell>{department.id}</TableCell>
                <TableCell>{department.name}</TableCell>
                <TableCell>
                  <DepartmentModal department={department} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Segment>
  );
};
