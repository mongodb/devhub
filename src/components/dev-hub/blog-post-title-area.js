import React from 'react';
import styled from '@emotion/styled';
import BlogTagList from './blog-tag-list';
import { H2, P } from './text';
import { colorMap, screenSize, fontSize, size } from './theme';
import BylineBlock from './byline-block';
import HeroBanner from './hero-banner';

const PostMetaLine = styled('div')`
    color: ${colorMap.greyLightThree};
    display: flex;
    margin: ${size.medium} 0 40px;
    font-size: ${fontSize.tiny};
    @media ${screenSize.upToLarge} {
        flex-direction: column;
        font-size: ${fontSize.xsmall};
        margin-bottom: ${size.medium};
    }
`;

const DateText = styled(P)`
    margin-right: ${size.medium};
    @media ${screenSize.upToLarge} {
        font-size: 12px;
    }
`;

const BlogPostTitleArea = ({
    articleImage,
    authorImage,
    breadcrumb,
    title,
    originalDate,
    tags,
    author,
}) => {
    return (
        <HeroBanner background={articleImage} breadcrumb={breadcrumb}>
            <H2 collapse>{title}</H2>
            <PostMetaLine>
                <DateText collapse>{originalDate}</DateText>
                <BlogTagList tags={tags} />
            </PostMetaLine>
            <BylineBlock author={author} authorImage={authorImage} />
        </HeroBanner>
    );
};

export default BlogPostTitleArea;
