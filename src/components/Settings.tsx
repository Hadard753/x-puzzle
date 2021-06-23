import './Settings.css';

import React, { useState } from 'react';
import Button from 'react-bootstrap/esm/Button';
import ButtonGroup from 'react-bootstrap/esm/ButtonGroup';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/Form';

import { arrayEquals, getGoalState } from '../algo/utils';

// import DigitsInput from './DigitsInput';

const Settings = ({onSubmit}: {onSubmit: any}) => {
    const algoOptions = ["IDS", "BFS", "A *"];
    const [settings, setSettings] = useState({algo: algoOptions[0], size: 3});
    const [initialState, setInitialState] = useState('1-2-3-4-5-6-7-8-0');

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
            <Row>
                <Col style={{textAlign:"center"}}>
                    <h3>Enter Settings Online</h3>
                </Col>
            </Row>
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
                        <Button
                            onClick={() => onSubmit({
                                ...settings,
                                initialState: initialState.split('-').map(n=>parseInt(n))
                            })} disabled={!validateSettings()} variant="outline-success" style={{ width: "100%" }}>
                            Solve !
                        </Button>
                    </Col>
                </Row>
            </Form>
            <div className="separator">OR</div>
            <Row>
                <Col style={{textAlign:"center"}}>
                    <h3>Upload Settings File</h3>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div className="input-group">
                        <div className="custom-file">
                            <Form.Label className="custom-file-label">Choose file</Form.Label>
                            <input type="file" className="custom-file-input" id="inputGroupFile04"/>
                        </div>
                        <div className="input-group-append">
                            <Button variant="outline-success">Upload</Button>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Settings;