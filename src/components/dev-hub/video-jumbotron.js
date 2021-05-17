import React, { memo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import { H2, P } from '~components/dev-hub/text';
import HeroBanner from '~components/dev-hub/hero-banner';

import {
    colorMap,
    fontSize,
    screenSize,
    size,
} from '~components/dev-hub/theme';

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

const PostMetaLine = styled('div')`
    color: ${colorMap.greyLightThree};
    display: flex;
    font-size: ${fontSize.tiny};
    margin: ${size.medium} 0 ${size.default};
    @media ${screenSize.upToLarge} {
        flex-direction: column;
        font-size: ${fontSize.xsmall};
        margin: ${size.default} 0 ${size.medium};
    }
`;

const Title = H2.withComponent('h1');

const StyledHeroBanner = styled(HeroBanner)`
    a {
        text-transform: capitalize;
    }
`;

const VideoJumbotron = ({ breadcrumb, publishDate, title }) => (
    <StyledHeroBanner breadcrumb={breadcrumb}>
        <Title collapse>{title}</Title>
        <PostMetaLine>
            <DateTextContainer>
                {publishDate && (
                    <DateText collapse>Published: {publishDate}</DateText>
                )}
            </DateTextContainer>
        </PostMetaLine>
    </StyledHeroBanner>
);

VideoJumbotron.propTypes = {
    breadcrumb: PropTypes.array.isRequired,
    publishDate: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default memo(VideoJumbotron);
