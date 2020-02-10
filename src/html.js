import React from 'react';
import PropTypes from 'prop-types';
import { withPrefix } from 'gatsby';

const HTML = ({
    body,
    bodyAttributes,
    headComponents,
    htmlAttributes,
    preBodyComponents,
    postBodyComponents,
}) => (
    <html lang="en" {...htmlAttributes}>
        <head>
            <meta charSet="utf-8" />
            <meta httpEquiv="x-ua-compatible" content="ie=edge" />
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta name="robots" content="index" />
            <meta name="release" content="1.0" />
            <meta name="version" content="master" />

            <link
                href="https://fonts.googleapis.com/css?family=Fira+Mono:700&display=swap"
                rel="stylesheet"
            />
            <link
                rel="shortcut icon"
                href="https://media.mongodb.org/favicon.ico"
            />

            {headComponents}
        </head>
        <body {...bodyAttributes}>
            <script async src={withPrefix('scripts/segment.js')} />
            {preBodyComponents}
            {/* eslint-disable-next-line react/no-danger */}
            <div
                key="body"
                id="___gatsby"
                dangerouslySetInnerHTML={{ __html: body }}
            />
            {postBodyComponents}
        </body>
    </html>
);

HTML.propTypes = {
    /* eslint-disable react/forbid-prop-types */
    htmlAttributes: PropTypes.object.isRequired,
    headComponents: PropTypes.array.isRequired,
    bodyAttributes: PropTypes.object.isRequired,
    preBodyComponents: PropTypes.array.isRequired,
    body: PropTypes.string.isRequired,
    postBodyComponents: PropTypes.array.isRequired,
    /* eslint-enable react/forbid-prop-types */
};

export default HTML;
