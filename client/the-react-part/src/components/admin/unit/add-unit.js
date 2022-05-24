import React, { useState } from 'react';
import Axios from 'axios'; //when adding something to the database
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
        <Form.Button onClick={addUnit}>Add Unit</Form.Button>
      </Form>
    </div>
  );
};