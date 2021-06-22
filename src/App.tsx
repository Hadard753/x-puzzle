import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';

import Footer from './components/Footer';

function App() {
  return (
    <Container>
      <Row>
        <Col className="col-md-6">Settings</Col>
        <Col className="col-md-6">Result</Col>
      </Row>
      <Footer />
    </Container>
  );
}

export default App;
