import React from 'react';
import { AddUser } from './users/add-user';
import { ViewUsers } from './users/view-users';
import {Segment, Header, Divider, Accordion} from 'semantic-ui-react';
import { AddPreAwardPOC } from './poc/add-preaward-poc';
import { AddPostAwardPOC } from './poc/add-postaward-poc';
import { ViewPreAwardPOCs } from './poc/view-preaward-pocs';
import { ViewPostAwardPOCs } from './poc/view-postaward-pocs';
import { ViewDepartments } from './departments/view-departments';
import { AddDepartment } from './departments/add-department';
import '../../style.css';

export const Admin = () => {
  return (
    <Segment basic style={{ justifyContent: 'space-evenly', maxWidth: '900px', margin: "0 auto" }}>
      <Header textAlign='center' size='huge'>
        Admin Portal
      </Header>
      <Segment basic>
        <Divider horizontal>Users</Divider>
      </Segment>
      <ViewUsers />
      <AddUser />

      <Segment basic>
        <Divider horizontal>Departments</Divider>
      </Segment>
      <ViewDepartments />
      <AddDepartment />
      
      <Segment basic>
        <Divider horizontal>Pre Award POC</Divider>
      </Segment>
        <br/>
        <ViewPreAwardPOCs />
        <br/>
        <AddPreAwardPOC />
      <Segment basic>
        <Divider horizontal>Post Award POC</Divider>
      </Segment>
        <br/>
        <ViewPostAwardPOCs />
        <br/>
        <AddPostAwardPOC />
      </Segment>
  );
};
