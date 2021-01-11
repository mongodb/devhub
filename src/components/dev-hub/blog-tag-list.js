import React, { useCallback, useState } from 'react';
import styled from '@emotion/styled';
import Link from './link';
import { fontSize, lineHeight, screenSize, size } from './theme';

const MINIMUM_EXPANDABLE_SIZE = 3;
const MAX_TAG_LIST_SIZE = 5;

const TagLink = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.greyDarkThree};
    border: 1px solid ${({ theme }) => theme.colorMap.greyDarkThree};
    border-radius: ${size.medium};
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
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
        border: 1px solid ${({ theme }) => theme.colorMap.lightGreen};
        cursor: pointer;
        transition: border 0.15s;
    }
    &:visited {
        color: ${({ theme }) => theme.colorMap.greyLightTwo};
    }
`;

const TagList = styled('ul')`
    margin: 0;
    padding-left: 0;
`;

const TagListItem = styled('li')`
    display: inline-block;
`;

const BlogTag = ({ children, ...props }) => {
    const renderAsLink = !!(props.to || props.onClick);
    const TagLinkComponent = renderAsLink
        ? TagLink.withComponent(Link)
        : TagLink;
    return (
        <TagListItem>
            <TagLinkComponent {...props}>{children}</TagLinkComponent>
        </TagListItem>
    );
};

const BlogTagList = ({ className, navigates = true, tags = [] }) => {
    const canExpand = tags.length >= MINIMUM_EXPANDABLE_SIZE;
    // By default any list of blog tags under the minimum expandable size is already expanded
    const [isExpanded, setIsExpanded] = useState(!canExpand);
    const expandList = useCallback(() => setIsExpanded(true), []);
    if (!tags.length) {
        return null;
    }

    const mapTagToComponent = t => {
        const props = { key: t.label };
        if (navigates) {
            props.to = t.to;
        }
        return <BlogTag {...props}>{t.label}</BlogTag>;
    };

    return (
        <TagList className={className}>
            {isExpanded &&
                tags.slice(0, MAX_TAG_LIST_SIZE).map(mapTagToComponent)}
            {!isExpanded && canExpand && (
                <>
                    {tags
                        .slice(0, MINIMUM_EXPANDABLE_SIZE)
                        .map(mapTagToComponent)}
                    {tags.length !== MINIMUM_EXPANDABLE_SIZE ? (
                        <BlogTag onClick={expandList}>...</BlogTag>
                    ) : null}
                </>
            )}
        </TagList>
    );
};

export default BlogTagList;
