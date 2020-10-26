import React, { SFC } from 'react';
import { Tabs, Tab, Card, Row } from 'react-bootstrap';
import TextForm from '@components/TextForm';
import FileForm from '@components/FileForm';
import Encryption from '@components/Encryption';
import DiffieHellman from '@components/DiffieHellman';
import Head from 'next/head';

const Index: SFC = () => {
    return (
        <div>
            <Head>
                <title>Modern Cryptography</title>
            </Head>
            <Row className="vh-100 vw-100 justify-content-center align-items-center">
                <Card style={{ width: '1280px', height: '720px' }}>
                    <Card.Header>Encryption Tool</Card.Header>
                    <Card.Body>
                        <Tabs defaultActiveKey="encryption" id="input-type-tab" variant="pills">
                            <Tab className="p-2" eventKey="encryption" title="RSA / Elgamal">
                                <Encryption />
                            </Tab>
                            <Tab className="p-2" eventKey="diffieHellman" title="Diffie-Hellman">
                                <DiffieHellman />
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Card>
            </Row>
        </div>
    );
};

export default Index;
