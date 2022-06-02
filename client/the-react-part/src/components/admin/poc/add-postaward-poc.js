/*
* Add-postaward-poc.js makes a post request to add a post award poc to the Post_Award_Poc table in the SQL database.
* The SQL query can be found in index.js within the 'server' directory of the application. 
*/

import React, { useState } from 'react';
import Axios from 'axios';
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
      <Form id='add-postaward-poc'>
        <label>Name:</label>
        <input
          type='text'
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <Form.Button color = 'green' onClick={addPostAwardPOC}>Add Post-Award POC</Form.Button>
      </Form>
    </div>
  );
};