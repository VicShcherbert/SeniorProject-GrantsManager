import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

export const Report = () => {
  return (
    <Segment basic>
      <Header
        size='huge'
        textAlign='center'
        style={{ marginTop: '5px', marginBottom: '25px' }}
      >
        Reporting
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
        ADD STUFF HERE
      </Segment>
    </Segment>
  );
};
