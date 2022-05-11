import React from 'react';
import { AddUser } from './add-user';
import { ViewUsers } from './view-users';
import {Segment, Header, Divider, Accordion} from 'semantic-ui-react';
import { AddPreAwardPOC } from './add-preaward-poc';
import { AddPostAwardPOC } from './add-postaward-poc';
import { ViewPreAwardPOCs } from './view-preaward-pocs';
import { ViewPostAwardPOCs } from './view-postaward-pocs';
import '../../style.css';

export const Admin = () => {
  return (
    <Segment basic>
      <Header textAlign='center' size='huge'>
        Admin Portal
      </Header>
      <Segment basic>
        <Divider horizontal>Users</Divider>
      </Segment>
      <ViewUsers />
      <AddUser />

      
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
