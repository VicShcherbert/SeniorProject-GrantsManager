import React from 'react';
import { AddUser } from './add-user';
import { ViewUsers } from './view-users';
import {Segment, Header} from 'semantic-ui-react';

export const Users = () => {
  return (
    <Segment basic>
      <Header id='page-title'>Users</Header>
      <ViewUsers />
      <AddUser />
    </Segment>
  );
};
