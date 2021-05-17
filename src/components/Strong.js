import React from 'react';
import PropTypes from 'prop-types';
import ComponentFactory from './ComponentFactory';

const Strong = ({ nodeData }) => (
    <strong>
        {nodeData.children.map((child, index) => (
            <ComponentFactory nodeData={child} key={index} />
        ))}
    </strong>
);

Strong.propTypes = {
    nodeData: PropTypes.shape({
        children: PropTypes.arrayOf(
            PropTypes.shape({
                value: PropTypes.string.isRequired,
            })
        ).isRequired,
    }).isRequired,
};

export default Strong;
