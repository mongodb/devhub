import React from 'react';
import { css } from '@emotion/react';
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

const removeBottomMargin = css`
    margin-bottom: 0;
`;

const UnorderedList = styled('ul')`
    list-style: none;
    margin-bottom: ${size.articleContent};
    margin-top: 0;
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
    ${({ isSublist }) => isSublist && removeBottomMargin};
`;

const List = ({
    nodeData: { children, enumtype, ordered, startat },
    parentNode,
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
    let isSublist = false;
    if (parentNode && parentNode === 'listItem') {
        isSublist = true;
    }
    return (
        <ListTag isSublist={isSublist} {...attributes}>
            {children.map((listChild, index) => (
                <ComponentFactory {...rest} nodeData={listChild} key={index} />
            ))}
        </ListTag>
    );
};

export default List;
