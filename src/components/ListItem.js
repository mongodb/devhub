import React from 'react';
import PropTypes from 'prop-types';
import ComponentFactory from './ComponentFactory';

const ListItem = ({ nodeData, ...rest }) => (
    <li>
        {/* div provides flex alignment with preceding bullet */}
        <div>
            {nodeData.children.map((child, index) => (
                <ComponentFactory
                    {...rest}
                    nodeData={child}
                    key={index}
                    // Include <p> tags in <li> if there is more than one paragraph
                    parentNode={
                        nodeData.children.length === 1 ? 'listItem' : undefined
                    }
                />
            ))}
        </div>
    </li>
);

ListItem.propTypes = {
    nodeData: PropTypes.shape({
        children: PropTypes.array.isRequired,
    }).isRequired,
};

export default ListItem;
