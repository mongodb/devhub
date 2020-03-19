import React from 'react';
import { Helmet } from 'react-helmet';
import { getNestedText } from '../utils/get-nested-text';
import { useSiteMetadata } from '../hooks/use-site-metadata';

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
            <meta property="twitter:image" content={siteUrl + options.image} />

            <meta property="og:image" content={siteUrl + options.image} />
        </Helmet>
    );
};
