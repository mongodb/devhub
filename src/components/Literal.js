import React from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import ComponentFactory from './ComponentFactory';

const breakWordOverflow = css`
    overflow-wrap: break-word;
`;

const Literal = ({ nodeData: { children } }) => (
    <code css={breakWordOverflow}>
        {children.map((node, i) => (
            <ComponentFactory nodeData={node} key={i} />
        ))}
    </code>
);

Literal.propTypes = {
    nodeData: PropTypes.shape({
        children: PropTypes.arrayOf(PropTypes.object).isRequired,
    }).isRequired,
};

export default Literal;
