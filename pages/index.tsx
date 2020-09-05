import React, { SFC } from 'react';
import { Tabs, Tab, Card, Container, Row } from 'react-bootstrap';

const Index: SFC = () => {
    return (
        <Row className="vh-100 justify-content-center align-items-center">
            <Card style={{ width: '640px', height: '480px' }}>
                <Card.Header>Encryption</Card.Header>
                <Card.Body>
                    <Tabs defaultActiveKey="text" id="input-type-tab" variant="pills">
                        <Tab eventKey="text" title="Encrypt Text">
                            Text
                        </Tab>
                        <Tab eventKey="file" title="Encrypt File">
                            File
                        </Tab>
                    </Tabs>
                </Card.Body>
            </Card>
        </Row>
    );
};

export default Index;
