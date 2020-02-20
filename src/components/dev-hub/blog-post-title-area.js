import React from 'react';
import styled from '@emotion/styled';
import MediaBlock from './media-block';
import BlogTagList from './blog-tag-list';
import Link from './link';
import { H1, P } from './text';
import { colorMap } from './theme';
import Breadcrumb from './breadcrumb';

const StyledBreadcrumb = styled(Breadcrumb)`
    padding-bottom: 30px;
`;

const PostMetaLine = styled('div')`
    display: flex;
`;

const TitleContainer = styled('div')`
    background-color: ${colorMap.devBlack};
    padding-top: 18px;
    padding-bottom: 50px;
    padding-left: 120px;
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
                    <StyledBreadcrumb>{breadcrumb}</StyledBreadcrumb>
                    <H1>{title}</H1>
                    <PostMetaLine>
                        <P style={{ marginRight: '20px' }}>{originalDate}</P>
                        <BlogTagList tags={tags} />
                    </PostMetaLine>
                    <P collapse>
                        By{' '}
                        <Link to="#" tertiary>
                            {author}
                        </Link>
                    </P>
                </TitleContainer>
            </MediaBlock>
        </header>
    );
};

export default BlogPostTitleArea;
