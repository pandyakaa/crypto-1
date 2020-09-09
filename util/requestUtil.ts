export const createRequest = (algorithm, type, func, key = '', message = '') => {
    const url = `http://11ce51fc8d04.ngrok.io/${func}/${type}/${algorithm}`;
    const body = {
        message: message,
        key: key
    };
    return { url: url, body: JSON.stringify(body) };
};
