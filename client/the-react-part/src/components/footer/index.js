import React from 'react';
import { Segment } from 'semantic-ui-react';

var d = new Date();
var fullYear = d.getFullYear();

export const Footer = () => (
  <Segment textAlign='center' inverted color='grey'>
    Office of Grants and Research Development | {fullYear}
  </Segment>
);
