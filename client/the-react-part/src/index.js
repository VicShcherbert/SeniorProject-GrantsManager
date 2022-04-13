import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios'; //when adding something to the database
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
// import './index.css';
// import 'semantic-ui-css/semantic.min.css';
import './styles.css';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
// import {Button} from 'semantic-ui-react';

const App = () => {
  const [list, setList] = useState([]);
  const getProposals = () => {
    Axios.get('http://localhost:3001/proposals').then((response) => {
      setList(response.data); //becasue response contains 'data'
    });
  };

  return (
    <div>
      Hi
      <input type='text'></input>
      <button>Yo what up</button>
      <hr />
      <div>
        <Button variant="contained" onClick={getProposals}>Show Everyone</Button>
        <div>
          <Table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Proposal Number</th>
                <th>Agency</th>
                <th>Funding Type</th>
                <th>CFDA Number</th>
                <th>Investigator</th>
              </tr>
            </thead>
            <tbody>
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
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
