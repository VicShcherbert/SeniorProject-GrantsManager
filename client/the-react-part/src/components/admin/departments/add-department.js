import React, { useState } from 'react';
import Axios from 'axios'; //when adding something to the database
import { Form, Header, Segment, Input } from 'semantic-ui-react';

export const AddDepartment = () => {
  const [name, setName] = useState('');
  const [id, setID] = useState('');

  const addDepartment = () => {
    Axios.post('http://localhost:3001/add_department', {
      id: id,
      name: name,
    }).then(console.log('success'), window.location.reload());
  };

  return (
    <div className='add-department'><br/>
      <Form>
        <Form.Field>
          <Header>ID:</Header>
          <Input
            type='number'
            onChange={(event) => {
              setID(event.target.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <Header>Name:</Header>
          <Input
            type='text'
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </Form.Field>
        <Form.Button color = 'green' onClick={addDepartment}>Add Department</Form.Button>
      </Form>
      </div>
  );
};