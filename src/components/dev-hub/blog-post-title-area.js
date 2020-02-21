import React from 'react';
import styled from '@emotion/styled';
import BlogTagList from './blog-tag-list';
import Link from './link';
import { H2, P } from './text';
import {
    colorMap,
    layer,
    gradientMap,
    screenSize,
    fontSize,
    size,
} from './theme';
import HeroBanner from './hero-banner';
import { createShadowElement } from './utils';
import useMedia from '../../hooks/use-media';

const AuthorImage = styled('div')`
    ${({ isMobile }) => isMobile && 'display: none;'}
    height: 50px;
    margin-right: ${size.medium};
    position: relative;
    z-index: ${layer.front};
    > img {
        border-radius: 50%;
        height: 50px;
    }
    &:before {
        ${createShadowElement(gradientMap.greenTealOffset, size.large, 0, -6)}
        height: 56px;
        width: 56px;
    }
`;

const AuthorLink = styled(Link)`
    :visited {
        color: ${colorMap.greyLightThree};
    }
    font-size: ${fontSize.tiny};
    @media ${screenSize.upToLarge} {
        font-size: ${fontSize.xsmall};
    }
`;

const AuthorText = styled(P)`
    @media ${screenSize.upToLarge} {
        font-size: ${fontSize.xsmall};
    }
`;

const ByLine = styled('div')`
    color: ${colorMap.greyLightThree};
    display: flex;
    font-size: ${fontSize.tiny};
    @media ${screenSize.upToLarge} {
        font-size: ${fontSize.xsmall};
    }
`;
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
    authorImage,
    breadcrumb,
    background,
    title,
    image,
    originalDate,
    tags,
    author,
}) => {
    const isMobile = useMedia(screenSize.upToLarge);
    return (
        <HeroBanner breadcrumb={breadcrumb} background={background} reverse>
            <H2 collapse>{title}</H2>
            <PostMetaLine>
                <DateText collapse>{originalDate}</DateText>
                <BlogTagList tags={tags} />
            </PostMetaLine>
            <ByLine>
                <AuthorImage isMobile={isMobile}>
                    <img src={authorImage} alt={author} />
                </AuthorImage>
                <AuthorText collapse>
                    By <AuthorLink to="#">{author}</AuthorLink>
                </AuthorText>
            </ByLine>
        </HeroBanner>
    );
};

export default BlogPostTitleArea;
