import React, { useState, FunctionComponent } from 'react';
import FileSaver from 'file-saver';
import { Row, Button, Card } from 'react-bootstrap';
import { useInput, useInputFile } from '@util/useInput';
import { createRequest } from '@util/requestUtil';

const TextForm: FunctionComponent = () => {
    const { value: originalFile, bind: bindOriginalFile, setValue: setOriginalFile } = useInputFile('');
    const { value: cipherKey, bind: bindCipherKey } = useInput('');
    const { value: algorithm, bind: bindAlgorithm } = useInput('vigenere');
    const handleEncrypt = async () => {
        const { url } = createRequest(algorithm, 'file', 'encrypt', cipherKey, '');
        const formData = new FormData();
        const filename = `encrypted-${originalFile[0].name}`;
        formData.append('file', originalFile[0]);
        formData.append('key', cipherKey);
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        const responseBlob = await response.blob();
        await FileSaver.saveAs(responseBlob, filename);
    };
    const handleDecrypt = async () => {
        const { url } = createRequest(algorithm, 'file', 'decrypt', cipherKey, '');
        const formData = new FormData();
        const filename = `decrypted-${originalFile[0].name}`;
        formData.append('file', originalFile[0]);
        formData.append('key', cipherKey);
        const response = await fetch(url, {
            method: 'POST',
            body: formData
        });
        const responseBlob = await response.blob();
        await FileSaver.saveAs(responseBlob, filename);
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
                        <option value="vigenere">Vigenere Cipher</option>
                        <option value="vigenere/full">Full Vigenere Cipher</option>
                        <option value="vigenere/auto">Auto Key Vigenere Cipher</option>
                        <option value="vigenere/extended">Extended Vigenere Cipher</option>
                        <option value="playfair">Playfair Cipher</option>
                        <option value="super">Super Encryption</option>
                        <option value="affine">Affine Cipher</option>
                        <option value="hill">Hill Cipher</option>
                        <option value="enigma">Enigma Cipher</option>
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
