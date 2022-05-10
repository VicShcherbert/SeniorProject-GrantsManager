import React from 'react';
import { AddUser } from './add-user';
import { ViewUsers } from './view-users';
import {Segment, Header, Divider, Accordion} from 'semantic-ui-react';
import { AddPreAwardPOC } from './add-preaward-poc';
import { AddPostAwardPOC } from './add-postaward-poc';
import { ViewPreAwardPOCs } from './view-preaward-pocs';
import { ViewPostAwardPOCs } from './view-postaward-pocs';

export const Admin = () => {
  return (
    <Segment basic>
      {/* <Header id='page-title'>Users</Header> */}
      <ViewUsers />
      <AddUser />

      
      <Segment basic>
        <Divider horizontal>Pre Award POC</Divider>
      </Segment>
      <Accordion>
        <ViewPreAwardPOCs />
        <AddPreAwardPOC />
      </Accordion>
      <Segment basic>
        <Divider horizontal>Post Award POC</Divider>
      </Segment>
      <ViewPostAwardPOCs />
      <AddPostAwardPOC />
    </Segment>
  );
};
