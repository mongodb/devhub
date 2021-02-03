import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { screenSize, size, lineHeight } from '../../dev-hub/theme';
import { H2, P } from '../../dev-hub/text';
import HeroBanner from '../../dev-hub/hero-banner';
import HeroBannerImage from '../../../images/1x/Academia.svg';

const STUDENT_SPOTLIGHT_BREADCRUMBS = [
    { label: 'Home', target: '/' },
    { label: 'MongoDB for Academia', target: '/academia/' },
    { label: 'Student Spotlights', target: '/academia/students' },
];

/* TODO: Update text styles to give this line height to all P on desktop */
const defaultLineHeight = css`
    line-height: ${lineHeight.default};
`;

const Header = styled('header')`
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.large};
    }
`;

const ReducedMarginBanner = styled(HeroBanner)`
    margin: 0 ${size.medium};
    @media ${screenSize.upToLarge} {
        margin: 0;
    }
`;

const ShareText = styled(P)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    ${defaultLineHeight};
`;

const TopBanner = () => (
    <ReducedMarginBanner
        background={HeroBannerImage}
        breadcrumb={STUDENT_SPOTLIGHT_BREADCRUMBS}
    >
        <Header>
            <H2>Share Something You're Proud Of</H2>

            <ShareText>
                At MongoDB, we believe that everyone should have the opportunity
                to learn- and we want to learn more about how our education
                communities around the world are contributing to and using
                MongoDB. This Student Spotlights page highlights amazing
                projects that students are building and creating using MongoDB.
                Your stories and your work are the best way to share, and spread
                the word!
            </ShareText>
        </Header>
    </ReducedMarginBanner>
);

export default TopBanner;
