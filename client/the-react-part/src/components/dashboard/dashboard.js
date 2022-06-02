/*
* Dashboard.js provides total proposals submitted for the current fiscal year, total funds awarded for the 
* current and previous fiscal years, and a percentage based pie chart of the distribution of funds awarded by type
* for the current fiscal year (using VictoryPie and VictoryLegend).
*
* Logic for sql queries can be found within the 'index.js' file in the 'server' directory.
*/

import React, { useEffect, useState } from 'react';
import { Segment } from 'semantic-ui-react';
import Axios from 'axios';  
import { VictoryPie, VictoryLegend } from 'victory';

export const Dashboard = () => {
  const [proposalCount, setProposalCount] = useState(0);
  const [fundsAwarded, setFundsAwarded] = useState(0);
  const [pastFundsAwarded, setPastFundsAwarded] = useState(0);
  const [execute, setExecute] = useState(1);
  const [fundsByType, setFundsByType] = useState();

  const getProposalQuantity = () => {
    Axios.get('http://localhost:3001/get_proposal_quantity').then(
      (response) => {
        setProposalCount(response.data[0]);
      }
    );
  };

  const getAmountFunded = () => {
    Axios.get('http://localhost:3001/get_amount_funded').then((response) => {
      setFundsAwarded(response.data[0]);
    });
  };

  const getPastAmountFunded = () => {
    Axios.get('http://localhost:3001/get_past_amount_funded').then((response) => {
      setPastFundsAwarded(response.data[0]);
    });
  };

  const getAmountFundedByType = () => {
    Axios.get('http://localhost:3001/get_amount_funded_by_type').then(
      (response) => {
        setFundsByType(response.data);
      }
    );
  };

  useEffect(() => {
    if (execute < 2) {
      getProposalQuantity();
      getAmountFunded();
      getPastAmountFunded();
      getAmountFundedByType();
      setExecute(2);
    }
  }, []);

  const renderPie = () => {
    if (fundsByType) {
      return (
        <Segment id='dashboard-segment'>
          <h2>
            Funding By Type:
          </h2>
            <div style={{width: "50%", display: "inline-flex", paddingLeft: "100px"}}>
              <VictoryLegend
                colorScale={[
                  '#C3E8E6',
                  '#9BA1EB',
                  '#A0E685',
                  '#E6976E',
                  '#E6CF7A',
                  '#FFA6AA',
                  '#CBA4EB',
                ]}
                centerTitle
                orientation="vertical"
                gutter={20}
                x={0}
                y={15}
                data={fundsByType.map((element) => {
                  return {name: element.grant_type}
                })
                }
              />
            </div>
              <div style={{width: "50%", display: "inline-flex", paddingRight: "100px"}}>
                <VictoryPie
                  colorScale={[
                    '#C3E8E6',
                    '#9BA1EB',
                    '#A0E685',
                    '#E6976E',
                    '#E6CF7A',
                    '#FFA6AA',
                    '#CBA4EB',
                  ]}
                  data={fundsByType.map((element) => {
                    return {x: element.grant_type, y: element.sum/fundsAwarded.total}
                  })
                  }
                  height={300}
                  cornerRadius={3}
                  innerRadius={50}
                  padAngle={1}
                  labels={() =>  null}
                />
              </div>
        </Segment>
      );
    }
  };

  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const currentYear = new Date().getFullYear();

  return (
    <div className='dashboard-container'>
      <Segment id='dashboard-segment'>
        <h2>Proposals Submitted</h2>
        <p id='dashboard-stat'>{proposalCount.count}</p>
      </Segment>
      <Segment id='dashboard-segment'>
        <h2>Funds Awarded</h2>
        <p id='dashboard-stat'>Current Fiscal Year: {numberFormat.format(fundsAwarded.total)}</p>
        <p id='dashboard-stat'>Past Fiscal Year: {numberFormat.format(pastFundsAwarded.total)}</p>
      </Segment>
      {renderPie()}
    </div>
  );
};
