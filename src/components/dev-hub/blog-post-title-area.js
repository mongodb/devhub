import React from 'react';
import { css } from '@emotion/core';
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

const bulletStyling = css`
    @media ${screenSize.xSmallAndUp} {
        &:before {
            content: '\u2022';
            margin-right: ${size.tiny};
        }
    }
`;

const DateText = styled(P)`
    margin-right: ${size.tiny};
    @media ${screenSize.upToLarge} {
        font-size: ${fontSize.xsmall};
    }
    ${({ withBullet }) => withBullet && bulletStyling};
`;

const DateTextContainer = styled('div')`
    margin-right: ${size.medium};
    display: flex;
    @media ${screenSize.upToXSmall} {
        flex-direction: column;
    }
`;

const BlogPostTitleArea = ({
    articleImage,
    author,
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
                    {originalDate && (
                        <DateText collapse>{originalDate}</DateText>
                    )}
                    {updatedDate && (
                        <DateText withBullet collapse>
                            Updated {updatedDate}
                        </DateText>
                    )}
                </DateTextContainer>
                <BlogTagList tags={tags} />
            </PostMetaLine>
            {author && (
                <BylineBlock
                    authorName={author.name}
                    authorImage={author.image}
                />
            )}
        </HeroBanner>
    );
};

export default BlogPostTitleArea;
