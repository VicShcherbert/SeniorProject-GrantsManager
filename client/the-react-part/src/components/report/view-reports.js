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
    // get reports, units using Axios
    const [getReport, setReport] = useState([]);
    const [getUnits, setUnits] = useState([]);
    const [getAmounts, setAmounts] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:3001/get_report').then((response) => {
            setReport(response.data);
        });
    }, []);

    useEffect(() => {
        Axios.get('http://localhost:3001/get_units').then((response) => {
            setUnits(response.data);
        });
    }, []);

    useEffect(() => {
        Axios.post('http://localhost:3001/get_amounts', {
            unit: 'CHSPH',
            grant_type: 'G - Grant'
        }).then((response) => {
            setAmounts(response.data);
        });
    }, []);
    

    // For each unit, have a bold row at top of page declaring Unit and number of awards for that unit

    // For each unit type:
    //      New Table
    //      For each grant type:
    //          For each row:
    //              Display row
    //          Display Amount Requested, Award Amount for that grant type

    return (
        <div className='reports-table'>
            {getAmounts.map((row)=>{return(<p>Requested = {row.req}, Funded = {row.funded}</p>)})}
            <Table striped>
                <TableHeader>
                    <TableRow><TableHeaderCell colSpan='13' textAlign='center'>Unit - Awards (where unit == actual unit and awards is how many grants were awarded)</TableHeaderCell></TableRow>
                    <TableRow>
                        <TableHeaderCell>Unit</TableHeaderCell>
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
                    {getReport.map((row) => {
                        return (
                            <TableRow>
                                <TableCell>{row.unit}</TableCell>
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
