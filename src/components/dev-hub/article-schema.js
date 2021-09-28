import React from 'react';
import { Helmet } from 'react-helmet';

const getAuthorsList = authors =>
    authors?.map(({ name }) => ({
        '@type': 'Person',
        name,
    }));

const ArticleSchema = ({
    authors,
    articleUrl,
    description,
    imageUrl,
    modifiedDate,
    publishedDate,
    tags,
    title,
    language = 'English',
}) => (
    <Helmet>
        <script id="structured-data" type="application/ld+json">
            {JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                url: articleUrl,
                headline: title,
                description,
                datePublished: publishedDate,
                dateModified: modifiedDate || publishedDate,
                mainEntityOfPage: {
                    '@type': 'WebPage',
                    url: articleUrl,
                },
                image: {
                    '@type': 'imageObject',
                    url: imageUrl,
                },
                publisher: {
                    '@type': 'Organization',
                    name: 'MongoDB',
                    logo: {
                        '@type': 'imageObject',
                        url: 'https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png',
                    },
                },
                author: getAuthorsList(authors),
                tags,
                inLanguage: language,
            })}
        </script>
    </Helmet>
);

export default ArticleSchema;
