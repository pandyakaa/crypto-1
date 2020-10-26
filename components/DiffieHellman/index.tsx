import React, { FunctionComponent } from 'react';
import { Row, Button, Card, Tabs, Tab } from 'react-bootstrap';
import FileSaver from 'file-saver';
import { useInput, useInputFile } from '@util/useInput';
import { createRequest } from '@util/requestUtil';

const Encryption: FunctionComponent = () => {
    const handleGenerateKey = () => {
        alert('generate key');
    };

    return (
        <div className="container">
            <div className="row pt-4">
                <div className="col d-flex flex-column">
                    n
                    <textarea name="nValue" rows={4} cols={50} />
                </div>
                <div className="col d-flex flex-column">
                    g
                    <textarea name="gValue" rows={4} cols={50} />
                </div>
            </div>
            <div className="row pt-4">
                <div className="col d-flex flex-column">
                    For Alice (x)
                    <textarea name="xValue" rows={4} cols={50} />
                </div>
                <div className="col d-flex flex-column">
                    For Bob (y)
                    <textarea name="yValue" rows={4} cols={50} />
                </div>
            </div>
            <div className="row pt-4 w-100 d-flex justify-content-center">
                <Button variant="primary" className="btn-block w-50" onClick={handleGenerateKey}>
                    Generate Key
                </Button>
            </div>
            <div className="row pt-4 d-flex w-100 justify-content-center">
                <div className="col d-flex flex-column">
                    Key (K)
                    <textarea className="w-100" name="key" rows={2} cols={50} />
                </div>
            </div>
        </div>
    );
};

export default Encryption;
