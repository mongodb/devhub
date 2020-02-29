import React from 'react';
import PropTypes from 'prop-types';
import ComponentFactory from './ComponentFactory';
import Link from './Link';

const RefRole = ({ nodeData: { children, fileid, target, url }, slug }) => {
    // Render intersphinx target links
    if (url) {
        return (
            <Link to={url} className="reference external">
                {children.map((node, i) => (
                    <ComponentFactory key={i} nodeData={node} />
                ))}
            </Link>
        );
    }

    // Render internal target links
    const link = fileid === slug ? `#${target}` : `${fileid}#${target}`;
    return (
        <Link href={link}>
            <span>
                {children.map((node, i) => (
                    <ComponentFactory key={i} nodeData={node} />
                ))}
            </span>
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
