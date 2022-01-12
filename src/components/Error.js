import React from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Error() {
  const navigate = useNavigate();

  return (
    <Container className={'d-flex align-items-center justify-content-center flex-column h-100'} style={{maxWidth: '1020px'}}>
      <Row>
        <Col>
          <h1>Error occurred. Try again.</h1>
        </Col>
      </Row>
      <Row>
        <Col className={'mt-4'}>
          <Button variant="primary" onClick={() => {navigate('/')}}>Return to homepage</Button>
        </Col>
      </Row>
    </Container>
  );
}
