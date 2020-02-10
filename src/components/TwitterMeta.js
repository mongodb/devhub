import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * Find the text node in a nested array
 * @param {Array} child an ast children array
 * @returns {String} description text
 */
const getDescriptionContent = child => {
    const firstChild = child[0];
    // If this child has child arrays keep digging
    if (firstChild.children) {
        return getDescriptionContent(firstChild.children);
    }
    // If we hit the text node we can return that value
    if (firstChild.type === 'text') {
        return firstChild.value;
    }
    // There wasn't any content
    return '';
};

export default ({ nodeData: { children, options } }) => (
    <Helmet>
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:site" content={options.site} />
        <meta name="twitter:creator" content={options.creator} />
        <meta property="og:title" content={options.title} />
        <meta
            property="og:description"
            content={getDescriptionContent(children)}
        />
        <meta property="og:image" content={options.image} />
    </Helmet>
);
