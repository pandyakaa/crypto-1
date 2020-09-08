export const createRequest = (algorithm, type, func, key = '', message = '') => {
    const url = `http://127.0.0.1:5000/${func}/${type}/${algorithm}`;
    const body = {
        message: message,
        key: key
    };
    return { url: url, body: JSON.stringify(body) };
};
