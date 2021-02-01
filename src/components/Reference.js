import React from 'react';
import PropTypes from 'prop-types';
import Link from './Link';
import { getNestedValue } from '../utils/get-nested-value';

const makeLinkInternalIfApplicable = link => {
    if (!link) {
        return link;
    }
    const linkIncludesDevHub = link.includes('https://developer.mongodb.com');
    const linkGoesToForums = link.includes(
        'https://developer.mongodb.com/community/forums'
    );
    if (linkIncludesDevHub && !linkGoesToForums) {
        // Forums is technically "external" from an app standpoint, so we leave
        // that one alone
        return link.replace('https://developer.mongodb.com', '');
    }
    return link;
};

const Reference = ({ nodeData }) => {
    const link = makeLinkInternalIfApplicable(nodeData.refuri);
    return (
        <Link className="reference" to={link} target="_blank">
            {getNestedValue(['children', 0, 'value'], nodeData)}
        </Link>
    );
};

Reference.propTypes = {
    nodeData: PropTypes.shape({
        children: PropTypes.arrayOf(
            PropTypes.shape({
                type: PropTypes.string.isRequired,
                value: PropTypes.string,
            })
        ).isRequired,
        refuri: PropTypes.string.isRequired,
    }).isRequired,
};

export default Reference;
