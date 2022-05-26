import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import {
    Modal,
    Button,
    Form,
    Header,
    Input,
    Dropdown,
    Divider,
    Label,
    Segment,
    TextArea,
  } from 'semantic-ui-react';

  export const PreAwardModal = ({ poc }) => {
    const [open, setOpen] = useState(false);
    const [name, setPoc] = useState(poc.name);

    const handleUpdate = (poc) => {
        var result = window.confirm('Are you sure you want to update?');
        if (result) {
          Axios.put('http://localhost:3001/update_pre_award_poc', {
            name: name
          }).then((response) => {
            alert('Entry has been updated');
            window.location.reload();
          });
        }
    };

    return (
        <Modal
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          open={open}
          trigger={<Button color='grey'>View</Button>}
        >
            <Modal.Header>Testing</Modal.Header>
            <Modal.Content>
                {proposal.unique_id ? (
                <Label size='large'>
                    Proposal ID: {proposal.unique_id}
                </Label>
                ) : null}
                {proposal.pre_proposal_number ? (
                <Label size='large'>
                    Pre-Proposal Number: {proposal.pre_proposal_number}
                </Label>
                ) : null}
                
                <Form>
                <Segment basic>
                    <Divider horizontal>Main Information</Divider>
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
                    onClick={() => handleUpdate(proposal.unique_id)}
                    >
                    Update
                    </Button>
                    <Button color='orange' onClick={() => dealWithCancel()}>
                    Cancel
                    </Button>
                    <Button color='red' onClick={() => deleteProposal(proposal.unique_id)}>
                    Delete
                </Button>
            </Modal.Actions>
        </Modal>
    );
};