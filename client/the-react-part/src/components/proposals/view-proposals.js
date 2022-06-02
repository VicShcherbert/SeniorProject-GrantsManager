/*
* View-proposals.js makes a get request to view all proposals within the Proposals table in the SQL database.
* The SQL query can be found in index.js within the 'server' directory of the application.
*
* There is a limit of 25 proposals per page, with six basic fields listed. The list is organized by in descending order
* of unique_id, which is an auto-incrementing value within the sql database.
*
* To view all details of a give proposal orto  make changes, user may select 'view' which calls the update modal.
*
* UpdateModal is called from update-modal.js to provide update and delete methods.
*/

import React, { useEffect, useState } from 'react';
import Axios from 'axios';  
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
  Pagination,
  Segment,
  Header,
} from 'semantic-ui-react';
import { UpdateModal } from '../modal/update-modal';

export const ViewProposals = () => {
  const [list, setList] = useState([]);
  const proposalsPerPage = 25;
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    Axios.get('http://localhost:3001/proposals').then((response) => {
      setList(response.data);
    });
  }, []);

  const changePage = (e, pageInfo) => {
    setCurrentPage(pageInfo.activePage - 1);
  };

  return (
    <Segment basic>
      <Header
        size='huge'
        textAlign='center'
        style={{ marginTop: '5px', marginBottom: '25px' }}
      >
        Proposals
      </Header>
      <Segment
        basic
        style={{
          maxWidth: '950px',
          margin: '0 auto',
        }}
      >
        <Pagination
          activePage={currentPage + 1}
          totalPages={Math.ceil(list.length / proposalsPerPage)}
          onPageChange={changePage}
        />
        <Table celled>
          <TableHeader>
            <TableRow>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>Proposal Number</TableHeaderCell>
              <TableHeaderCell>Title</TableHeaderCell>
              <TableHeaderCell>Agency</TableHeaderCell>
              <TableHeaderCell>Funding Type</TableHeaderCell>
              <TableHeaderCell>Investigator</TableHeaderCell>
              <TableHeaderCell></TableHeaderCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {list
              .slice(
                currentPage * proposalsPerPage,
                (currentPage * proposalsPerPage) + proposalsPerPage
              )
              .map((proposal, key) => {
                return (
                  <TableRow key={proposal.unique_id}>
                    <TableCell>{proposal.unique_id}</TableCell>
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
        <Pagination
          activePage={currentPage + 1}
          totalPages={Math.ceil(list.length / proposalsPerPage)}
          onPageChange={changePage}
        />
      </Segment>
    </Segment>
  );
};
