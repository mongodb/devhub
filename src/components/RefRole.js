import React from 'react';
import PropTypes from 'prop-types';
import ComponentFactory from './ComponentFactory';
import Link from './Link';

const RefRole = ({ nodeData: { children, fileid, target, url }, slug }) => {
    const link = fileid === slug ? `#${target}` : `${fileid}#${target}`;
    return (
        <Link to={url || link} className="ref-role">
            {children.map((node, i) => (
                <ComponentFactory key={i} nodeData={node} />
            ))}
        </Link>
    );
};

RefRole.propTypes = {
    nodeData: PropTypes.shape({
        children: PropTypes.arrayOf(PropTypes.node).isRequired,
        domain: PropTypes.string.isRequired,
        fileid: PropTypes.string,
        name: PropTypes.string.isRequired,
        target: PropTypes.string.isRequired,
        url: PropTypes.string,
    }).isRequired,
    slug: PropTypes.string.isRequired,
};

export default RefRole;
