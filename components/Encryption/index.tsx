import React, { FunctionComponent } from 'react';
import { Row, Button, Card, Tabs, Tab } from 'react-bootstrap';
import FileSaver from 'file-saver';
import { useInput, useInputFile } from '@util/useInput';
import { createRequest } from '@util/requestUtil';

const Encryption: FunctionComponent = () => {
    const { value: algorithm, bind: bindAlgorithm } = useInput('rsa');
    const { value: publicKey, bind: bindPublicKey, setValue: setPublicKey } = useInput('');
    const { value: privateKey, bind: bindPrivateKey, setValue: setPrivateKey } = useInput('');
    const { value: executionTime, bind: bindExecutionTime, setValue: setExecutionTime } = useInput('...');
    const { value: fileSize, bind: bindFileSize, setValue: setFileSize } = useInput('...');
    const { value: plainText, bind: bindPlainText, setValue: setPlainText } = useInput('');
    const { value: cipherText, bind: bindCipherText, setValue: setCipherText } = useInput('');
    const { value: originalFile, bind: bindOriginalFile, setValue: setOriginalFile } = useInputFile('');

    const handleGenerateKey = async () => {
        let req;
        switch (algorithm) {
            case 'rsa':
                req = await fetch(process.env.NEXT_PUBLIC_API_URL + '/key/rsa', {
                    mode: 'cors',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                break;
            case 'elgamal':
                req = await fetch(process.env.NEXT_PUBLIC_API_URL + '/key/elgamal', {
                    mode: 'cors',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                break;
            default:
                break;
        }

        const response = await req.json();
        setPublicKey(response.public_key);
        setPrivateKey(response.private_key);
    };

    const handleUploadPublicKey = (e) => {
        const reader = new FileReader();
        reader.onload = async () => {
            const text = reader.result;
            setPublicKey(text);
        };
        reader.readAsText(e.target.files[0]);
    };

    const handleUploadPrivateKey = (e) => {
        const reader = new FileReader();
        reader.onload = async () => {
            const text = reader.result;
            setPrivateKey(text);
        };
        reader.readAsText(e.target.files[0]);
    };

    const handleDownloadKey = () => {
        const publicBlob = new Blob([publicKey], { type: 'text/plain;charset=utf-8' });
        const privateBlob = new Blob([privateKey], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs(publicBlob, 'public.pub');
        FileSaver.saveAs(privateBlob, 'private.pri');
    };

    const handleEncrypt = async () => {
        let endpoint;
        switch (algorithm) {
            case 'rsa':
                endpoint = '/encrypt/text/rsa';
                break;
            case 'elgamal':
                endpoint = '/encrypt/text/elgamal';
                break;
        }

        const body = {
            message: plainText,
            public_key: publicKey
        };

        const req = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await req.json();
        setCipherText(response.ciphertext);
        setExecutionTime('Execution Time: ' + response.time + ' second');
    };

    const handleDecrypt = async () => {
        let endpoint;
        switch (algorithm) {
            case 'rsa':
                endpoint = '/decrypt/text/rsa';
                break;
            case 'elgamal':
                endpoint = '/decrypt/text/elgamal';
                break;
        }

        const body = {
            message: cipherText,
            private_key: privateKey
        };

        const req = await fetch(process.env.NEXT_PUBLIC_API_URL + '/decrypt/text/rsa', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await req.json();
        setPlainText(response.plaintext);
        setExecutionTime('Execution Time: ' + response.time + ' second');
    };

    const handleDownloadCiphertext = () => {
        const blob = new Blob([cipherText], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs(blob, 'ciphertext.txt');
    };

    const handleEncryptFile = async () => {
        let endpoint;
        switch (algorithm) {
            case 'rsa':
                endpoint = '/encrypt/file/rsa';
                break;
            case 'elgamal':
                endpoint = '/encrypt/file/elgamal';
                break;
        }

        const formData = new FormData();
        formData.append('file', originalFile[0]);
        formData.append('public_key', publicKey);

        const req = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
            method: 'POST',
            body: formData
        });

        const response = await req.json();
        setExecutionTime('Execution Time: ' + response.time + ' second');
        setFileSize('File Size: ' + response.file_size + ' byte');

        const fileBody = {
            path: response.file_loc
        };

        const reqFile = await fetch(process.env.NEXT_PUBLIC_API_URL + '/download', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fileBody)
        });

        const responseBlob = await reqFile.blob();
        await FileSaver.saveAs(responseBlob);
    };

    const handleDecryptFile = async () => {
        let endpoint;
        switch (algorithm) {
            case 'rsa':
                endpoint = '/decrypt/file/rsa';
                break;
            case 'elgamal':
                endpoint = '/decrypt/file/elgamal';
                break;
        }

        const formData = new FormData();
        formData.append('file', originalFile[0]);
        formData.append('private_key', privateKey);

        const req = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
            method: 'POST',
            body: formData
        });

        const response = await req.json();
        setExecutionTime('Execution Time: ' + response.time + ' second');
        setFileSize('File Size: ' + response.file_size + ' byte');

        const fileBody = {
            path: response.file_loc
        };

        const reqFile = await fetch(process.env.NEXT_PUBLIC_API_URL + '/download', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(fileBody)
        });

        const responseBlob = await reqFile.blob();
        await FileSaver.saveAs(responseBlob);
    };

    return (
        <div className="container">
            <div className="row rounded bg-light pt-4 pb-4">
                <div className="col">
                    <Button variant="primary" className="btn-block" onClick={handleGenerateKey}>
                        Generate Key
                    </Button>
                    <Button variant="primary" className="btn-block mb-2" onClick={handleDownloadKey}>
                        Download Key
                    </Button>
                    Upload Public Key
                    <input className="m-auto" type="file" onChange={(e) => handleUploadPublicKey(e)} />
                    Upload Private Key
                    <input className="m-auto" type="file" onChange={(e) => handleUploadPrivateKey(e)} />
                    <select {...bindAlgorithm} className="mt-3" style={{ width: '100%' }}>
                        <option value="rsa">RSA</option>
                        <option value="elgamal">Elgamal</option>
                    </select>
                </div>
                <div className="col">
                    Public Key
                    <textarea {...bindPublicKey} name="publicKey" rows={8} cols={40} />
                </div>
                <div className="col">
                    Private Key
                    <textarea {...bindPrivateKey} name="privateKey" rows={8} cols={40} />
                </div>
            </div>
            <div className="row pt-4 w-100 h-100">
                <Tabs defaultActiveKey="text" className="w-100" id="type-tab" variant="pills">
                    <Tab eventKey="text" title="Text">
                        <div className="row pt-4 w-100">
                            <div className="col">
                                Plaintext
                                <textarea {...bindPlainText} name="plaintext" rows={4} cols={50} />
                            </div>
                            <div className="col-2 mr-2">
                                <Button variant="primary" className="btn-block" onClick={handleEncrypt}>
                                    Encrypt →
                                </Button>
                                <Button variant="primary" className="btn-block" onClick={handleDecrypt}>
                                    Decrypt ←
                                </Button>
                                <Button variant="primary" className="btn-block" onClick={handleDownloadCiphertext}>
                                    Download as .txt
                                </Button>
                            </div>
                            <div className="col">
                                Ciphertext
                                <textarea {...bindCipherText} name="ciphertext" rows={4} cols={50} />
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="file" className="w-100" title="File">
                        <div className="row pt-4" style={{ width: '360px' }}>
                            <input {...bindOriginalFile} className="m-auto" type="file" />
                            <Button variant="primary" className="mt-4 ml-3 btn-block" onClick={handleEncryptFile}>
                                Encrypt
                            </Button>
                            <Button variant="primary" className="ml-3 btn-block" onClick={handleDecryptFile}>
                                Decrypt
                            </Button>
                        </div>
                    </Tab>
                </Tabs>
            </div>
            <div className="row pt-4">
                <div className="col">{executionTime}</div>
                <div className="col">{fileSize}</div>
            </div>
        </div>
    );
};

export default Encryption;
