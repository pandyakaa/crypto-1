export const downloadAsFile = (content, filename, encrypt, binary) => {
    let file;

    if (binary && !encrypt) {
        // const unitArray = [];
        // for (let i = 0; i < content.length; i++) {
        //     unitArray.push(ctob256(content[i]));
        // }
    } else {
        file = new Blob([content]);
    }

    const el = document.createElement('a');
    el.href = URL.createObjectURL(file);
    el.download = filename;
    document.body.appendChild(el);
    el.click();
    document.body.removeChild(el);
};
