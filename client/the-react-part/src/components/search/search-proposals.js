import React, { useState } from "react";
import Axios from "axios";
import { Form } from "semantic-ui-react";
import "../../style.css";

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
  Button,
  Modal,
} from "semantic-ui-react";
import { UpdateModal } from "../modal/update-modal";

export const Search = () => {
  const [proposal_number, setPropNum] = useState("");
  const [title, setTitle] = useState("");
  const [investigator, setInvestigator] = useState("");
  const [department_name, setDeptName] = useState("");
  const [department_number, setDeptNum] = useState(0);

  const [list, setList] = useState([]);
  const [proposalsPerPage, setProposalsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);

  const search = () => {
    Axios.post("http://localhost:3001/search", {
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

  const changePage = (e, pageInfo) => {
    setCurrentPage(pageInfo.activePage);
  };

  return (
    <div>
      <h2 id="page-title">Search</h2>
      <Form>
        <div id="search-proposals">
          <div>
            <label>Proposal Number: </label>
            <input
              type="text"
              onChange={(event) => {
                setPropNum(event.target.value);
              }}
            />

            <label>Title: </label>
            <input
              type="text"
              onChange={(event) => {
                setTitle(event.target.value);
              }}
            />

            <label>Investigator: </label>
            <input
              type="text"
              onChange={(event) => {
                setInvestigator(event.target.value);
              }}
            />

            <label>Department Number: </label>
            <input
              type="number"
              onChange={(event) => {
                setDeptNum(event.target.value);
              }}
            />

            <label>Department Name: </label>
            <input
              type="text"
              onChange={(event) => {
                setDeptName(event.target.value);
              }}
            />

            <Form.Button onClick={search}> Search </Form.Button>
          </div>
        </div>
      </Form>
      <Segment basic style={{ maxWidth: "70%", margin: "auto" }}>
        <Header as="h1" textAlign="center">
          Proposals
        </Header>
        <Table celled>
          <TableHeader>
            <TableHeaderCell>Proposal Number</TableHeaderCell>
            <TableHeaderCell>Title</TableHeaderCell>
            <TableHeaderCell>Agency</TableHeaderCell>
            <TableHeaderCell>Funding Number</TableHeaderCell>
            {/* <TableHeaderCell>CFDA Number</TableHeaderCell> */}
            <TableHeaderCell>Investigator</TableHeaderCell>
            <TableHeaderCell></TableHeaderCell>
          </TableHeader>
          <TableBody>
            {list
              .map((proposal, key) => {
                return (
                  <TableRow>
                    <TableCell>{proposal.proposal_number}</TableCell>
                    <TableCell>{proposal.title}</TableCell>
                    <TableCell>{proposal.agency}</TableCell>
                    <TableCell>{proposal.funding_type}</TableCell>
                    {/* <TableCell>{proposal.cfda_number}</TableCell> */}
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
    </div>
  );
};
