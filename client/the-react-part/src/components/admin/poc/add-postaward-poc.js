/*
* Add-postaward-poc.js makes a post request to add a post award poc to the Post_Award_Poc table in the SQL database.
* The SQL query can be found in index.js within the 'server' directory of the application. 
*/
import React from 'react';
import Axios from 'axios'; //when adding something to the database
import { Form, Segment, Header, Input } from 'semantic-ui-react';
import { useForm, Controller } from 'react-hook-form';

export const AddPostAwardPOC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = (data) => {
    Axios.post('http://localhost:3001/add_post_award_poc', {
      name: data.name,
    }).then(console.log('success'), window.location.reload());
  };

  return (
    <Segment basic style={{ marginTop: '30px', padding: '0px' }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='name'
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[a-zA-Z ]{1,50}$/,
              message:
                'Incorrect format for name. Please ensure there are no numbers or extra special characters',
            },
          }}
          render={({ field }) => (
            <Form.Field>
              <Header>Name:</Header>
              <Input {...field} placeholder='Name' />
            </Form.Field>
          )}
        />
        {errors.name && (
          <Segment color='red' basic>
            {errors.name.message}
          </Segment>
        )}
        <Form.Button style={{ marginTop: '20px' }} color='green' type='submit'>
          Add Post-Award POC
        </Form.Button>
      </Form>
    </Segment>
  );
};
