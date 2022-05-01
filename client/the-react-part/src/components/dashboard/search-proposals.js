import React, { useState } from 'react';
import Axios from 'axios';
import { Form } from 'semantic-ui-react';
import '../../style.css';

export const Search = () => {
  const [proposal_number, setPropNum] = useState('');
  const [title, setTitle] = useState('');
  const [investigator, setInvestigator] = useState('');
  const [department_name, setDeptName] = useState('');
  const [department_number, setDeptNum] = useState(0);

  const [list, setList] = useState([]);
  const [proposalsPerPage, setProposalsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);

  // useEffect(() => {
  //   Axios.get('http://localhost:3001/search').then((response) => {
  //     setList(response.data); //becasue response contains 'data'
  //   });
  // });

  const search = () => {
    console.log(proposal_number);
    Axios.post('http://localhost:3001/search', {
        proposal_number: proposal_number,
        title: title,
        department_number: department_number,
        department_name: department_name,
        investigator: investigator,
    }).then((response) => {
      console.log(response.data);
      setList(response.data); //because response contains 'data'
    });
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
                setPropNum(event.target.value);
              }}
            />

            <label>Title: </label>
            <input
              type='text'
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />

            <label>Investigator: </label>
            <input
              type='text'
              onChange={(event) => {
                setInvestigator(event.target.value);
              }}
            />

            <label>Department Number: </label>
            <input
              type='number'
              onChange={(event) => {
                setDeptNum(event.target.value);
              }}
            />

            <label>Department Name: </label>
            <input
              type='text'
              onChange={(event) => {
                setDeptName(event.target.value);
              }}
            />

            <Form.Button onClick={search}> Search </Form.Button>
          </div>
        </div>
      </Form>
    </div>
  );
};