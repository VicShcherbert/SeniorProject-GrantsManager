import React from 'react';
import {Reports} from './view-reports';
import {Segment, Header} from 'semantic-ui-react';

export const Report = () => {
  return (
    <Segment basic>
      <Header id='page-title'>Reporting</Header>
      <Reports />
    </Segment>
  );
};
