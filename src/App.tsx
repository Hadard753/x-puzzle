import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useState } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';

import { Astar } from './algo/Astar';
import { BFS } from './algo/BFS';
import { IDS } from './algo/IDS';
import { getGoalState } from './algo/utils';
import Footer from './components/Footer';
import Result from './components/Result';
import Settings from './components/Settings';

function App() {
  const [solution, setSolution] = useState('');

  const solve = ({ size, algo, initialState }: { size: number, algo: string, initialState: number[] }) => {
    const goal = getGoalState(size);
    let solution: any;
    let result = '';
    switch(algo) {
      case "IDS": {solution = IDS(goal, initialState, 100); break;}
      case "BFS": {solution = BFS(goal, initialState); break;}
      default: {solution = Astar(goal, initialState); break;}
    }

    while(solution && solution.parent) {
        result = solution.move + result;
        solution = solution.parent;
    }

    setSolution(result  || "No solution , invalid initial state");
  }

  return (
    <Container>
      <Row>
        <Col><Settings onSubmit={solve}/></Col>
        <Col><Result solution={solution}/></Col>
      </Row>
      <Footer />
    </Container>
  );
}

export default App;
