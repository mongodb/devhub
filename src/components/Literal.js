import React from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import { getNestedValue } from '../utils/get-nested-value';

const breakWordOverflow = css`
    overflow-wrap: break-word;
`;

const Literal = ({ nodeData }) => (
    <code className="docutils literal notranslate">
        <span className="pre" css={breakWordOverflow}>
            {getNestedValue(['children', 0, 'value'], nodeData)}
        </span>
    </code>
);

Literal.propTypes = {
    nodeData: PropTypes.shape({
        children: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default Literal;
