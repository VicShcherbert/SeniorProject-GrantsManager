/*
* Admin.js provides order and layout of admin tab. Table formatting takes place in respective files
* (e.g. view-users.js, add-user.js, etc) and the style.css file.
*/

import React from 'react';
import { AddUser } from './users/add-user';
import { ViewUsers } from './users/view-users';
import { Segment, Header, Divider } from 'semantic-ui-react';
import { AddPreAwardPOC } from './poc/add-preaward-poc';
import { AddPostAwardPOC } from './poc/add-postaward-poc';
import { ViewPreAwardPOCs } from './poc/view-preaward-pocs';
import { ViewPostAwardPOCs } from './poc/view-postaward-pocs';
import { ViewDepartments } from './departments/view-departments';
import { AddDepartment } from './departments/add-department';
import { ViewUnits } from './unit/view-units';
import { AddUnit } from './unit/add-unit';
import '../../style.css';

export const Admin = () => {
  return (
    <Segment basic>
      <Header
        textAlign='center'
        size='huge'
        style={{ marginTop: '5px', marginBottom: '15px' }}
      >
        Admin Portal
      </Header>
      <Segment
        basic
        style={{
          padding: '0px',
          justifyContent: 'space-evenly',
          maxWidth: '700px',
          margin: '0 auto',
        }}
      >
        <Segment basic style={{ marginBottom: '0px' }}>
          <Divider horizontal>Users</Divider>
          <ViewUsers />
          <AddUser />
        </Segment>

        <Segment basic style={{ marginTop: '0px', marginBottom: '0px' }}>
          <Divider horizontal>Departments</Divider>
          <ViewDepartments />
          <AddDepartment />
        </Segment>

        <Segment basic style={{ marginTop: '0px', marginBottom: '0px' }}>
          <Divider horizontal>Pre Award POC</Divider>
          <ViewPreAwardPOCs />
          <AddPreAwardPOC />
        </Segment>

        <Segment basic style={{ marginTop: '0px', marginBottom: '0px' }}>
          <Divider horizontal>Post Award POC</Divider>
          <ViewPostAwardPOCs />
          <AddPostAwardPOC />
        </Segment>

        <Segment basic style={{ marginTop: '0px', marginBottom: '0px' }}>
          <Divider horizontal>Units</Divider>
          <ViewUnits />
          <AddUnit />
        </Segment>
      </Segment>
    </Segment>
  );
};
