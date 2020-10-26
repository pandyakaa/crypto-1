import React, { FunctionComponent } from 'react';
import { Row, Button, Card, Tabs, Tab } from 'react-bootstrap';
import FileSaver from 'file-saver';
import { useInput, useInputFile } from '@util/useInput';
import { createRequest } from '@util/requestUtil';

const Encryption: FunctionComponent = () => {
    const handleGenerateKey = () => {
        alert('generate key');
    };

    const handleDownloadKey = () => {
        alert('download key');
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
                <div className="col-2">
                    <Button variant="primary" className="btn-block" onClick={handleGenerateKey}>
                        Generate Key
                    </Button>
                    <Button variant="primary" className="btn-block" onClick={handleDownloadKey}>
                        Download Key
                    </Button>
                    <select className="mt-3" style={{ width: '100%' }}>
                        <option value="rsa">RSA</option>
                        <option value="elgamal">Elgamal</option>
                    </select>
                </div>
                <div className="col">
                    Public Key
                    <textarea name="publicKey" rows={8} cols={50} />
                </div>
                <div className="col">
                    Private Key
                    <textarea name="privateKey" rows={8} cols={50} />
                </div>
            </div>
            <div className="row pt-4 w-100 h-100">
                <Tabs defaultActiveKey="text" className="w-100" id="type-tab" variant="pills">
                    <Tab eventKey="text" title="Text">
                        <div className="row pt-4 w-100">
                            <div className="col">
                                Plaintext
                                <textarea name="privateKey" rows={4} cols={50} />
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
                                <textarea name="privateKey" rows={4} cols={50} />
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
        </div>
    );
};

export default Encryption;
