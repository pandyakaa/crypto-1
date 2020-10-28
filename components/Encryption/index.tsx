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

    const handleUploadKey = () => {
        alert('upload key');
    };

    const handleDownloadKey = () => {
        const publicBlob = new Blob([publicKey], { type: 'text/plain;charset=utf-8' });
        const privateBlob = new Blob([privateKey], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs(publicBlob, 'public.pub');
        FileSaver.saveAs(privateBlob, 'private.pri');
    };

    const handleEncrypt = () => {
        alert('encrypt');
    };

    const handleDecrypt = () => {
        alert('decrypt');
    };

    const handleDownloadText = () => {
        alert('download text');
    };

    const handleEncryptFile = () => {
        alert('encrypt file');
    };

    const handleDecryptFile = () => {
        alert('decrypt file');
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
                    <input className="m-auto" type="file" />
                    Upload Private Key
                    <input className="m-auto" type="file" />
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
                                <textarea name="plaintext" rows={4} cols={50} />
                            </div>
                            <div className="col-2 mr-2">
                                <Button variant="primary" className="btn-block" onClick={handleEncrypt}>
                                    Encrypt →
                                </Button>
                                <Button variant="primary" className="btn-block" onClick={handleDecrypt}>
                                    Decrypt ←
                                </Button>
                                <Button variant="primary" className="btn-block" onClick={handleDownloadText}>
                                    Download as .txt
                                </Button>
                            </div>
                            <div className="col">
                                Ciphertext
                                <textarea name="ciphertext" rows={4} cols={50} />
                            </div>
                        </div>
                    </Tab>
                    <Tab eventKey="file" className="w-100" title="File">
                        <div className="row pt-4" style={{ width: '360px' }}>
                            <input className="m-auto" type="file" />
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
                <div className="col">Execution Time: {executionTime}</div>
                <div className="col">File Size: {fileSize}</div>
            </div>
        </div>
    );
};

export default Encryption;
