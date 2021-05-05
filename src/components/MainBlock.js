import React from 'react';
import { Form, Input, Header } from 'semantic-ui-react';

const MainBlock = () => (
    <div className="Main-form-block">
        <div className="Main-form-header">
            <Header as='h1'>The Shoppies</Header>
        </div>
        <Form id="Main-form-block">
            <Input fluid icon='search' iconPosition='left' placeholder='Search...' />
        </Form>
    </div>
)

export default MainBlock