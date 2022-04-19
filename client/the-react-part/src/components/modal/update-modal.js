import Axios from 'axios';
import React, { useState } from 'react';
import { Modal, Button, Form, Header, Input } from 'semantic-ui-react';

export const UpdateModal = ({ proposal }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(proposal.title);
  const [agency, setAgency] = useState(proposal.agency);

  const handleUpdate = (prop_number) => {
    // console.log('HIIIIII from ' + proposal.proposal_number);
    // console.log(title);

    // console.log(prop_number);
    // console.log(title);
    Axios.put('http://localhost:3001/update', {
      proposal_number: prop_number,
      title: title,
      // agency: agency,
    }).then((response) => {
      alert('update');
    });
  };

  //   console.log(title);

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button color='orange'>Update</Button>}
    >
      <Modal.Header>
        {proposal.proposal_number} - {proposal.title}
      </Modal.Header>
      <Modal.Content>
        <Form>
          <Form.Field>
            <Header>Title</Header>
            <Input
              placeholder='Title'
              value={title}
              name='title'
              onChange={(_, { value }) => setTitle(value)}
            />
          </Form.Field>
          <Form.Field>
            <Header>Agency</Header>
            <Input
              placeholder='Agency'
              value={agency}
              name='agency'
              onChange={(_, { value }) => setTitle(value)}
            />
          </Form.Field>
        </Form>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color='orange'
          onClick={() => handleUpdate(proposal.proposal_number)}
        >
          Update
        </Button>
        <Button onClick={() => setOpen(false)}>Done</Button>
      </Modal.Actions>
    </Modal>
  );
};
