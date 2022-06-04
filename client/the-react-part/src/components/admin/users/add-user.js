import React, { useState } from 'react';
import Axios from 'axios'; //when adding something to the database
import {
  Button,
  Form,
  Header,
  Input,
  Label,
  Radio,
  Segment,
} from 'semantic-ui-react';
import { useForm, Controller } from 'react-hook-form';

export const AddUser = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      name: '',
    },
  });
  const [id, setID] = useState(0);

  const onSubmit = (data) => {
    Axios.post('http://localhost:3001/add_user', {
      name: data.name,
      email: data.email,
      id: id,
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

        <Controller
          name='email'
          control={control}
          rules={{
            required: true,
            pattern: {
              value:
                /(?:[a-z0-9!#$%&'*+\=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:ewu.edu)/,
              message:
                'Entered email does not match email format. Must contain "ewu.edu"',
            },
          }}
          render={({ field }) => (
            <Form.Field>
              <Header>Email:</Header>
              <Input {...field} placeholder='Email' />
            </Form.Field>
          )}
        />
        {errors.email && (
          <Segment color='red' basic>
            {errors.email.message}
          </Segment>
        )}
        <Segment basic>
          <Radio
            toggle
            onClick={() => {
              if (id === 1) setID(0);
              else setID(1);
            }}
          />
          <Label basic id='user-checkbox-label'>
            Administrator Privileges
          </Label>
        </Segment>

        <Form.Button color='green' type='submit'>
          Add User
        </Form.Button>
      </Form>
    </Segment>
  );
};
