// import logo from './logo.svg';
import { useState } from 'react';
import './App.css';
import Axios from 'axios'; //when adding something to the database
// import 'semantic-ui-css/semantic.min.css';
// import {Button} from 'semantic-ui-react';

function App() {
  const [list, setList] = useState([]);
  const getProposals = () => {
    Axios.get('http://localhost:3001/proposals').then((response) => {
      setList(response.data); //becasue response contains 'data'
    });
  };

  return (
    <div >
      Hi
      <input type='text'></input>
      <button>Yo what up</button>
      <hr />
      <div>
        <button onClick={getProposals}>Show Everyone</button>
        <div>
          <table>
            <tr>
              <th>Title</th>
              <th>Proposal Number</th>
              <th>Agency</th>
              <th>Funding Type</th>
              <th>CFDA Number</th>
              <th>Investigator</th>
            </tr>
            {list.map((val, key) => {
              return (
                <tr>
                  <td>{val.proposal_number}</td>
                  <td>{val.title}</td>
                  <td>{val.agency}</td>
                  <td>{val.funding_type}</td>
                  <td>{val.cfda_number}</td>
                  <td>{val.investigator}</td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
