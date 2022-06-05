/*
 * Add-department.js makes a post request to add a department to the Departments table in the SQL database.
 * The SQL query can be found in index.js within the 'server' directory of the application.
 */
import React from 'react';
import Axios from 'axios'; //when adding something to the database
import { Form, Header, Segment, Input } from 'semantic-ui-react';
import { useForm, Controller } from 'react-hook-form';

export const AddDepartment = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      id: '',
    },
  });

  const onSubmit = (data) => {
    Axios.post('http://localhost:3001/add_department', {
      id: data.id,
      name: data.name,
    }).then(console.log('success'), window.location.reload());
  };

  return (
    <Segment basic style={{ marginTop: '30px', padding: '0px' }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='id'
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[\d]*$/,
              message: 'Incorrect format for ID. Must be a number.',
            },
          }}
          render={({ field }) => (
            <Form.Field>
              <Header>ID:</Header>
              <Input {...field} placeholder='ID' />
            </Form.Field>
          )}
        />
        {errors.id && (
          <Segment color='red' basic>
            {errors.id.message}
          </Segment>
        )}

        <Controller
          name='name'
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[a-zA-Z\d .,'"/]{1,50}$/,
              message:
                'Incorrect format for name. Please ensure there are no extra special characters',
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
          Add Department
        </Form.Button>
      </Form>
    </Segment>
  );
};
