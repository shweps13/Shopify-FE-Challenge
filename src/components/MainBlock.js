import React from 'react';
import { Button, Form } from 'semantic-ui-react';

const MainBlock = () => (
  <Form>
    <Form.Field>
      <label>Movie title</label>
      <input placeholder='Search...' />
    </Form.Field>
    <Button type='submit'>Submit</Button>
  </Form>
)

export default MainBlock