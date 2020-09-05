import React, { useState, FunctionComponent } from 'react';
import { Row, Button } from 'react-bootstrap';
import { useInput } from '../../util/useInput';

const TextForm: FunctionComponent = () => {
    const { value: plainText, bind: bindPlainText, setValue: setPlainText } = useInput('');
    const { value: decryptedText, bind: bindDecryptedText, setValue: setDecryptedText } = useInput('');
    const { value: algorithm, bind: bindAlgorithm } = useInput('Vignere Cipher');
    const handleEncrypt = () => {
        setDecryptedText(plainText + ' - ' + algorithm);
    };
    const handleDecrypt = () => {
        setPlainText(decryptedText + ' - ' + algorithm);
    };
    return (
        <>
            Plain text
            <textarea {...bindPlainText} name="message" rows={5} cols={70} />
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
            Encrypted text
            <textarea {...bindDecryptedText} name="encrypted_message" rows={5} cols={70}>
                {decryptedText}
            </textarea>
        </>
    );
};

export default TextForm;
