import React from 'react';
import { Col, Container, Row } from 'react-bootstrap/esm';

const Footer = () => {
    return (
        <Container fluid style={{position: "absolute", bottom: 0, left: 0, color: "#737373", background: "#26272b"}}>
            <Row>
                <Col>
                        <div className="footer-copyright text-center py-3">© 2021 Copyright: Hadar Dayan
                        </div>
                </Col>
            </Row>
        </Container>
    );
}

export default Footer;