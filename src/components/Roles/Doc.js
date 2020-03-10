import React from 'react';
import PropTypes from 'prop-types';
import ComponentFactory from '../ComponentFactory';
import { formatText } from '../../utils/format-text';
import { getNestedValue } from '../../utils/get-nested-value';
import Link from '../Link';

const RoleDoc = ({ nodeData: { children, target }, slugTitleMapping }) => {
    if (children.length) {
        return (
            <Link to={target} className="ref-doc-children">
                {children.map((node, i) => (
                    <ComponentFactory key={i} nodeData={node} />
                ))}
            </Link>
        );
    }
    const key = target.startsWith('/') ? target.slice(1) : target;
    const text = getNestedValue([key], slugTitleMapping);
    const labelDisplay = text ? formatText(slugTitleMapping[key]) : target;
    return (
        <Link to={target} className="ref-doc-slug">
            {labelDisplay}
        </Link>
    );
};

RoleDoc.propTypes = {
    nodeData: PropTypes.shape({
        children: PropTypes.arrayOf(PropTypes.node).isRequired,
        target: PropTypes.string.isRequired,
    }).isRequired,
    slugTitleMapping: PropTypes.shape({
        [PropTypes.string]: PropTypes.oneOf([
            PropTypes.array,
            PropTypes.string,
        ]),
    }),
};

export default RoleDoc;
