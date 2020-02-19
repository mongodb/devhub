import React from 'react';
import styled from '@emotion/styled';
import MediaBlock from './media-block';
import BlogTagList from './blog-tag-list';
import { H1, P } from './text';
import { colorMap } from './theme';
import Breadcrumb from './breadcrumb';

const TitleContainer = styled('div')`
    background-color: ${colorMap.devBlack};
`;

const BlogPostTitleArea = ({
    breadcrumb,
    title,
    image,
    originalDate,
    updatedDate,
    tags,
    author,
}) => {
    return (
        <header>
            <MediaBlock mediaComponent={image} mediaWidth={400} reverse>
                <TitleContainer>
                    <Breadcrumb>{breadcrumb}</Breadcrumb>
                    <H1>{title}</H1>
                    <P>{author}</P>
                    <P>{originalDate}</P>
                    <BlogTagList tags={tags} />
                </TitleContainer>
            </MediaBlock>
        </header>
    );
};

export default BlogPostTitleArea;
