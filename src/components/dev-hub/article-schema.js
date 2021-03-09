import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';

const getAuthorsList = authors =>
    authors?.map(({ name }) => {
        return {
            '@type': 'Person',
            name: name,
        };
    });

const ArticleSchema = ({
    articleUrl,
    title,
    description,
    publishedDate,
    modifiedDate,
    imageUrl,
    authors,
    language = 'English',
}) => (
    <Helmet>
        <script id="structured-data" type="application/ld+json">
            {JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'BlogPosting',
                url: articleUrl,
                headline: title,
                description: description,
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
                        url:
                            'https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png',
                    },
                },
                author: getAuthorsList(authors),
                inLanguage: language,
            })}
        </script>
    </Helmet>
);

ArticleSchema.propTypes = {
    articleUrl: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    publishedDate: PropTypes.string,
    modifiedDate: PropTypes.string,
    imageUrl: PropTypes.string,
    authors: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
        })
    ),
};

export default ArticleSchema;
