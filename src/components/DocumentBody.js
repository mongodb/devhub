import React from 'react';
import PropTypes from 'prop-types';
import dlv from 'dlv';
import ComponentFactory from './ComponentFactory';

const DocumentBody = ({ pageNodes, refDocMapping, slugTitleMapping, slug }) => {
    const nodes = pageNodes || dlv(refDocMapping, 'ast.children', []);
    return (
        <React.Fragment>
            {nodes.map((child, index) => (
                <ComponentFactory
                    key={index}
                    nodeData={child}
                    refDocMapping={refDocMapping}
                    // slugTitleMapping={slugTitleMapping}
                    slug={slug}
                />
            ))}
        </React.Fragment>
    );
};

DocumentBody.propTypes = {
    pageNodes: PropTypes.array,
    refDocMapping: PropTypes.shape({
        ast: PropTypes.shape({
            children: PropTypes.array,
        }).isRequired,
    }),
    slugTitleMapping: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.array, PropTypes.string])
    ),
    slug: PropTypes.string.isRequired,
};

DocumentBody.defaultProps = {
    slugTitleMapping: {},
};

export default DocumentBody;
