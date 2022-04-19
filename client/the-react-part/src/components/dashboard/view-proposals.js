import React, { useEffect, useState } from 'react';
import Axios from 'axios'; //when adding something to the database
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow, Pagination } from 'semantic-ui-react';

export const ViewProposals = () => {
  const [list, setList] = useState([]);
  const [proposalsPerPage, setProposalsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    Axios.get('http://localhost:3001/proposals').then((response) => {
      setList(response.data); //becasue response contains 'data'
    });
  });

  const changePage = ((e, pageInfo) => {
    setCurrentPage(pageInfo.activePage);
  });

  return (
    <div className='proposals-table'>
      <h2 id='page-title'>
        Proposals
      </h2>
      <Pagination activePage={currentPage} totalPages={Math.ceil(list.length / proposalsPerPage)} onPageChange={changePage}/>
      <Table celled>
        <TableHeader>
          <TableHeaderCell>Title</TableHeaderCell>
          <TableHeaderCell>Proposal Number</TableHeaderCell>
          <TableHeaderCell>Agency</TableHeaderCell>
          <TableHeaderCell>Funding Number</TableHeaderCell>
          <TableHeaderCell>CFDA Number</TableHeaderCell>
          <TableHeaderCell>Investigator</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {list.slice((currentPage*proposalsPerPage - 1), (currentPage*proposalsPerPage + (proposalsPerPage + 1))).map((proposal, key) => {
            return (
              <TableRow>
                  <TableCell>{proposal.proposal_number}</TableCell>
                  <TableCell>{proposal.title}</TableCell>
                  <TableCell>{proposal.agency}</TableCell>
                  <TableCell>{proposal.funding_type}</TableCell>
                  <TableCell>{proposal.cfda_number}</TableCell>
                  <TableCell>{proposal.investigator}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Pagination defaultActivePage={1} totalPages={Math.ceil(list.length / proposalsPerPage)} />
    </div>
  );
};
