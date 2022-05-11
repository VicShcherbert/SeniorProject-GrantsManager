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
    <Segment basic style={{ width: '350px', margin: '0px' }}>
      <Header size='large' textAlign='center'>
        Add a User
      </Header>
      <Form>
        <Form.Field>
          <Header>Name:</Header>
          <Input
            type='text'
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </Form.Field>
        <Form.Field>
          <Header>Email:</Header>
          <Input
            type='text'
            onChange={(event) => {
              setEmail(event.target.value.trim());
            }}
          />
        </Form.Field>
        <Segment basic>
          <Radio
            toggle
            onClick={() => {
              if (id === 1) setID(0);
              else setID(1);
            }}
          />
          <Label id='user-checkbox-label'>Administrator Privileges</Label>
        </Segment>
        <Form.Button onClick={addUser}>Add User</Form.Button>
      </Form>
    </Segment>
  );
};
