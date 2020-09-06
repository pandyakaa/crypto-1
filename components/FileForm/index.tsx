import React, { useState, FunctionComponent } from 'react';
import { Row, Button, Card } from 'react-bootstrap';
import { useInput } from '../../util/useInput';

const TextForm: FunctionComponent = () => {
    const { value: originalFile, bind: bindOriginalFile, setValue: setOriginalFile } = useInput(undefined);
    const { value: cipherKey, bind: bindCipherKey } = useInput('');
    const { value: algorithm, bind: bindAlgorithm } = useInput('Vignere Cipher');
    const handleEncrypt = () => {
        console.log(originalFile);
    };
    const handleDecrypt = () => {
        console.log(originalFile);
    };
    return (
        <>
            Original File
            <Row className="mt-3 mb-4 justify-content-center">
                <input {...bindOriginalFile} className="pl-5" type="file" />
            </Row>
            <Card bg="light">
                <Row className="mt-2 justify-content-around">
                    <input {...bindCipherKey} className="w-75" type="text" placeholder="key" />
                </Row>
                <Row className="mt-2 mb-2 justify-content-around">
                    <select {...bindAlgorithm}>
                        <option value="1">Vignere Cipher</option>
                        <option value="2">Full Vignere Cipher</option>
                        <option value="3">Auto Key Vignere Cipher</option>
                    </select>
                    <Button variant="primary" onClick={handleEncrypt}>
                        Encrypt
                    </Button>
                    <Button variant="primary" onClick={handleDecrypt}>
                        Decrypt
                    </Button>
                </Row>
            </Card>
        </>
    );
};

export default TextForm;
