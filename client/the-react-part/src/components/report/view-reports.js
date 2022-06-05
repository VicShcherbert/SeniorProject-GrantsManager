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
                            <TableRow><TableHeaderCell colSpan='13' textAlign='center'>{row1.unit} - {row1.numawards} Awards</TableHeaderCell></TableRow>
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
                                        <TableRow style={{background: "#ddd", fontWeight: "bold"}}>
                                            <TableCell colSpan='8'>{row1.unit} - {thisgt} Totals:</TableCell>
                                            <TableCell colSpan='4'>{gttotals[0].req}</TableCell>
                                            <TableCell>{gttotals[0].funded}</TableCell>
                                        </TableRow></>
                                    )
                                }

                                // normal case: just another row, nuthin special here eh
                                else return (
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
                                );})}
                        <TableRow style={{background: "#fcbbbb", fontWeight: "bold", fontSize: "large"}}>
                            <TableCell colSpan='8'>{row1.unit} Totals:</TableCell>
                            <TableCell colSpan='4'>{unittotals[0].req}</TableCell>
                            <TableCell>{unittotals[0].funded}</TableCell>
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


/*
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
*/

/*
Next attempt:
within the "getReport", insert new row at the end of every unit/grant_type pairing
that has the total amount requested, amound funded for that pairing.
Then, at the end of every overall unit, insert row for that units totals.

Then, in the return for the Reports() hook, we just have to use getReport.map so we don't
use any nested hooks. 
*/

    /*
    const makeTable = (unit) => {
        // Filter through the unit, as well as through each grant type within that unit
        const currUnit = getReport.filter(row=> row.unit = unit);
        const [getAmounts, setAmounts] = useState([]);
        const [finalAmounts, setFinals] = useState([]);

        Axios.post('http://localhost:3001/get_unit_totals', {
            startDate: startDate,
            endDate: endDate,
            unit: unit
        }).then((response) => {
            setFinals(response.data);
        })

        return (
            <TableBody>
            <TableRow>
                <TableCell colSpan='13'>{unit}</TableCell>
            </TableRow>
            {grantTypes.forEach(grantType => {
                const subsection = currUnit.filter(row=> row.grant_type = grantType);
                {subsection.map((row) => {
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
                    )
                })}

                // Set amount total for each unit + grant type
                Axios.post('http://localhost:3001/get_amounts', {
                    unit: unit,
                    grant_type: grantType,
                    startDate: startDate,
                    endDate: endDate
                }).then((response) => {
                    setAmounts(response.data);
                });

                // return final row of subsection
                return(
                    <TableRow>
                        <TableCell colSpan='8'>{grantType} Total: </TableCell>
                        <TableCell>{getAmounts.req}</TableCell>
                        <TableCell colSpan='3'></TableCell>
                        <TableCell>{getAmounts.funded}</TableCell>
                    </TableRow>
                )
            })}
            <TableRow>
                <TableCell colSpan='8'>Total {unit} Amounts:</TableCell>
                <TableCell>{finalAmounts.req}</TableCell>
                <TableCell colSpan='3'></TableCell>
                <TableCell>{finalAmounts.funded}</TableCell>
            </TableRow>
            </TableBody>
        );

    }
    */

    /*
    Things i've tried:
        Creating multiple tables, one for each unit
            doesn't work because it requires nested hooks (for each unit, make table)
        Inserting row into the reports response
            Whenever i try viewing getReports anytime other than in the return statement, 
            it is "undefined" according to javascript. Cannot iterate through it and then insert at the 
            desired index because javascript claims it is empty
        In the return, checking after each row to see if unit or grant_type has changed
            Can't even do this because there's no way to keep track of the previous unit/gt has changed.
            Trying to change the previous unit/gt results in "too many re-renders" in react
    */

            /*
                        if(thisunit == nextunit && thisgt != nextgt){
                            var gtreq = gtReq.shift().req;
                            var gtfunded = gtFunded.shift().funded;
                            return (
                                <><TableRow>
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
                                <TableRow>
                                    <TableCell colSpan='8'>{thisunit} - {thisgt} Totals:</TableCell>
                                    <TableCell colSpan='2'>{gtreq}</TableCell>
                                    <TableCell colSpan='2'>{gtfunded}</TableCell>
                                </TableRow></>
                            )
                        }
            */




                            /*
                            // case 2: new unit, first display the unit + grant type row
                            // then display the overall unit total
                            else if(thisunit != nextunit){
                                var gttotals = gtTotals.filter(function(row){
                                    return row.unit == thisunit && row.grant_type == thisgt;
                                })
                                var unittotals = unitTotals.filter(function(row){
                                    return row.unit == thisunit;
                                })
                                if(gttotals.length == 0){
                                    // console.log("Pair not found: " + thisunit + " " + thisgt);
                                    return(<TableRow><TableCell colSpan="100%">Error Row: {thisunit}, {thisgt}</TableCell></TableRow>)
                                }
                                if(unittotals.length == 0){
                                    // console.log("Unit totals not found: " + thisunit);
                                    return(<TableRow><TableCell colSpan="100%">Error Row: {thisunit}</TableCell></TableRow>)
                                }
                                return (
                                    <><TableRow>
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
                                    <TableRow>
                                        <TableCell colSpan='8'>{thisunit} - {thisgt} Totals:</TableCell>
                                        <TableCell colSpan='4'>{gttotals[0].req}</TableCell>
                                        <TableCell>{gttotals[0].funded}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell colSpan='8'>{thisunit} Totals:</TableCell>
                                        <TableCell colSpan='4'>{unittotals[0].req}</TableCell>
                                        <TableCell>{unittotals[0].funded}</TableCell>
                                    </TableRow>
                                    </>
                                )
                            }
                            */