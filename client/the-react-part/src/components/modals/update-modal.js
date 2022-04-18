import React, { useState } from 'react';
import Axios from 'axios'; //when adding something to the database
import {
  Button,
  Segment,
  Header,
  Table,
  Modal,
  Input,
  Form,
} from 'semantic-ui-react';
import { AddProposal } from '../dashboard/add-proposal';
export const UpdateModal = ({ proposal }) => {
  const [open, setOpen] = useState(false);

  const [title, setTitle] = useState('');
  const [proposal_number, setProposalNumber] = useState(0);
  const [agency, setAgency] = useState('');
  const updateThing = () => {
    console.log('Yo');
    setOpen(false);
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Edit Information</Button>}
    >
      <Modal.Header>{proposal.title}</Modal.Header>
      <Modal.Content>
        <AddProposal />
      </Modal.Content>
      <Modal.Actions>
        <Button content='Update' color='green' onClick={() => updateThing()} />
        <Button content='Close' onClick={() => setOpen(false)} />
      </Modal.Actions>
    </Modal>
  );
};
