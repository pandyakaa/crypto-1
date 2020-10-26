import React, { FunctionComponent } from 'react';
import FileSaver from 'file-saver';
import { Row, Button, Card } from 'react-bootstrap';
import { useInput, useInputFile } from '@util/useInput';
import { createRequest } from '@util/requestUtil';

const TextForm: FunctionComponent = () => {
    const { value: originalFile, bind: bindOriginalFile, setValue: setOriginalFile } = useInputFile('');
    const { value: keyFile, bind: bindKeyFile, setValue: setKeyFile } = useInputFile('');
    const { value: cipherKey, bind: bindCipherKey } = useInput('');
    const { value: algorithm, bind: bindAlgorithm } = useInput('rsa');
    const { value: executionTime, bind: bindExecutionTime, setValue: setExecutionTime } = useInput('');
    const { value: fileSize, bind: bindFileSize, setValue: setFileSize } = useInput('');

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
                    <Row className="mt-2 mb-2 d-flex flex-column align-items-center">
                        Or Upload Key
                        <input {...bindKeyFile} className="pl-5" type="file" placeholder="" />
                    </Row>
                </Row>
                <Row className="mt-2 mb-2 justify-content-around">
                    <select {...bindAlgorithm}>
                        <option value="rsa">RSA</option>
                        <option value="elgamal">Elgamal</option>
                    </select>
                    <Button variant="primary" onClick={handleEncrypt}>
                        Encrypt
                    </Button>
                    <Button variant="primary" onClick={handleDecrypt}>
                        Decrypt
                    </Button>
                </Row>
            </Card>
            <Row className="mt-4 mb-1 justify-content-around">
                <div>Execution Time: {executionTime}</div>
                <div>File Size: {fileSize}</div>
            </Row>
        </>
    );
};

export default TextForm;
