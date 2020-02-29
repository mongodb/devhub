import React from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import ComponentFactory from './ComponentFactory';

const clearBottom = css`
    p:last-of-type {
        margin-bottom: 0;
    }
`;

const BlockQuote = ({ nodeData: { children }, ...rest }) => (
    <blockquote css={clearBottom}>
        {children.map((element, index) => (
            <ComponentFactory {...rest} nodeData={element} key={index} />
        ))}
    </blockquote>
);

BlockQuote.propTypes = {
    nodeData: PropTypes.shape({
        children: PropTypes.array.isRequired,
    }).isRequired,
};

export default BlockQuote;
