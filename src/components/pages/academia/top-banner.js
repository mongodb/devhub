import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { screenSize, size, lineHeight } from '../../dev-hub/theme';
import { H2, P } from '../../dev-hub/text';
import HeroBanner from '../../dev-hub/hero-banner';
import AcademiaHeader from '~images/student-spotlight/academia-header.svg';

/* TODO: Update text styles to give this line height to all P on desktop */
const defaultLineHeight = css`
    line-height: ${lineHeight.default};
`;

const HeadingCopy = styled(P)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    ${defaultLineHeight};
`;

const Header = styled('header')`
    padding-top: ${size.large};
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

const TopBanner = () => (
    <ReducedMarginBanner
        background={AcademiaHeader}
        backgroundPosition="100% 42px"
        maintainSquareAspectRatio={false}
    >
        <Header>
            <H2>MongoDB for Academia</H2>

            <HeadingCopy>
                MongoDB for Academia is your home for resources, tools, and
                community support while you learn or teach MongoDB! Wherever you
                are in your journey -- beginner or advanced developer -- we’re
                here to equip you for success.
            </HeadingCopy>
        </Header>
    </ReducedMarginBanner>
);

export default TopBanner;
