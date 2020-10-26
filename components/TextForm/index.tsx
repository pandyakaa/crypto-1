import React, { FunctionComponent } from 'react';
import { Row, Button, Card } from 'react-bootstrap';
import FileSaver from 'file-saver';
import { useInput, useInputFile } from '@util/useInput';
import { createRequest } from '@util/requestUtil';

const TextForm: FunctionComponent = () => {
    const { value: keyFile, bind: bindKeyFile, setValue: setKeyFile } = useInputFile('');
    const { value: plainText, bind: bindPlainText, setValue: setPlainText } = useInput('');
    const { value: encryptedText, bind: bindEncryptedText, setValue: setEncryptedText } = useInput('');
    const { value: cipherKey, bind: bindCipherKey } = useInput('');
    const { value: algorithm, bind: bindAlgorithm } = useInput('rsa');
    const { value: executionTime, bind: bindExecutionTime, setValue: setExecutionTime } = useInput('');
    const { value: fileSize, bind: bindFileSize, setValue: setFileSize } = useInput('');

    const handleEncrypt = async () => {
        const requestObject = createRequest(algorithm, 'text', 'encrypt', cipherKey, plainText);
        const req = await fetch(requestObject.url, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestObject.body
        });
        let spaced = '';

        const response = await req.json();
        const splitted = response.splitted_ciphertext;
        for (let i = 0; i < splitted.length; i++) {
            spaced += splitted[i] + ' ';
        }
        setEncryptedText(response.ciphertext + `\n${spaced}`);
    };
    const handleDecrypt = async () => {
        const requestObject = createRequest(algorithm, 'text', 'decrypt', cipherKey, encryptedText);
        const req = await fetch(requestObject.url, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestObject.body
        });
        const response = await req.json();
        console.log(response);
        setPlainText(response.plaintext);
    };
    const handleDownload = () => {
        const blob = new Blob([encryptedText], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs(blob, 'decrypted-text.txt');
    };
    return (
        <>
            Plain text
            <textarea {...bindPlainText} name="message" rows={5} cols={70} />
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
                        Encrypt ↓
                    </Button>
                    <Button variant="primary" onClick={handleDecrypt}>
                        Decrypt ↑
                    </Button>
                </Row>
            </Card>
            Encrypted text
            <textarea {...bindEncryptedText} name="encrypted_message" rows={5} cols={70}>
                {encryptedText}
            </textarea>
            <Row className="mt-2 mb-2 justify-content-around">
                <Button variant="primary" onClick={handleDownload}>
                    Download Encrypted Text
                </Button>
            </Row>
            <Row className="mt-4 mb-1 justify-content-around">
                <div>Execution Time: {executionTime}</div>
                <div>File Size: {fileSize}</div>
            </Row>
        </>
    );
};

export default TextForm;
