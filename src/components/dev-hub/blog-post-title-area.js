import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import BlogTagList from './blog-tag-list';
import { H2, P } from './text';
import { screenSize, fontSize, size } from './theme';
import BylineBlock from './byline-block';
import HeroBanner from './hero-banner';

const stackedView = css`
    flex-direction: column;
`;

const PostMetaLine = styled('div')`
    color: ${({ theme }) => theme.colorMap.greyLightThree};
    display: flex;
    margin: ${size.medium} 0 40px;
    font-size: ${fontSize.tiny};
    ${({ hasTimeToRead }) => hasTimeToRead && stackedView};
    @media ${screenSize.upToLarge} {
        font-size: ${fontSize.xsmall};
        margin-bottom: ${size.medium};
        ${stackedView};
    }
`;

const TimeToReadContainer = styled('span')`
    @media ${screenSize.largeAndUp} {
        margin-left: 24px;
    }
`;

const DateText = styled(P)`
    display: inline-block;
    margin-right: ${size.tiny};
    @media ${screenSize.upToLarge} {
        font-size: ${fontSize.xsmall};
        line-height: 20px;
    }
`;

const TextContainer = styled('div')`
    display: inline-block;
    flex: 0 0 auto;
    margin-right: ${size.medium};
    line-height: 20px;
    ${({ hasTimeToRead }) => hasTimeToRead && `margin-bottom: ${size.medium}`};
    @media ${screenSize.upToLarge} {
        display: flex;
        font-size: ${fontSize.xsmall};
        margin-right: 0;
        ${stackedView};
    }
`;

const BlogPostTitleArea = ({
    articleImage,
    authors,
    breadcrumb,
    originalDate,
    tags,
    timeToRead,
    title,
    updatedDate,
}) => {
    const BlogTitle = H2.withComponent('h1');
    return (
        <HeroBanner
            background={articleImage}
            breadcrumb={breadcrumb}
            data-test="hero-banner"
        >
            <BlogTitle collapse>{title}</BlogTitle>
            <PostMetaLine hasTimeToRead={!!timeToRead}>
                <TextContainer hasTimeToRead={!!timeToRead}>
                    <span>
                        {updatedDate && (
                            <DateText collapse>
                                Updated: {updatedDate} |{' '}
                            </DateText>
                        )}
                        {originalDate && (
                            <DateText collapse>
                                Published: {originalDate}
                            </DateText>
                        )}
                    </span>
                    {timeToRead && (
                        <TimeToReadContainer>
                            <DateText collapse>
                                <svg
                                    width="12"
                                    height="12"
                                    viewBox="0 0 12 12"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                    style={{
                                        lineHeight: '20px',
                                        marginRight: '4px',
                                        marginTop: '-3px',
                                        verticalAlign: 'middle',
                                    }}
                                >
                                    <path
                                        fill-rule="evenodd"
                                        clip-rule="evenodd"
                                        d="M0 6C0 2.68634 2.68634 0 6 0C9.31366 0 12 2.68634 12 6C12 9.31366 9.31366 12 6 12C2.68634 12 0 9.31366 0 6ZM6 3C6 2.44772 5.55228 2 5 2C4.44772 2 4 2.44772 4 3V6.375C4 6.80939 4.28044 7.1941 4.69399 7.32703L8.19399 8.45203C8.71978 8.62103 9.28302 8.3318 9.45203 7.80601C9.62103 7.28022 9.3318 6.71698 8.80601 6.54797L6 5.64604V3Z"
                                        fill="#B8C4C2"
                                    />
                                </svg>
                                {timeToRead} min read
                            </DateText>
                        </TimeToReadContainer>
                    )}
                </TextContainer>
                <BlogTagList tags={tags} />
            </PostMetaLine>
            <BylineBlock authors={authors} />
        </HeroBanner>
    );
};

export default BlogPostTitleArea;
