import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';

import Footer from './components/Footer';
import Settings from './components/Settings';

function App() {
  return (
    <Container>
      <Row>
        <Col><Settings /></Col>
        <Col>Result</Col>
      </Row>
      <Footer />
    </Container>
  );
}

export default App;
