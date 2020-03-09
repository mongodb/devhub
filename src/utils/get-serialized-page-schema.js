export const getSerializedPageSchema = (url, articleInfo = null) => {
    const schema = {
        '@context': 'http://schema.org',
        url: url,
    };
    if (articleInfo) {
        schema['@type'] = 'BlogPosting';
        schema.article = articleInfo;
    } else {
        schema['@type'] = 'Organization';
        schema.logo = {
            '@type': 'imageObject',
            url:
                'https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png',
        };
    }
    return JSON.stringify(schema);
};
