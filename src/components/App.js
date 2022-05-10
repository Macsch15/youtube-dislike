import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import '../style.css';

export default function App () {
  const [videoUrl, setVideoUrl] = useState('');
  const navigate = useNavigate();

  const urlParser = url => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[7].length === 11) ? '/video/' + match[7] : '/error';
  };

  return (
    <Container className={'d-flex align-items-center justify-content-center flex-column h-100'} style={{maxWidth: '1020px'}}>
      <Row>
        <Col>
          <h1>Show dislikes for video on <i className="fa fa-youtube-play" style={{color: '#f00'}} aria-hidden="true" /> YouTube
          </h1>
        </Col>
      </Row>

      <Row className={'mt-5 w-100'}>
        <Col>
          <Form>
            <Form.Group className="mb-3" controlId="formVidId">
              <Form.Label><i className="fa fa-link" aria-hidden="true" /> Enter YouTube video URL</Form.Label>
              <Form.Control size="lg" type="text" onChange={e => setVideoUrl(e.target.value)} placeholder="Exmaple: https://www.youtube.com/watch?v=NS3YrcorRhg" />
            </Form.Group>

            <div className={'d-flex justify-content-center mt-3'}>
              <Button variant="primary" onClick={() => {navigate(urlParser(videoUrl));}}>Check video dislikes</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
