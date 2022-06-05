/*
* Unit-modal.js provides update and delete methods for units. Modal provides 'pop-up' window
* when trigger is initiated.
*
* handleUpdate and deleteUnit use unique_id field to send put and delete requests. SQL queries can be found
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

  export const UnitModal = ({ unit }) => {
    const [open, setOpen] = useState(false);
    const [name, setUnit] = useState(unit.name);

    const handleUpdate = (id) => {
        var result = window.confirm('Are you sure you want to update?');
        if (result) {
          Axios.put('http://localhost:3001/update_unit', {
            name: name,
            id: id
          }).then((response) => {
            alert('Entry has been updated');
            window.location.reload();
          });
        }
    };

    const dealWithCancel = () => {
        setUnit(unit.name);
        setOpen(false);
    };

    const deleteUnit = (id) => {
        var result = window.confirm('Are you sure you want to delete?');
        if (result) {
          Axios.delete('http://localhost:3001/delete_unit', {
            data: {id: id},
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
            <Modal.Header>Update for {unit.name}</Modal.Header>
            <Modal.Content>  
                <Form>
                <Segment basic>
                    <Divider horizontal>Unit</Divider>
                </Segment>
        
                <Form.Field>
                    <Header>Name</Header>
                    <Input
                    placeholder='Name'
                    value={name}
                    name='name'
                    onChange={(_, { value }) => setUnit(value)}
                    type='text'
                    />
                </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color='green'
                    onClick={() => handleUpdate(unit.id)}
                    >
                    Update
                    </Button>
                    <Button color='orange' onClick={() => dealWithCancel()}>
                    Cancel
                    </Button>
                    <Button color='red' onClick={() => deleteUnit(unit.id)}>
                    Delete
                </Button>
            </Modal.Actions>
        </Modal>
    );
};