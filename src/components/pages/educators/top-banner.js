import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { screenSize, size, lineHeight } from '../../dev-hub/theme';
import { H2, P } from '../../dev-hub/text';
import HeroBanner from '../../dev-hub/hero-banner';
import EducatorsHeader from '~images/student-spotlight/educators-header.svg';
import SignUpModal from './sign-up-modal';

const ACADEMIA_BREADCRUMBS = [
    { label: 'Home', target: '/' },
    { label: 'MongoDB for Academia', target: '/academia' },
];

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
        background={EducatorsHeader}
        backgroundPosition="100% 42px"
        breadcrumb={ACADEMIA_BREADCRUMBS}
    >
        <Header>
            <H2>MongoDB Academia for Educators</H2>

            <HeadingCopy>
                MongoDB for Academia is for educators who want to prepare
                students for careers that require in-demand database skills that
                power modern applications.
            </HeadingCopy>
            <SignUpModal />
        </Header>
    </ReducedMarginBanner>
);

export default TopBanner;
