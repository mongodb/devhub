import React from 'react';
import Link from './Link';
import { getNestedValue } from '~utils/get-nested-value';
import { makeLinkInternalIfApplicable } from '~utils/make-link-internal-if-applicable';

const Reference = ({ nodeData }) => {
    const link = makeLinkInternalIfApplicable(nodeData.refuri || nodeData.url);
    return (
        <Link className="reference" to={link} target="_blank">
            {getNestedValue(['children', 0, 'value'], nodeData)}
        </Link>
    );
};

export default Reference;
