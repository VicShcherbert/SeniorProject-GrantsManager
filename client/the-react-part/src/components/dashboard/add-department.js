import React, { useState } from 'react';
import Axios from 'axios'; //when adding something to the database
import { Form } from 'semantic-ui-react';

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
    <div>
      <h3 id='add-department-header'>
        Add a Department
      </h3>
      <Form id="add-department">
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

          <Form.Button onClick={addDepartment}>Add Department</Form.Button>
      </Form>
    </div>
  );
};