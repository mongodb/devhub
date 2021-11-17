const fetch = require('node-fetch');
const { uploadImageFromUrl } = require('./upload-image-from-url');

const findOrCreateAuthorInStrapi = async author => {
    const { name, image } = author;
    const authorEntry = await fetch(
        `http://localhost:1337/authors?name=${encodeURIComponent(name)}`
    );
    const resp = await authorEntry.json();
    if (resp && resp.length) {
        return resp[0]._id;
    }
    const authorImage = await uploadImageFromUrl(
        `https://www.mongodb.com/developer${image.slice(1)}`
    );
    const newAuthor = await fetch(`http://localhost:1337/authors`, {
        method: 'POST',
        body: JSON.stringify({ ...author, image: authorImage }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    const text = await newAuthor.json();
    return text._id;
};

module.exports = { findOrCreateAuthorInStrapi };
