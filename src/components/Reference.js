import React from 'react';
import Link from './Link';
import ComponentFactory from './ComponentFactory';
import { makeLinkInternalIfApplicable } from '~utils/make-link-internal-if-applicable';

const Reference = ({ nodeData }) => {
    const link = makeLinkInternalIfApplicable(nodeData.refuri || nodeData.url);
    return (
        <Link className="reference" to={link} target="_blank">
            {nodeData.children.map((child, index) => (
                <ComponentFactory nodeData={child} key={index} />
            ))}
        </Link>
    );
};

export default Reference;
