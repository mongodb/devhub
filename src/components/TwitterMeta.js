import React from 'react';
import { Helmet } from 'react-helmet';
import { getNestedText } from '../utils/get-nested-text';
import { useSiteMetadata } from '../hooks/use-site-metadata';

const isExternalUrl = /^http(s)?:\/\//;

const getImageSrc = (src, siteUrl) => {
    if (!src) {
        return null;
    }

    return isExternalUrl.test(src) ? src : siteUrl + src;
};

export default ({ nodeData: { children, options } }) => {
    const { siteUrl } = useSiteMetadata();
    const imgSrc = getImageSrc(options.image, siteUrl);

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
            {imgSrc && <meta property="og:image" content={imgSrc} />}
            {imgSrc && <meta property="twitter:image" content={imgSrc} />}
        </Helmet>
    );
};
