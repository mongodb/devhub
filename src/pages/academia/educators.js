import React from 'react';
import Layout from '../../components/dev-hub/layout';
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from '../../hooks/use-site-metadata';
import { screenSize, size, lineHeight } from '../../components/dev-hub/theme';
import { H2, P } from '../../components/dev-hub/text';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import HeroBanner from '../../components/dev-hub/hero-banner';
import HeroBannerImage from '../../images/1x/Academia.svg';
import {
    HowToJoin,
    ProgramBenefits,
    SignUpModal,
} from '../../components/pages/educators';

const ACADEMIA_BREADCRUMBS = [
    { label: 'Home', target: '/' },
    { label: 'MongoDB for Academia', target: '/academia' },
];

/* TODO: Update text styles to give this line height to all P on desktop */
const defaultLineHeight = css`
    line-height: ${lineHeight.default};
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
        breadcrumb={ACADEMIA_BREADCRUMBS}
        background={HeroBannerImage}
    >
        <Header>
            <H2>MongoDB Academia for Educators</H2>

            <P css={defaultLineHeight}>
                MongoDB for Academia is for educators who want to prepare
                students for careers that require in-demand database skills that
                power modern applications.
            </P>
            <SignUpModal />
        </Header>
    </ReducedMarginBanner>
);

export default () => {
    const metadata = useSiteMetadata();
    return (
        <Layout>
            <Helmet>
                <title>Academia for Educators - {metadata.title}</title>
            </Helmet>
            <TopBanner />
            <ProgramBenefits />
            <HowToJoin />
        </Layout>
    );
};
