import React, { useState } from 'react';
import Axios from 'axios';
import { 
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow,
    Form,
    Segment,
    Input,
    Header
 } from 'semantic-ui-react';
 // import '../../style.css';

export const Reports = () => {
    const [getReport, setReport] = useState([]);
    const [getUnits, setUnits] = useState([]);
   
    // get start, end dates for proposal
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const [unitTotals, setUnitTotals] = useState([]);
    const [gtTotals, setGtTotals] = useState([]);

    var colors = ["red", "black"];

    // Find all information between given start/end dates
    function setInfo(){
        Axios.post('http://localhost:3001/get_units', {
            startDate: startDate,
            endDate: endDate
        }).then((response) => {
            setUnits(response.data);
        });

        Axios.post('http://localhost:3001/get_gt_totals', {
            startDate: startDate,
            endDate: endDate
        }).then((response) => {
            setGtTotals(response.data);
        })

        Axios.post('http://localhost:3001/get_unit_totals', {
            startDate: startDate,
            endDate: endDate
        }).then((response) => {
            setUnitTotals(response.data);
        })

        Axios.post('http://localhost:3001/get_report', {
            startDate: startDate,
            endDate: endDate
        }).then((response) => {
            setReport(response.data);
        });

    } // end setInfo 

    // For each unit, have a bold row at top of page declaring Unit and number of awards for that unit

    // For each unit type:
    //      New Table
    //      For each grant type:
    //          For each row:
    //              Display row
    //          Display Amount Requested, Award Amount for that grant type

    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 2, // (causes 2500.99 to be printed as $2,501)
      });

    return (
        <Segment basic>
            <Segment basic
            style={{
                justifyContent: 'space-evenly',
                width: '175px',
                margin: '0 auto'
            }}>
                <Form>
                    <Form.Field>
                        <Form.Field>
                            <label>Start Date:</label>
                            <Input
                                placeholder='Start Date'
                                value={startDate}
                                name='startDate'
                                type='date'
                                onChange={(_, { value }) => setStartDate(value)}
                            />
                        </Form.Field>
                        <Form.Field>
                            <label>End Date:</label>
                            <Input
                                placeholder='End Date'
                                value={endDate}
                                name='endDate'
                                type='date'
                                onChange={(_, { value }) => setEndDate(value)}
                            />
                        </Form.Field>
                    </Form.Field>
                    <Form.Button onClick={setInfo} width="16">Generate Report</Form.Button>
                </Form>
            </Segment>
            {getReport.length > 0 ? (
            <Segment basic>
                {getUnits.map((row1, index) => {
                    var unittotals = unitTotals.filter(function(row){
                        return row.unit == row1.unit;
                    })
                    return(
                    <Table striped color={colors[index%2]} key={colors[index%2]}>
                        <TableHeader>
                            <TableRow style={{fontSize: 'large'}}><TableHeaderCell colSpan='12' textAlign='center'>{row1.unit} - {row1.numawards} Awards</TableHeaderCell></TableRow>
                            <TableRow>
                                <TableHeaderCell>Grant Type</TableHeaderCell>
                                <TableHeaderCell>Proposal Number</TableHeaderCell>
                                <TableHeaderCell>Title</TableHeaderCell>
                                <TableHeaderCell>Agency</TableHeaderCell>
                                <TableHeaderCell>Funding Type</TableHeaderCell>
                                <TableHeaderCell>Project Director</TableHeaderCell>
                                <TableHeaderCell>Dept</TableHeaderCell>
                                <TableHeaderCell>Amount Requested</TableHeaderCell>
                                <TableHeaderCell width="two">Date Submitted</TableHeaderCell>
                                <TableHeaderCell>Status</TableHeaderCell>
                                <TableHeaderCell width="two">Notice of Funding</TableHeaderCell>
                                <TableHeaderCell>Award Amount</TableHeaderCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {getReport.map((row, index) => {
                                if(row.unit != row1.unit) return;
                                var thisgt = getReport[index].grant_type;
                                var nextgt = thisgt;
                                var nextunit = getReport[index].unit;

                                if(index < getReport.length-1){
                                    nextgt = getReport[index+1].grant_type;
                                    nextunit = getReport[index+1].unit;
                                }
                                else{
                                    nextunit = "EOF";
                                }

                                // case: different grant_type, or unit changes, or table is ending
                                if(thisgt != nextgt || row.unit != nextunit || nextunit == "EOF"){
                                    var gttotals = gtTotals.filter(function(row){
                                        return row.unit == row1.unit && row.grant_type == thisgt;
                                    })
                                    if(gttotals.length == 0){
                                        console.log("Pair not found: " + row1.unit + "  " + thisgt);
                                        return(<TableRow><TableCell colSpan="100%">Error Row: {row1.unit} {thisgt}</TableCell></TableRow>)
                                    }
                                    else return (
                                        <><TableRow>
                                            <TableCell>{row.grant_type}</TableCell>
                                            <TableCell>{row.proposal_number}</TableCell>
                                            <TableCell>{row.title}</TableCell>
                                            <TableCell>{row.agency}</TableCell>
                                            <TableCell>{row.funding_type}</TableCell>
                                            <TableCell>{row.investigator}</TableCell>
                                            <TableCell>{row.department_name}</TableCell>
                                            <TableCell>{formatter.format(row.amount_requested)}</TableCell>
                                            <TableCell>{row.date_submitted.substring(0, 10)}</TableCell>
                                            <TableCell>{row.pre_award_status}</TableCell>
                                            <TableCell>{row.date_of_notice.substring(0, 10)}</TableCell>
                                            <TableCell>{formatter.format(row.amount_funded)}</TableCell>
                                        </TableRow>
                                        <TableRow style={{background: "#ddd", fontWeight: "bold"}}>
                                            <TableCell colSpan='7'>{row1.unit} - {thisgt} Totals:</TableCell>
                                            <TableCell colSpan='4'>{formatter.format(gttotals[0].req)}</TableCell>
                                            <TableCell>{formatter.format(gttotals[0].funded)}</TableCell>
                                        </TableRow></>
                                    )
                                }

                                // normal case: just another row, nuthin special here eh
                                else return (
                                    <TableRow>
                                        <TableCell>{row.grant_type}</TableCell>
                                        <TableCell>{row.proposal_number}</TableCell>
                                        <TableCell>{row.title}</TableCell>
                                        <TableCell>{row.agency}</TableCell>
                                        <TableCell>{row.funding_type}</TableCell>
                                        <TableCell>{row.investigator}</TableCell>
                                        <TableCell>{row.department_name}</TableCell>
                                        <TableCell>{formatter.format(row.amount_requested)}</TableCell>
                                        <TableCell>{row.date_submitted.substring(0, 10)}</TableCell>
                                        <TableCell>{row.pre_award_status}</TableCell>
                                        <TableCell>{row.date_of_notice.substring(0, 10)}</TableCell>
                                        <TableCell>{formatter.format(row.amount_funded)}</TableCell>
                                    </TableRow>
                                );})}
                        <TableRow style={{background: "#fcbbbb", fontWeight: "bold", fontSize: "large"}}>
                            <TableCell colSpan='7'>{row1.unit} Totals:</TableCell>
                            <TableCell colSpan='4'>{formatter.format(unittotals[0].req)}</TableCell>
                            <TableCell>{formatter.format(unittotals[0].funded)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
                )})}
            </Segment>
            ) : (
                <Segment basic>
                    <Header>No results found</Header>
                </Segment>
            )}
        </Segment>
    );
}
