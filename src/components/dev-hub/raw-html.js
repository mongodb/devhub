import React from 'react';
import sanitizeHtml from 'sanitize-html';

const isInlineElement = html => html === '<br />';

const RawHTML = ({ nodeData }) => {
    const { value } = nodeData;
    const sanitizedHTML = sanitizeHtml(value, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedAttributes: false,
    });
    if (isInlineElement(sanitizedHTML)) {
        return <span dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
    }
    return <div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />;
};

export default RawHTML;
