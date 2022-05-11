import React, { useState } from 'react';
import Axios from 'axios'; //when adding something to the database

import { Form, Header, Input, Label, Radio, Segment } from 'semantic-ui-react';

export const AddUser = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [id, setID] = useState(0);

  const addUser = () => {
    Axios.post('http://localhost:3001/add_user', {
      email: email,
      id: id,
      name: name,
    }).then(console.log('success'), window.location.reload());
  };

  return (
    <div className='add-user'><br/>
      <h3 id='add-user-header'>Add a User </h3>
      <Form id='add-user'>
        <label>Name:</label>
        <input
          type='text'
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Email:</label>
        <input
          type='text'
          onChange={(event) => {
            setEmail(event.target.value.trim());
          }}
        />
        <Radio toggle onClick={() => {
            if(id === 1) setID(0);
            else setID(1);
          }}/>
        <label id='user-checkbox-label'>Administrator Privileges</label>

        <Form.Button onClick={addUser}>Add User</Form.Button>
      </Form>
    </Segment>
  );
};
