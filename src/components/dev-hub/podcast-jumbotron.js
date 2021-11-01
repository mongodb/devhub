import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { H2, P } from '~components/dev-hub/text';
import BlogTagList from '~components/dev-hub/blog-tag-list';
import BylineBlock from '~components/dev-hub/byline-block';
import HeroBanner from '~components/dev-hub/hero-banner';

import {
    colorMap,
    fontSize,
    screenSize,
    size,
} from '~components/dev-hub/theme';

const Title = H2.withComponent('h1');

const PostMetaLine = styled('div')`
    color: ${colorMap.greyLightThree};
    display: flex;
    font-size: ${fontSize.tiny};
    margin: ${size.medium} 0 40px;

    @media ${screenSize.upToLarge} {
        flex-direction: column;
        font-size: ${fontSize.xsmall};
        margin: ${size.default} 0 ${size.medium};
    }
`;

const DateText = styled(P)`
    margin-right: ${size.tiny};

    @media ${screenSize.upToLarge} {
        font-size: ${fontSize.xsmall};
    }
`;

const DateTextContainer = styled('div')`
    display: flex;
    margin-right: ${size.medium};
`;

const PodcastJumbotron = ({
    breadcrumb,
    image,
    publishDate,
    title,
    tags,
    authors,
}) => (
    <HeroBanner background={image} breadcrumb={breadcrumb}>
        <Title collapse>{title}</Title>
        <PostMetaLine>
            <DateTextContainer>
                {publishDate && (
                    <DateText collapse>Published: {publishDate}</DateText>
                )}
            </DateTextContainer>
            <BlogTagList tags={tags} />
        </PostMetaLine>
        <BylineBlock authors={authors} />
    </HeroBanner>
);

PodcastJumbotron.propTypes = {
    authors: PropTypes.array,
    breadcrumb: PropTypes.array.isRequired,
    image: PropTypes.string.isRequired,
    publishDate: PropTypes.string.isRequired,
    tags: PropTypes.array,
    title: PropTypes.string.isRequired,
    authors: PropTypes.array,
};

export default PodcastJumbotron;
