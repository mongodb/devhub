const axios = require('axios');
const fs = require('fs');
const path = require('path');
const os = require('os');
const FormData = require('form-data');
const fetch = require('node-fetch');

const uploadImageFromUrl = async (fileUrl, subPath) => {
    if (!fileUrl) return;
    const resp = await axios.get(fileUrl, {
        responseType: 'arraybuffer',
    });
    const newpath = await fs.promises.mkdtemp(
        path.join(os.tmpdir(), `${subPath}-`)
    );
    await fs.promises.writeFile(
        `${newpath}${fileUrl
            .replace('https://www.mongodb.com/developer', '')
            .replace(/\//g, '_')}`,
        resp.data
    );
    const form_data = new FormData();
    form_data.append('files', resp.data, fileUrl);
    try {
        const r = await fetch('http://localhost:1337/upload', {
            method: 'POST',
            body: form_data,
        });
        const js = await r.json();
        return js[0]._id;
    } catch (error) {
        console.log(error);
        console.log(error.response.data.data);
    }
    return;
};

module.exports = { uploadImageFromUrl };
