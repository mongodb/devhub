import React from 'react';
import sanitizeHtml from 'sanitize-html';

const RawHTML = ({ nodeData }) => {
    const { value } = nodeData;
    const sanitizedHTML = sanitizeHtml(value, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedAttributes: false,
    });
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};

export default RawHTML;
