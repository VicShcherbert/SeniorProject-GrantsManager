import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { 
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow
 } from 'semantic-ui-react';

export const Reports = () => {
    // get results for CPP
    const [cppQuery, setCpp] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/get_cpp').then((response) => {
            setCpp(response.data);
        });
    }, []);

    return (
        <div className='cpp-table'>
            <Table striped>
                <TableHeader>
                    <TableRow>
                        <TableHeaderCell>Grant Type</TableHeaderCell>
                        <TableHeaderCell>Proposal Number</TableHeaderCell>
                        <TableHeaderCell>Title</TableHeaderCell>
                        <TableHeaderCell>Agency</TableHeaderCell>
                        <TableHeaderCell>Funding Type</TableHeaderCell>
                        <TableHeaderCell>Project Director</TableHeaderCell>
                        <TableHeaderCell>Dept</TableHeaderCell>
                        <TableHeaderCell>Amount Requested</TableHeaderCell>
                        <TableHeaderCell>Date Submitted</TableHeaderCell>
                        <TableHeaderCell>Status</TableHeaderCell>
                        <TableHeaderCell>Notice of Funding</TableHeaderCell>
                        <TableHeaderCell>Award Amount</TableHeaderCell>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {cppQuery.map((row, key) => {
                        return (
                            <TableRow>
                                <TableCell>{row.grant_type}</TableCell>
                                <TableCell>{row.proposal_number}</TableCell>
                                <TableCell>{row.title}</TableCell>
                                <TableCell>{row.agency}</TableCell>
                                <TableCell>{row.funding_type}</TableCell>
                                <TableCell>{row.investigator}</TableCell>
                                <TableCell>{row.department_name}</TableCell>
                                <TableCell>{row.amount_requested}</TableCell>
                                <TableCell>{row.date_submitted}</TableCell>
                                <TableCell>{row.pre_award_status}</TableCell>
                                <TableCell>{row.date_of_notice}</TableCell>
                                <TableCell>{row.amount_funded}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
}
