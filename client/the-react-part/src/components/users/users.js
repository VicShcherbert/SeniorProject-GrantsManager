import React from 'react';
import { AddUser } from './add-user';
import { ViewUsers } from './view-users';
import { Segment, Header } from 'semantic-ui-react';

export const Users = () => {
  return (
    <Segment basic>
      <Header
        size='huge'
        textAlign='center'
        style={{ marginTop: '5px', marginBottom: '25px' }}
      >
        Users
      </Header>
      <Segment
        basic
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        <ViewUsers />
        <AddUser />
      </Segment>
    </Segment>
  );
};
