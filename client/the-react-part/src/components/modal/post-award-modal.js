/*
* Post-award-modal.js provides update and delete methods for post award pocs. Modal provides 'pop-up' window
* when trigger is initiated.
*
* handleUpdate and deletePoc use unique_id field to send put and delete requests. SQL queries can be found
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

  export const PostAwardModal = ({ poc }) => {
    const [open, setOpen] = useState(false);
    const [name, setPoc] = useState(poc.name);

    const handleUpdate = (id) => {
        var result = window.confirm('Are you sure you want to update?');
        if (result) {
          Axios.put('http://localhost:3001/update_post_award_poc', {
            name: name,
            id: id
          }).then((response) => {
            alert('Entry has been updated');
            window.location.reload();
          });
        }
    };

    const dealWithCancel = () => {
        setPoc(poc.name);
        setOpen(false);
    };

    const deletePoc = (id) => {
        var result = window.confirm('Are you sure you want to delete?');
        if (result) {
          Axios.delete('http://localhost:3001/delete_post_award_poc', {
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
            <Modal.Header>Update for {poc.name}</Modal.Header>
            <Modal.Content>  
                <Form>
                <Segment basic>
                    <Divider horizontal>Post Award POC</Divider>
                </Segment>
        
                <Form.Field>
                    <Header>Name</Header>
                    <Input
                    placeholder='Name'
                    value={name}
                    name='name'
                    onChange={(_, { value }) => setPoc(value)}
                    type='text'
                    />
                </Form.Field>
                </Form>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color='green'
                    onClick={() => handleUpdate(poc.id)}
                    >
                    Update
                    </Button>
                    <Button color='orange' onClick={() => dealWithCancel()}>
                    Cancel
                    </Button>
                    <Button color='red' onClick={() => deletePoc(poc.id)}>
                    Delete
                </Button>
            </Modal.Actions>
        </Modal>
    );
};