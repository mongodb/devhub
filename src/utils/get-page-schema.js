export const getPageSchema = (url, articleInfo = null) => {
    const schema = {
        '@context': 'http://schema.org',
        url: url,
    };
    const siteImageObject = {
        '@type': 'imageObject',
        url:
            'https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png',
    };
    if (articleInfo) {
        const {
            articleBody,
            author,
            datePublished,
            dateModified,
            description,
            headline,
            logoUrl,
        } = articleInfo;
        schema['@type'] = 'BlogPosting';
        schema.headline = headline;
        schema.description = description;
        schema.datePublished = datePublished;
        schema.dateModified = dateModified;
        schema.mainEntityOfPage = {
            '@type': 'WebPage',
            url: url,
        };
        schema.image = {
            '@type': 'imageObject',
            url: logoUrl,
        };
        schema.publisher = {
            '@type': 'Organization',
            name: 'MongoDB',
            logo: siteImageObject,
        };
        schema.author = {
            '@type': 'Person',
            // TODO address below to support multiple authors
            name: author ? author.name : null,
        };
        schema.inLanguage = 'English';
        schema.articleBody = articleBody;
    } else {
        schema['@type'] = 'Organization';
        schema.logo = siteImageObject;
    }
    return JSON.stringify(schema);
};
