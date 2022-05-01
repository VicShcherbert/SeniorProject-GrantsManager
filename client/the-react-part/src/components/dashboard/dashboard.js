import React, { useEffect, useState } from 'react';
import { Segment } from 'semantic-ui-react';
import Axios from 'axios'; //when adding something to the database
import { VictoryPie } from 'victory';

export const Dashboard = () => {
  const [proposalCount, setProposalCount] = useState(0);
  const [fundsAwarded, setFundsAwarded] = useState(0);
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
              data={[
                {
                  x: `${fundsByType[1].grant_type.slice(0, 1)}`,
                  y: fundsByType[1].sum / fundsAwarded.total,
                },
                {
                  x: `${fundsByType[2].grant_type.slice(0, 1)}`,
                  y: fundsByType[2].sum / fundsAwarded.total,
                },
                {
                  x: `${fundsByType[3].grant_type.slice(0, 1)}`,
                  y: fundsByType[3].sum / fundsAwarded.total,
                },
                {
                  x: `${fundsByType[4].grant_type.slice(0, 1)}`,
                  y: fundsByType[4].sum / fundsAwarded.total,
                },
                {
                  x: `${fundsByType[5].grant_type.slice(0, 1)}`,
                  y: fundsByType[5].sum / fundsAwarded.total,
                },
                {
                  x: `${fundsByType[6].grant_type.slice(0, 1)}`,
                  y: fundsByType[6].sum / fundsAwarded.total,
                },
              ]}
              height={250}
              cornerRadius={3}
              innerRadius={40}
              padAngle={1}
              style={{
                labels: {
                  fontSize: 8,
                },
              }}
            />
          </h2>
        </Segment>
      );
    }
  };

  const numberFormat = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  return (
    <div className='dashboard-container'>
      <Segment id='dashboard-segment'>
        <h2>Proposals Submitted</h2>
        <p id='dashboard-stat'>{proposalCount.count}</p>
      </Segment>
      <Segment id='dashboard-segment'>
        <h2>Funds Awarded</h2>
        <p id='dashboard-stat'>{numberFormat.format(fundsAwarded.total)}</p>
      </Segment>
      {renderPie()}
    </div>
  );
};
