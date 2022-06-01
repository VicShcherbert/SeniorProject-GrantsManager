import React, { useEffect, useState } from 'react';
import Axios from 'axios'; //when adding something to the database
import {
  Header,
  Segment,
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
      <div className='departments-table'>
      <Table celled>
        <TableHeader>
          <Table.Row>
            <TableHeaderCell>ID</TableHeaderCell>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell width = "1"></TableHeaderCell>
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
      </div>
  );
};