import React from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import Form from 'react-bootstrap/Form';

const FileInputAndReader = ({onSubmit}: {onSubmit: any}) => {
    const handleFileChosen = (file: any) => {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            const lines = (fileReader.result as string || '').split(/\r\n|\r|\n/);
            const algo = lines[0] === "1" ? "IDS" : lines[0] === "2" ? "BFS" : "A *";
            const size = parseInt(lines[1]);
            const initialState = lines[2];
            onSubmit({ algo, size, initialState })
            // onSubmit(fileReader.result);
        };
        fileReader.readAsText(file);
    }

    return (
        <React.Fragment>
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
                            <input type="file" className="custom-file-input" id="inputGroupFile04" accept=".txt" onChange={e => handleFileChosen((e.target.files as any)[0])}/>
                        </div>
                    </div>
                </Col>
            </Row>
       </React.Fragment>
    );
}

export default FileInputAndReader;