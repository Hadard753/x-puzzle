import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/Form';

import { arrayEquals } from '../algo/utils';
import DigitsInput from './DigitsInput';

const Settings = () => {
    const algoOptions = ["IDS", "BFS", "A *"];
    const [settings, setSettings] = useState({algo: algoOptions[0], size: 3});
    const [initialState, setInitialState] = useState('1-2-3-4-5-6-7-8-0');

    const getGoalState = (size:number) => {
        let goal = [];
        for (let i=1; i<size*size; i++) {
            goal.push(i);
        }
        goal.push(0);
        return goal;
    }

    const validateSettings = () => {
        if(settings.size<0 || settings.size > 1000)
            return false;
        const initStateArr = initialState.split('-').map(n=>parseInt(n));
        if(initStateArr.length === 0 || !arrayEquals(initStateArr.sort(), getGoalState(settings.size).sort()))
            return false;
        return true;
    }

    return (
        <Container>
            <Form>
                <Row>
                    <Col>
                        <Form.Label>Algorithm</Form.Label>
                        <div>
                            <ButtonGroup aria-label="Basic example" style={{ width: "100%" }}>
                                {algoOptions.map(algo => (
                                    <Button
                                        key={algo}
                                        variant="secondary"
                                        onClick={() => setSettings({...settings, algo})}
                                        active={settings.algo === algo}>
                                            {algo}
                                    </Button>
                                ))}
                            </ButtonGroup>
                        </div>
                    </Col>
                    <Col>
                        <Form.Label>Puzzle size</Form.Label>
                        <Form.Control type="number" value={settings.size} onChange={(e) => {
                            const size = parseInt(e.target.value) || 3;
                            setSettings({...settings, size})
                            setInitialState(getGoalState(size).join('-'));
                        }}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Label>Please Fill in numbers from 0-{settings.size * settings.size -1}...</Form.Label>
                          <Form.Control value={initialState} onChange={(e) => {
                            setInitialState(e.target.value);
                        }}/>
                        {/* <DigitsInput size={settings.size * settings.size} value={initialState} onChange={setInitialState}/> */}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button disabled={!validateSettings()} variant="primary" type="submit" style={{ width: "100%" }}>
                            Solve !
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
}

export default Settings;