import React, { useState } from 'react';
import Axios from 'axios'; //when adding something to the database
import { Form } from 'semantic-ui-react';

export const AddPostAwardPOC = () => {

  const [name, setName] = useState('');

  const addPostAwardPOC = () => {
    Axios.post('http://localhost:3001/add_post_award_poc', {
      name: name,
    }).then(
      console.log('success'), 
      window.location.reload()
    );
  };

  return (
    <div className='add-post-award-poc'>
      <h3 id='add-postaward-poc-header'>Add Post Award POC</h3>
      <Form id='add-postaward-poc'>
        <label>Name:</label>
        <input
          type='text'
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <Form.Button onClick={addPostAwardPOC}>Add Post-Award POC</Form.Button>
      </Form>
    </div>
  );
};