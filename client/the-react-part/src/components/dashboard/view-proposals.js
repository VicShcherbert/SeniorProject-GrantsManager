import React, { useEffect, useState } from 'react';
import Axios from 'axios'; //when adding something to the database
import {
  Button,
  Segment,
  Header,
  Table,
  Modal,
  Input,
  Form,
} from 'semantic-ui-react';
import { AddProposal } from './add-proposal';
import { UpdateModal } from '../modals/update-modal';

export const ViewProposals = () => {
  const [list, setList] = useState([]);
  const [open, setOpen] = useState(false);

  const getProposals = () => {
    Axios.get('http://localhost:3001/proposals').then((response) => {
      setList(response.data); //becasue response contains 'data'
    });
  };
  
  // useEffect(() => {
  //   Axios.get('http://localhost:3001/proposals').then((response) => {
  //     setList(response.data); //becasue response contains 'data'
  //   });
  // }, []);

  return (
    <Segment>
      <Header>Display all Proposals</Header>
      <Button onClick={getProposals}>Show Everyone</Button>
      <Segment basic>
        <Table>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Proposal Number</Table.HeaderCell>
              <Table.HeaderCell>Title</Table.HeaderCell>
              <Table.HeaderCell>Agency</Table.HeaderCell>
              <Table.HeaderCell>Details</Table.HeaderCell>
              {/* <Table.HeaderCell>Funding Type</Table.HeaderCell>
                <Table.HeaderCell>CFDA Number</Table.HeaderCell>
                <Table.HeaderCell>Investigator</Table.HeaderCell> */}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {list.map((proposal, key) => {
              // console.log(proposal);
              // console.log(key);

              return (
                <Table.Row>
                  <Table.Cell>{proposal.proposal_number}</Table.Cell>
                  <Table.Cell>{proposal.title}</Table.Cell>
                  <Table.Cell>{proposal.agency}</Table.Cell>
                  {/* <td>{proposal.funding_type}</td>
                  <td>{proposal.cfda_number}</td>
                  <td>{proposal.investigator}</td> */}
                  <Table.Cell>
                    <UpdateModal proposal={proposal} />
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </Segment>
    </Segment>
  );
};
