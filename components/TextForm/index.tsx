import React, { FunctionComponent } from 'react';
import { Row, Button, Card } from 'react-bootstrap';
import { useInput } from '@util/useInput';
import { createRequest } from '@util/requestUtil';

const TextForm: FunctionComponent = () => {
    const { value: plainText, bind: bindPlainText, setValue: setPlainText } = useInput('');
    const { value: decryptedText, bind: bindDecryptedText, setValue: setDecryptedText } = useInput('');
    const { value: cipherKey, bind: bindCipherKey } = useInput('');
    const { value: algorithm, bind: bindAlgorithm } = useInput('vignere');
    const handleEncrypt = async () => {
        // setDecryptedText(plainText + ' - ' + algorithm + ' - ' + cipherKey);
        const requestObject = createRequest(algorithm, 'text', 'encrypt', cipherKey, plainText);
        console.log(requestObject);
        const req = await fetch(requestObject.url, {
            mode: 'cors',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: requestObject.body
        });
        const response = await req.json();
        setDecryptedText(response.ciphertext);
    };
    const handleDecrypt = () => {
        setPlainText(decryptedText + ' - ' + algorithm + ' - ' + cipherKey);
    };
    const handleDownload = () => {
        alert('download');
    };
    return (
        <>
            Plain text
            <textarea {...bindPlainText} name="message" rows={5} cols={70} />
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
                        Encrypt ↓
                    </Button>
                    <Button variant="primary" onClick={handleDecrypt}>
                        Decrypt ↑
                    </Button>
                </Row>
            </Card>
            Encrypted text
            <textarea {...bindDecryptedText} name="encrypted_message" rows={5} cols={70}>
                {decryptedText}
            </textarea>
            <Row className="mt-2 mb-2 justify-content-around">
                <Button variant="primary" onClick={handleDownload}>
                    Download Encrypted Text
                </Button>
            </Row>
        </>
    );
};

export default TextForm;
