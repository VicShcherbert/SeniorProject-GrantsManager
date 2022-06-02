/*
* Footer.js provides official title of grants office and current year to be added to the bottom of each page
*/

import React from 'react';
import { Segment } from 'semantic-ui-react';

var d = new Date();
var fullYear = d.getFullYear();

export const Footer = () => (
  <div class = 'footer'>
    <Segment textAlign='center' inverted color='grey'>Office of Grants and Research Development | {fullYear}</Segment>
  </div>

);
