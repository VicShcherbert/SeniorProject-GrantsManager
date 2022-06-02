/*
* Department-modal.js provides update and delete methods for departments. Modal provides 'pop-up' window
* when trigger is initiated.
*
* handleUpdate and deleteDeparment use unique_id field to send put and delete requests. SQL queries can be found
* within 'index.js' file of the 'server' directory.
*
* dealWithCancel saves current values and closes modal window
*/

import Axios from 'axios';
import React, { useState } from 'react';
import {
    Modal,
    Button,
    Form,
    Header,
    Input,
    Divider,
    Segment,
  } from 'semantic-ui-react';

  export const DepartmentModal = ({ department }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState(department.name);
    const [id, setNum] = useState(department.id);

    const handleUpdate = (unique_id) => {
        var result = window.confirm('Are you sure you want to update?');
        if (result) {
          Axios.put('http://localhost:3001/update_department', {
            name: name,
            id: id,
            unique_id: unique_id
          }).then((response) => {
            alert('Entry has been updated');
            window.location.reload();
          });
        }
    };

    const dealWithCancel = () => {
        setName(department.name);
        setNum(department.id);
        setOpen(false);
    };

    const deleteDepartment = (unique_id) => {
        var result = window.confirm('Are you sure you want to delete?');
        if (result) {
          Axios.delete('http://localhost:3001/delete_department', {
            data: {unique_id: unique_id},
          }).then((response) => {
            alert('Entry has been deleted');
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
            <Modal.Header>Update for {department.name}</Modal.Header>
            <Modal.Content>  
                <Form>
                <Segment basic>
                    <Divider horizontal>Department</Divider>
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
                    <Header>Number</Header>
                    <Input
                    placeholder='Number'
                    value={id}
                    name='number'
                    onChange={(_, { value }) => setNum(value)}
                    type='text'
                    />
                </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color='green'
                    onClick={() => handleUpdate(department.unique_id)}
                    >
                    Update
                    </Button>
                    <Button color='orange' onClick={() => dealWithCancel()}>
                    Cancel
                    </Button>
                    <Button color='red' onClick={() => deleteDepartment(department.unique_id)}>
                    Delete
                </Button>
            </Modal.Actions>
        </Modal>
    );
};