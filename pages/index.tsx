import React, { SFC } from 'react';
import { Tabs, Tab, Card, Row, Button } from 'react-bootstrap';
import TextForm from '@components/TextForm';

const Index: SFC = () => {
    return (
        <Row className="vh-100 justify-content-center align-items-center">
            <Card style={{ width: '640px', height: '540px' }}>
                <Card.Header>Encryption</Card.Header>
                <Card.Body>
                    <Tabs defaultActiveKey="text" id="input-type-tab" variant="pills">
                        <Tab className="p-2" eventKey="text" title="Encrypt Text">
                            <TextForm />
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
