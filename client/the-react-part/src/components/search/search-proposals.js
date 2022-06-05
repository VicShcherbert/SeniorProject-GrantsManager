/*
* Search-proposals.js provides search functions based on proposal number, proposal title, and any combination of
* investigator, department name, or department number.
*
* Query logic can be found in index.js file inside 'server' directory
* 
* NOTE: this search works by querying the database each time a request is made. A more efficient search could be built
* by loading the entire proposal set once, then filtering results based on user input.
*
* NOTE: In this search, proposal number and title take precedence over department name, number, or investigator.
* The last three can be used in combination to filer results (i.e. all proposals from the "chemistry" dept. with a 
* given investigator)
*
* NOTE: Proposal number and title must be exact matches, however other fields may be partially entered. For example, if
* user submits 'chem' or 'hemistr' into the department field, all proposals under the 'Chemistry' department will be returned.
*/

import React, { useState } from 'react';
import Axios from 'axios';
import { Form } from 'semantic-ui-react';
import '../../style.css';

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Segment,
  Header,
  Input,
  Dimmer,
  Loader,
} from 'semantic-ui-react';
import { UpdateModal } from '../modal/update-modal';

export const Search = () => {
  const [proposal_number, setPropNum] = useState('');
  const [title, setTitle] = useState('');
  const [investigator, setInvestigator] = useState('');
  const [department_name, setDeptName] = useState('');
  const [department_number, setDeptNum] = useState(0);
  const [list, setList] = useState([]);

  const search = () => {
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
    <Segment basic>
      <Header
        textAlign='center'
        size='huge'
        style={{ marginTop: '5px', marginBottom: '15px' }}
      >
        Search
      </Header>
      <Segment
        basic
        style={{
          justifyContent: 'space-evenly',
          maxWidth: '700px',
          margin: '0 auto',
        }}
      >
        <Form>
          <Form.Field>
            <Header>Proposal Number:</Header>
            <Input
              placeholder='Proposal Number'
              type='text'
              onChange={(event) => {
                setPropNum(event.target.value);
              }}
            />
          </Form.Field>
          <Form.Field>
            <Header>Title:</Header>
            <Input
              placeholder='Title'
              type='text'
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />
          </Form.Field>
          <Form.Field>
            <Header>Investigator:</Header>
            <Input
              placeholder='Investigator'
              type='text'
              onChange={(event) => {
                setInvestigator(event.target.value);
              }}
            />
          </Form.Field>
          <Form.Field>
            <Header>Department Number:</Header>
            <Input
              placeholder='Department Number'
              type='number'
              onChange={(event) => {
                setDeptNum(event.target.value);
              }}
            />
          </Form.Field>
          <Form.Field>
            <Header>Department Name:</Header>
            <Input
              placeholder='Department Name'
              type='text'
              onChange={(event) => {
                setDeptName(event.target.value);
              }}
            />
          </Form.Field>

          <Form.Button onClick={search}>Search</Form.Button>
        </Form>

        {list.length > 0 ? (
          <Segment basic>
            <Table celled>
              <TableHeader>
                <TableRow>
                  <TableHeaderCell>Proposal Number</TableHeaderCell>
                  <TableHeaderCell>Title</TableHeaderCell>
                  <TableHeaderCell>Agency</TableHeaderCell>
                  <TableHeaderCell>Funding Number</TableHeaderCell>
                  <TableHeaderCell>Investigator</TableHeaderCell>
                  <TableHeaderCell></TableHeaderCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {list.map((proposal, key) => {
                  return (
                    <TableRow>
                      <TableCell>{proposal.proposal_number}</TableCell>
                      <TableCell>{proposal.title}</TableCell>
                      <TableCell>{proposal.agency}</TableCell>
                      <TableCell>{proposal.funding_type}</TableCell>
                      <TableCell>{proposal.investigator}</TableCell>
                      <TableCell>
                        <UpdateModal proposal={proposal} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Segment>
        ) : (
          <Segment basic>
            {proposal_number ||
            title ||
            investigator ||
            department_number ||
            department_name ? (
              <Dimmer active inverted>
                <Loader />
              </Dimmer>
            ) : null}
          </Segment>
        )}
      </Segment>
    </Segment>
  );
};
