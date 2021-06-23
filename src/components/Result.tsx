import './Settings.css';

import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/Form';

import { arrayEquals } from '../algo/utils';

// import DigitsInput from './DigitsInput';

const Result = ({ solution }: {solution?: string}) => {
    return (
        <Container>
          {solution ? <Row>
                <Col style={{textAlign:"center"}}>
                    <h3>AI Solution</h3>
                </Col>
            </Row> : null}
            <Row>
                <Col style={{textAlign:"center"}}>
                    <h3>{solution || "Enter your settings"}</h3>
                </Col>
            </Row>
        </Container>
    );
}

export default Result;