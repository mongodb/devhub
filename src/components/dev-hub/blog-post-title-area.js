import React from 'react';
import styled from '@emotion/styled';
import BlogTagList from './blog-tag-list';
import { H2, P } from './text';
import { screenSize, fontSize, size } from './theme';
import BylineBlock from './byline-block';
import HeroBanner from './hero-banner';

const PostMetaLine = styled('div')`
    color: ${({ theme }) => theme.colorMap.greyLightThree};
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
    margin-right: ${size.tiny};
    @media ${screenSize.upToLarge} {
        font-size: ${fontSize.xsmall};
    }
`;

const DateTextContainer = styled('div')`
    margin-right: ${size.medium};
    display: flex;
`;

const BlogPostTitleArea = ({
    articleImage,
    authors,
    breadcrumb,
    originalDate,
    tags,
    title,
    updatedDate,
}) => {
    const BlogTitle = H2.withComponent('h1');
    return (
        <HeroBanner background={articleImage} breadcrumb={breadcrumb}>
            <BlogTitle collapse>{title}</BlogTitle>
            <PostMetaLine>
                <DateTextContainer>
                    {updatedDate && (
                        <DateText collapse>Updated: {updatedDate} | </DateText>
                    )}
                    {originalDate && (
                        <DateText collapse>Published: {originalDate}</DateText>
                    )}
                </DateTextContainer>
                <BlogTagList tags={tags} />
            </PostMetaLine>
            <BylineBlock authors={authors} />
        </HeroBanner>
    );
};

export default BlogPostTitleArea;
