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
            datemodified,
            description,
            headline,
            logoUrl,
        } = articleInfo;
        schema['@type'] = 'BlogPosting';
        schema.headline = headline;
        schema.description = description;
        schema.datePublished = datePublished;
        schema.datemodified = datemodified;
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

/*

<script type="application/ld+json"> 
    {{'@context': 'https://schema.org',
    '@type': 'BlogPosting',
    url:'https://mongodb.com/blog/post/quick-start-java-and-mongodb--change-streams',  headline:'Quick Start: Java and MongoDB - Change Streams',                        description:'Learn how to use the Change Streams using the MongoDB Java Driver.',  datePublished: 'February 27, 2020',
    datemodified: 'February 27, 2020',
    mainEntityOfPage: {  
        '@type': 'WebPage',
        url:'https://mongodb.com/blog/post/quick-start-java-and-mongodb--change-streams',
    },
    image: {
        '@type': 'imageObject',
        url: 'https://webassets.mongodb.com/_com_assets/cms/Quick Start - Java (Blog)-r6hn1ky9vl.png',
    },
    publisher: {
        '@type': 'Organization', 
        name: 'MongoDB',
        logo: {
            '@type': 'imageObject',
            url: 'https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png',
            },
    },
    author: { '@type': 'Person', name: 'Maxime Beugnet' },                        inLanguage: 'English',
    articleBody: 'Learn how to use the Change Streams using the MongoDB Java Driver.',
    }}                </script> 

*/
