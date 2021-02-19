import dlv from 'dlv';

export const uploadImagesToStrapi = async images => {
    const form_data = new FormData();
    images.forEach(img => {
        form_data.append('files', img);
    });
    const r = await fetch(`${process.env.STRAPI_URL}/upload`, {
        'Content-Type': 'multipart/form-data',
        method: 'post',
        body: form_data,
    });
    const resp = await r.json();
    try {
        return { success: true, data: resp.map(r => r._id) };
    } catch (e) {
        // Something failed in image upload
        const errorMsg = dlv(
            resp,
            'data.errors.0.message',
            'An unknown error occurred'
        );
        return { success: false, data: `${resp.error} ${errorMsg}` };
    }
};
