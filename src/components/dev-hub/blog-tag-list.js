import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import Link from './link';
import { colorMap, fontSize, lineHeight, screenSize, size } from './theme';

const MINIMUM_EXPANDABLE_SIZE = 3;

const BlogTag = styled(Link)`
    background-color: ${colorMap.greyDarkThree};
    border: 1px solid ${colorMap.greyDarkThree};
    border-radius: ${size.medium};
    color: ${colorMap.greyLightTwo};
    display: inline-block;
    font-size: ${fontSize.micro};
    line-height: ${lineHeight.micro};
    margin-right: ${size.tiny};
    padding: 0 ${size.small};
    text-decoration: none;
    text-transform: uppercase;
    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.micro};
    }
    &:active,
    &:focus,
    &:hover {
        border: 1px solid ${colorMap.lightGreen};
        cursor: pointer;
        transition: border 0.15s;
    }
    &:visited {
        color: ${colorMap.greyLightTwo};
    }
`;

const BlogTagList = ({ nodeData: { value } }) => {
    const canExpand = value.length >= MINIMUM_EXPANDABLE_SIZE;
    // By default any list of blog tags under the minimum expandable size is already expanded
    const [isExpanded, setIsExpanded] = useState(!canExpand);
    const expandList = useCallback(() => setIsExpanded(true), []);
    return (
        <div>
            {isExpanded &&
                value.map(v => (
                    <BlogTag key={v.text} to={v.to}>
                        {v.text}
                    </BlogTag>
                ))}
            {!isExpanded && canExpand && (
                <>
                    {/* Since this can expand, we know value[0] and value[1] exist */}
                    <BlogTag to={value[0].to}>{value[0].text}</BlogTag>
                    <BlogTag to={value[1].to}>{value[1].text}</BlogTag>
                    <BlogTag onClick={expandList}>...</BlogTag>
                </>
            )}
        </div>
    );
};

export default BlogTagList;
