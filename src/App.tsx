import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useRef, useState } from 'react';
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
  const file = { fileType: "text", status: "" };
  const [fileUrl, seFileUrl] = useState('');
  let dofileDownload: any;

  useEffect(() => {
    if(fileUrl) {
      dofileDownload.click();
      URL.revokeObjectURL(fileUrl);  // free up storage--no longer needed.
      seFileUrl("")
    }
  }, [fileUrl])

  const exportSolution = (content: string) => {
    // Download it
    const blob = new Blob([content]);
    const fileDownloadUrl = URL.createObjectURL(blob);
    seFileUrl(fileDownloadUrl)
  }

  const solve = ({ size, algo, initialState, download }: { size: number, algo: string, initialState: number[], download?: boolean }) => {
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

    if(download) {
      exportSolution(result  || "No solution , invalid initial state");
    }
    setSolution(result  || "No solution , invalid initial state");
  }

  return (
    <Container fluid>
      <Row style={{marginBottom: "0", marginTop: "0", height: "94vh"}}>
        <Col style={{backgroundColor: "#AC8691"}}><Settings onSubmit={solve}/></Col>
        <Col style={{backgroundColor: "#d9b8c4"}}><Result solution={solution}/></Col>
      </Row>
      <Footer />
      <a style={{display: "none"}}
          download={"output"}
          href={fileUrl}
          ref={input => dofileDownload = input}
      >download it</a>
    </Container>
  );
}

export default App;
