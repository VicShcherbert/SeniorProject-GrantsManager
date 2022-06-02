/*
* Add-preaward-poc.js makes a post request to add a post award poc to the Pre_Award_Poc table in the SQL database.
* The SQL query can be found in index.js within the 'server' directory of the application. 
*/

import React, { useState } from 'react';
import Axios from 'axios';
import { Form } from 'semantic-ui-react';

export const AddPreAwardPOC = () => {

  const [name, setName] = useState('');

  const addPreAwardPOC = () => {
    Axios.post('http://localhost:3001/add_pre_award_poc', {
      name: name,
    }).then(
      console.log('success'), 
      window.location.reload()
    );
  };

  return (
    <div className='add-pre-award-poc'>
      <Form id='add-preaward-poc'>
        <label>Name:</label>
        <input
          type='text'
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <Form.Button color = 'green' onClick={addPreAwardPOC}>Add Pre-Award POC</Form.Button>
      </Form>
    </div>
  );
};