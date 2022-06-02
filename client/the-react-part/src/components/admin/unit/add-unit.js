/*
* Add-unit.js makes a post request to add a unit to the Units table in the SQL database.
* The SQL query can be found in index.js within the 'server' directory of the application. 
*/

import React, { useState } from 'react';
import Axios from 'axios';  
import { Form } from 'semantic-ui-react';

export const AddUnit = () => {

  const [name, setName] = useState('');

  const addUnit = () => {
    Axios.post('http://localhost:3001/add_unit', {
      name: name,
    }).then(
      console.log('success'), 
      window.location.reload()
    );
  };

  return (
    <div className='add-unit'>
      <Form id='add-unit'>
        <label>Unit:</label>
        <input
          type='text'
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <Form.Button color = 'green' onClick={addUnit}>Add Unit</Form.Button>
      </Form>
    </div>
  );
};