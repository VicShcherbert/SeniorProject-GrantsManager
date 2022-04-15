import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import Axios from 'axios'; //when adding something to the database
import './style.css';
import { AddDepartment } from './components/dashboard/add-department';
import {ViewProposals} from './components/dashboard/view-proposals';
import { AddProposal } from './components/dashboard/add-proposal';
// import {Button} from 'semantic-ui-react';

//Yo what up
const App = () => {
  return (
    <div>
      <ViewProposals />
      <AddProposal />
      <AddDepartment />
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
