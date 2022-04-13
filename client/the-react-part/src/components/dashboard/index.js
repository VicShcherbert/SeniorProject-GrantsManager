import { React, useState } from 'react';
import Axios from 'axios'; //when adding something to the database
import { Box } from 'theme-ui';
import Button from '@mui/material/Button';
import { TableBody, TableCell, TableRow, Table, TableHead } from '@mui/material';

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
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Proposal Number</TableCell>
                <TableCell align='center'>Title</TableCell>
                <TableCell align='center'>Agency</TableCell>
                <TableCell align='center'>Funding Type</TableCell>
                <TableCell align='center'>CFDA Number</TableCell>
                <TableCell align='center'>Investigator</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list.map((proposal, key) => {
                return (
                  <TableRow key={proposal.proposal_number}>
                    <TableCell align='center'>
                      {proposal.proposal_number}
                    </TableCell>
                    <TableCell align='center'>{proposal.title}</TableCell>
                    <TableCell align='center'>{proposal.agency}</TableCell>
                    <TableCell align='center'>
                      {proposal.funding_type}
                    </TableCell>
                    <TableCell align='center'>{proposal.cfda_number}</TableCell>
                    <TableCell align='center'>
                      {proposal.investigator}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Box>
      </div>
    </Box>
  );
};
