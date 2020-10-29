import React, { FunctionComponent } from 'react';
import { Row, Button, Card, Tabs, Tab } from 'react-bootstrap';
import FileSaver from 'file-saver';
import { useInput, useInputFile, useInputInt } from '@util/useInput';

const Encryption: FunctionComponent = () => {
    const { value: nValue, bind: bindNValue, setValue: setNValue } = useInput('');
    const { value: gValue, bind: bindGValue, setValue: setGValue } = useInput('');
    const { value: xValue, bind: bindXValue, setValue: setXValue } = useInput('');
    const { value: yValue, bind: bindYValue, setValue: setYValue } = useInput('');
    const { value: keyValue, bind: bindKeyValue, setValue: setKeyValue } = useInput('');
    const { value: executionTime, bind: bindExecutionTime, setValue: setExecutionTime } = useInput('...');

    const handleGenerateKey = async () => {
        const body = {
            n: parseInt(nValue),
            g: parseInt(gValue),
            x: parseInt(xValue),
            y: parseInt(yValue)
        };

        const req = await fetch(process.env.NEXT_PUBLIC_API_URL + '/key/diffie', {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const response = await req.json();
        setKeyValue(response.secret_key);
        setExecutionTime(response.time + ' second');
    };

    return (
        <div className="container">
            <div className="row pt-4">
                <div className="col d-flex flex-column">
                    n
                    <textarea {...bindNValue} name="nValue" rows={4} cols={50} />
                </div>
                <div className="col d-flex flex-column">
                    g
                    <textarea {...bindGValue} name="gValue" rows={4} cols={50} />
                </div>
            </div>
            <div className="row pt-4">
                <div className="col d-flex flex-column">
                    For Alice (x)
                    <textarea {...bindXValue} name="xValue" rows={4} cols={50} />
                </div>
                <div className="col d-flex flex-column">
                    For Bob (y)
                    <textarea {...bindYValue} name="yValue" rows={4} cols={50} />
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
                    <textarea {...bindKeyValue} className="w-100" name="key" rows={2} cols={50} />
                </div>
            </div>
            <div className="row pt-4">
                <div className="col">Execution Time: {executionTime}</div>
            </div>
        </div>
    );
};

export default Encryption;
