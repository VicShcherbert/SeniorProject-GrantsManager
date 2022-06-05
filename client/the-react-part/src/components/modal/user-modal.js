/*
* User-modal.js provides update and delete methods for users. Modal provides 'pop-up' window
* when trigger is initiated.
*
* handleUpdate and deleteUser use unique_id field to send put and delete requests. SQL queries can be found
* within 'index.js' file of the 'server' directory.
*
* dealWithCancel saves current values and closes modal window
*
* NOTE: Users currently have ability to delete themselves from database. This should not be allowed and must be fixed.
*/

import Axios from 'axios';
import React, { useState } from 'react';
import {
  Modal,
  Button,
  Radio,
  Form,
  Header,
  Input,
  Divider,
  Segment,
} from 'semantic-ui-react';

export const UserModal = ({ user }) => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [id, setId] = useState(user.id);

  const handleUpdate = (unique_id) => {
    var result = window.confirm('Are you sure you want to update?');
    if (result) {
      Axios.put('http://localhost:3001/update_user', {
        name: name,
        email: email,
        id: id,
        unique_id: unique_id,
      }).then((response) => {
        alert('Entry has been updated');
        window.location.reload();
      });
    }
  };

  const dealWithCancel = () => {
    setName(user.name);
    setEmail(user.email);
    setId(user.id);
    setOpen(false);
  };

  const deleteUser = (unique_id) => {
    var result = window.confirm('Are you sure you want to delete user?');
    if (result) {
      Axios.delete('http://localhost:3001/delete_user', {
        data: { unique_id: unique_id },
      }).then((response) => {
        alert('User has been deleted');
        window.location.reload();
      });
    }
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color='grey'>Edit</Button>}
    >
      <Modal.Header>Update for {user.name}</Modal.Header>
      <Modal.Content>
        <Form>
          <Segment basic>
            <Divider horizontal>User</Divider>
          </Segment>

          <Form.Field>
            <Header>Name</Header>
            <Input
              placeholder='Name'
              value={name}
              name='name'
              onChange={(_, { value }) => setName(value)}
              type='text'
            />
          </Form.Field>
          <Form.Field>
            <Header>Email</Header>
            <Input
              placeholder='Email'
              value={email}
              name='email'
              onChange={(_, { value }) => setEmail(value)}
              type='text'
            />
          </Form.Field>

          <Radio
            toggle
            onClick={() => {
              if (id === 1) setId(0);
              else setId(1);
            }}
          />
          <label id='user-checkbox-label'>Administrator Privileges</label>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button color='green' onClick={() => handleUpdate(user.unique_id)}>
          Update
        </Button>
        <Button color='orange' onClick={() => dealWithCancel()}>
          Cancel
        </Button>
        <Button color='red' onClick={() => deleteUser(user.unique_id)}>
          Delete
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
