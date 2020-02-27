import React from 'react';
import styled from '@emotion/styled';
import BlogTagList from './blog-tag-list';
import { colorMap, screenSize, size } from './theme';

const ArticleShareArea = styled('div')`
    display: flex;
    justify-content: space-between;
    border-top: 1px solid ${colorMap.greyDarkTwo};
    margin-top: ${size.xlarge};
    padding-top: ${size.medium};
    margin-bottom: ${size.large};
    @media ${screenSize.upToMedium} {
        margin-top: ${size.large};
    }
`;

const ArticleShareFooter = ({ tags }) => {
    return (
        <ArticleShareArea>
            <BlogTagList tags={tags} />
        </ArticleShareArea>
    );
};

export default ArticleShareFooter;
