import { React, useState } from 'react';
import Axios from 'axios'; //when adding something to the database
import { Box } from 'theme-ui';
// import Button from '@mui/material/Button';
import { Button, Table } from 'semantic-ui-react';


export const ViewAllProposals = () => {
  const [list, setList] = useState([]);
  const getProposals = () => {
    Axios.get('http://localhost:3001/proposals').then((response) => {
      setList(response.data); //becasue response contains 'data'
    });
  };

  return (
    <Box>
      <Box
        sx={{
          mt: '30px',
          mb: '30px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Button variant='contained' onClick={getProposals}>
          View All Proposals
        </Button>
      </Box>
      <div>
        <Box>
          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell align='center'>Proposal Number</Table.HeaderCell>
                <Table.HeaderCell align='center'>Title</Table.HeaderCell>
                <Table.HeaderCell align='center'>Agency</Table.HeaderCell>
                <Table.HeaderCell align='center'>Funding Type</Table.HeaderCell>
                <Table.HeaderCell align='center'>CFDA Number</Table.HeaderCell>
                <Table.HeaderCell align='center'>Investigator</Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {list.map((proposal, key) => {
                return (
                  <Table.Row key={proposal.proposal_number}>
                    <Table.Cell align='center'>
                      {proposal.proposal_number}
                    </Table.Cell>
                    <Table.Cell align='center'>{proposal.title}</Table.Cell>
                    <Table.Cell align='center'>{proposal.agency}</Table.Cell>
                    <Table.Cell align='center'>
                      {proposal.funding_type}
                    </Table.Cell>
                    <Table.Cell align='center'>{proposal.cfda_number}</Table.Cell>
                    <Table.Cell align='center'>
                      {proposal.investigator}
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
        </Box>
      </div>
    </Box>
  );
};
