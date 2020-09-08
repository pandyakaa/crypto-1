import React, { SFC } from 'react';
import { Tabs, Tab, Card, Row } from 'react-bootstrap';
import TextForm from '@components/TextForm';
import FileForm from '@components/FileForm';
import Head from 'next/head';

const Index: SFC = () => {
    return (
        <div>
            <Head>
                <title>Classic Cryptography</title>
            </Head>
            <Row className="vh-100 justify-content-center align-items-center">
                <Card style={{ width: '640px', height: '620px' }}>
                    <Card.Header>Encryption Tool</Card.Header>
                    <Card.Body>
                        <Tabs defaultActiveKey="text" id="input-type-tab" variant="pills">
                            <Tab className="p-2" eventKey="text" title="Encrypt Text">
                                <TextForm />
                            </Tab>
                            <Tab className="p-2" eventKey="file" title="Encrypt File">
                                <FileForm />
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Card>
            </Row>
        </div>
    );
};

export default Index;
