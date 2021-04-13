import React from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import Clock from '~components/dev-hub/icons/clock';
import BlogTagList from './blog-tag-list';
import { H2, P } from './text';
import { fontSize, lineHeight, screenSize, size } from './theme';
import BylineBlock from './byline-block';
import HeroBanner from './hero-banner';

const stackedView = css`
    flex-direction: column;
`;

const PostMetaLine = styled('div')`
    color: ${({ theme }) => theme.colorMap.greyLightThree};
    display: flex;
    font-size: ${fontSize.tiny};
    margin: ${size.medium} 0 40px;
    ${({ hasTimeToRead }) => hasTimeToRead && stackedView};
    @media ${screenSize.upToLarge} {
        font-size: ${fontSize.xsmall};
        margin-bottom: ${size.medium};
        ${stackedView};
    }
`;

const TimeToReadContainer = styled('span')`
    @media ${screenSize.largeAndUp} {
        margin-left: ${size.medium};
    }
`;

const DateText = styled(P)`
    display: inline-block;
    margin-right: ${size.tiny};
    @media ${screenSize.upToLarge} {
        font-size: ${fontSize.xsmall};
        line-height: ${lineHeight.tiny};
    }
`;

const TextContainer = styled('div')`
    display: inline-block;
    flex: 0 0 auto;
    line-height: 20px;
    margin-right: ${size.medium};
    ${({ hasTimeToRead }) => hasTimeToRead && `margin-bottom: ${size.medium}`};
    @media ${screenSize.upToLarge} {
        display: flex;
        font-size: ${fontSize.xsmall};
        margin-right: 0;
        ${stackedView};
    }
`;

const StyledClock = styled(Clock)`
    line-height: ${lineHeight.tiny};
    margin-right: 4px;
    margin-top: -3px;
    vertical-align: middle;
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
                                <StyledClock />
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
