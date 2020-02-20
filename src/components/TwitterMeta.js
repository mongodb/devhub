import React from 'react';
import { Helmet } from 'react-helmet';
import { getNestedText } from '../utils/get-nested-text';

export default ({ nodeData: { children, options } }) => (
    <Helmet>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={options.site} />
        <meta name="twitter:creator" content={options.creator} />
        <meta property="twitter:title" content={options.title} />
        <meta
            property="twitter:description"
            content={getNestedText(children)}
        />
        <meta property="twitter:image" content={options.image} />
    </Helmet>
);
