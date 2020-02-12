import React from 'react';
import PropTypes from 'prop-types';
import dlv from 'dlv';
import ComponentFactory from './ComponentFactory';

const DocumentBody = ({
    pageNodes,
    refDocMapping,
    slugTitleMapping,
    substitutions,
}) => {
    const nodes = pageNodes || dlv(refDocMapping, 'ast.children', []);
    return (
        <React.Fragment>
            {nodes.map((child, index) => (
                <ComponentFactory
                    key={index}
                    nodeData={child}
                    refDocMapping={refDocMapping}
                    slugTitleMapping={slugTitleMapping}
                    substitutions={substitutions}
                />
            ))}
        </React.Fragment>
    );
};

DocumentBody.propTypes = {
    footnotes: PropTypes.objectOf(PropTypes.object),
    pageNodes: PropTypes.array,
    refDocMapping: PropTypes.shape({
        ast: PropTypes.shape({
            children: PropTypes.array,
        }).isRequired,
    }),
    slugTitleMapping: PropTypes.objectOf(
        PropTypes.oneOfType([PropTypes.array, PropTypes.string])
    ),
    substitutions: PropTypes.objectOf(PropTypes.array),
};

DocumentBody.defaultProps = {
    footnotes: {},
    slugTitleMapping: {},
    substitutions: {},
};

export default DocumentBody;
