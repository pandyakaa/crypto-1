import React, { FunctionComponent } from 'react';
import { Row, Button } from 'react-bootstrap';

const TextForm: FunctionComponent = () => {
    return (
        <>
            Enter your text
            <textarea name="message" rows={5} cols={70} />
            <select>
                <option>Vignere Cipher</option>
                <option>Full Vignere Cipher</option>
                <option>Auto Key Vignere Cipher</option>
            </select>
            <Row className="mt-2 justify-content-center">
                <Button variant="primary">Encrypt</Button>
            </Row>
            Encrypted text
            <textarea name="encrypted_message" rows={5} cols={70} />
        </>
    );
};

export default TextForm;
