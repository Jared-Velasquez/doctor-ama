import React from 'react';
import { Alert, Container } from 'react-bootstrap';

function Home (props) {
    return (
        <Container>
        <Alert key="primary">
                Foo bar baz!!!!! This is Home page!!
        </Alert>
        </Container>
    );
}

export default Home;