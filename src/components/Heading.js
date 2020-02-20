import React from 'react';
import PropTypes from 'prop-types';
import { H1, H2, H3, H4, H5 } from './dev-hub/text';

const HeadingMap = {
    1: H1,
    2: H2,
    3: H3,
    4: H4,
    5: H5,
};

const Heading = ({ sectionDepth, nodeData }) => {
    const HeadingTag =
        sectionDepth >= 1 && sectionDepth <= 5
            ? HeadingMap[sectionDepth]
            : HeadingMap[5];
    return (
        <HeadingTag>
            {nodeData.children
                .map(({ type, value }) => (type === 'text' ? value : ''))
                .join(' ')}
        </HeadingTag>
    );
};

Heading.propTypes = {
    sectionDepth: PropTypes.number.isRequired,
    nodeData: PropTypes.shape({
        children: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.string,
            })
        ).isRequired,
    }).isRequired,
};

export default Heading;
