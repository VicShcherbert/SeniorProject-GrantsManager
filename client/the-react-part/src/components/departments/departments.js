import React from 'react';
import { AddDepartment } from './add-department';
import { ViewDepartments } from './view-departments';
import {Segment, Header} from 'semantic-ui-react';

export const Departments = () => {
  return (
    <Segment basic>
      <Header id='page-title'>Departments</Header>
      <ViewDepartments />
      <AddDepartment />
    </Segment>
  );
};
