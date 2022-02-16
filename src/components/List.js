import React from 'react';
import styled from '@emotion/styled';
import ComponentFactory from './ComponentFactory';
import { colorMap, size, lineHeight } from './dev-hub/theme';

const enumtypeMap = {
    arabic: '1',
    loweralpha: 'a',
    upperalpha: 'A',
    lowerroman: 'i',
    upperroman: 'I',
};

const UnorderedList = styled('ul')`
    list-style: none;
    margin-bottom: ${size.articleContent};
    margin-top: -${size.xsmall};
    padding-left: ${size.medium};
    li:before {
        content: '○';
        color: ${colorMap.darkGreen};
        margin-right: ${size.medium};
        font-size: 8px;
        position: relative;
        top: -3px;
    }
    li {
        display: flex;
        line-height: ${lineHeight.medium};
    }
`;

const List = ({
    nodeData: { children, enumtype, ordered, startat },
    ...rest
}) => {
    const isUnorderedInSnooty = enumtype === 'unordered';
    // Specifically check === false since Snooty articles would be null
    const isUnorderedInStrapi = ordered === false;
    const isUnordered = isUnorderedInSnooty || isUnorderedInStrapi;
    const ListTag = isUnordered ? UnorderedList : 'ol';
    const attributes = {};
    if (enumtype in enumtypeMap) {
        attributes.type = enumtypeMap[enumtype];
    }
    if (startat) {
        attributes.start = startat;
    }
    return (
        <ListTag {...attributes}>
            {children.map((listChild, index) => (
                <ComponentFactory {...rest} nodeData={listChild} key={index} />
            ))}
        </ListTag>
    );
};

export default List;
