import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
// import 'semantic-ui-css/semantic.min.css';
// import './styles.css';
// import {Button} from 'semantic-ui-react';
import { ViewAllProposals } from './components/dashboard';
import { Title } from './components/title';
import { Box } from 'theme-ui';

const App = () => {
  return (
    <Box>
      <Title />
      <ViewAllProposals />
    </Box>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
// ReactDOM.render(<App />, document.getElementById('root'));

{
  /* <thead>
  <tr>
    <th>Title</th>
    <th>Proposal Number</th>
    <th>Agency</th>
    <th>Funding Type</th>
    <th>CFDA Number</th>
    <th>Investigator</th>
  </tr>
</thead> */
}
{
  /* <tbody>
  {list.map((proposal, key) => {
    return (
      <tr>
        <td>{proposal.proposal_number}</td>
        <td>{proposal.title}</td>
        <td>{proposal.agency}</td>
        <td>{proposal.funding_type}</td>
        <td>{proposal.cfda_number}</td>
        <td>{proposal.investigator}</td>
      </tr>
    );
  })}
</tbody> */
}
