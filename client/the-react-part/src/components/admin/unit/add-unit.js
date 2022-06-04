import React from 'react';
import Axios from 'axios'; //when adding something to the database
import { Form, Segment, Header, Input } from 'semantic-ui-react';
import { useForm, Controller } from 'react-hook-form';

export const AddUnit = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      unitName: '',
    },
  });

  const onSubmit = (data) => {
    Axios.post('http://localhost:3001/add_unit', {
      name: data.unitName,
    }).then(
      console.log('success'),
      window.location.reload()
    );
  };

  return (
    <Segment basic style={{ marginTop: '30px', padding: '0px' }}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='unitName'
          control={control}
          rules={{
            required: true,
            pattern: {
              value: /^[a-zA-Z .,'"/]{1,50}$/,
              message:
                'Incorrect format for unit name. Please ensure there are no numbers or extra special characters',
            },
          }}
          render={({ field }) => (
            <Form.Field>
              <Header>Unit:</Header>
              <Input {...field} placeholder='Unit name' />
            </Form.Field>
          )}
        />
        {errors.unitName && (
          <Segment color='red' basic>
            {errors.unitName.message}
          </Segment>
        )}
        <Form.Button style={{ marginTop: '20px' }} color='green' type='submit'>
          Add Unit
        </Form.Button>
      </Form>
    </Segment>
  );
};
