import React from 'react';
import { AddDepartment } from './add-department';
import { ViewDepartments } from './view-departments';
import { Segment, Header } from 'semantic-ui-react';

export const Departments = () => {
  return (
    <Segment basic>
      <Header
        size='huge'
        textAlign='center'
        style={{ marginTop: '5px', marginBottom: '15px' }}
      >
        Departments
      </Header>
      <Segment basic style={{ display: 'flex', justifyContent: 'space-evenly', maxWidth: '1000px', margin: "0 auto" }}>
        <ViewDepartments />
        <AddDepartment />
      </Segment>
    </Segment>
  );
};