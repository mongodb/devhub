import React from 'react';
import { Helmet } from 'react-helmet';
import { getNestedText } from '../utils/get-nested-text';
import { useSiteMetadata } from '../hooks/use-site-metadata';

const isExternalUrl = /^http(s)?:\/\//;

const getImageMeta = (src, siteUrl) => {
    if (!src) {
        return null;
    }
    let content = isExternalUrl.test(src) ? src : siteUrl + src;

    return (
        <>
            <meta property="og:image" content={content} />
            <meta property="twitter:image" content={content} />
        </>
    );
};

export default ({ nodeData: { children, options } }) => {
    const { siteUrl } = useSiteMetadata();
    return (
        <Helmet>
            <meta name="twitter:card" content="summary" />
            <meta name="twitter:site" content={options.site} />
            <meta name="twitter:creator" content={options.creator} />
            <meta property="twitter:title" content={options.title} />
            <meta
                property="twitter:description"
                content={getNestedText(children)}
            />
            {getImageMeta(options.image, siteUrl)}
        </Helmet>
    );
};
