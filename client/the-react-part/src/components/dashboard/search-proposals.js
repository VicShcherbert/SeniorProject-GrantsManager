import React, { useState } from 'react';
import { Form } from 'semantic-ui-react';
import Axios from 'axios';

export const Search = () => {
    const [searchTerm, searchQuery] = useState('');
  // const [proposal_number, searchPropNum] = useState('');
  // const [title, searchTitle] = useState('');
  // const [investigator, searchInvestigator] = useState('');
  // const [department_name, searchDeptName] = useState('');
  // const [department_number, searchDeptNumber] = useState('');

  const search = () => {
    Axios.get('http://localhost:3001/search', {
        // proposal_number: proposal_number,
        // title: title,
        // department_number: department_number,
        // department_name: department_name,
        // investigator: investigator,
        searchTerm: searchTerm,
    }).then(console.log('success'));
  };

  return (
    <div>
        <h2 id='page-title'>Search</h2>
        <Form>
        <div id='search-proposals'>
          <div>
            <label>Proposal Number: </label>
            <input
              type='text'
              onChange={(event) => {
                search(event.target.value);
              }}
            />

            <label>Title: </label>
            <input
              type='text'
              onChange={(event) => {
                search(event.target.value);
              }}
            />

            <label>Investigator: </label>
            <input
              type='text'
              onChange={(event) => {
                search(event.target.value);
              }}
            />

            <label>Department Number: </label>
            <input
              type='number'
              onChange={(event) => {
                search(event.target.value);
              }}
            />

            <label>Deparment Name: </label>
            <input
              type='text'
              onChange={(event) => {
                search(event.target.value);
              }}
            />

            <Form.Button onClick={search}> Search </Form.Button>
          </div>
        </div>
      </Form>
    </div>
  );
};