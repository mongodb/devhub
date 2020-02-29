import React from 'react';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import ComponentFactory from './ComponentFactory';
import { P } from './dev-hub/text';
import { size } from './dev-hub/theme';

const contentStyles = css`
    margin-bottom: ${size.articleContent};
`;

const SKIP_P_TAGS = ['caption', 'listItem', 'listTable', 'footnote'];

const Paragraph = ({ nodeData, parentNode, ...rest }) => {
    // For paragraph nodes that appear inside certain containers, skip <p> tags and just render their contents
    if (SKIP_P_TAGS.includes(parentNode)) {
        return nodeData.children.map((element, index) => (
            <ComponentFactory {...rest} nodeData={element} key={index} />
        ));
    }
    return (
        <P css={contentStyles}>
            {nodeData.children.map((element, index) => (
                <ComponentFactory {...rest} nodeData={element} key={index} />
            ))}
        </P>
    );
};

Paragraph.propTypes = {
    nodeData: PropTypes.shape({
        children: PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.string.isRequired,
                value: PropTypes.string,
            })
        ).isRequired,
    }).isRequired,
    parentNode: PropTypes.string,
};

Paragraph.defaultProps = {
    parentNode: undefined,
};

export default Paragraph;
