import React, { useState } from 'react';
import Axios from 'axios'; //when adding something to the database
import {Button, Segment} from 'semantic-ui-react';

export const AddDepartment = () => {
  const [name, setName] = useState('');
  const [id, setID] = useState('');

  const addDepartment = () => {
    Axios.post('http://localhost:3001/add_department', {
      id: id,
      name: name,
    }).then(console.log('success'));
  };

  return (
    <Segment>
      Add department
      <div className='add-department'>
        <label>Name:</label>
        <input
          type='text'
          onChange={(event) => {
            setName(event.target.value);
          }}
        />

        <label>ID:</label>
        <input
          type='number'
          onChange={(event) => {
            setID(event.target.value);
          }}
        />

        <Button onClick={addDepartment}>Add Department</Button>
      </div>
    </Segment>
  );
};