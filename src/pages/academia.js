import React from 'react';
import Layout from '../components/dev-hub/layout';
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import {
    colorMap,
    fontSize,
    screenSize,
    size,
} from '../components/dev-hub/theme';
import { ArticleH5, H3, P } from '../components/dev-hub/text';
import styled from '@emotion/styled';
import Button from '../components/dev-hub/button';
import HeroBanner from '../components/dev-hub/hero-banner';

const HEADER_CONTENT_MAX_WIDTH = '400px';

const Header = styled('header')`
    background: ${colorMap.devBlack};
    display: flex;
    justify-content: space-between;
    padding-top: ${size.large};
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.large};
    }
`;

const HeaderContent = styled('div')`
    max-width: ${HEADER_CONTENT_MAX_WIDTH};
`;

const Heading = styled(ArticleH5)`
    font-size: ${fontSize.xsmall};
    font-weight: normal;
    letter-spacing: 3px;
    text-transform: uppercase;
`;

const StyledButton = styled(Button)`
    margin-top: ${size.large};
`;

export default () => {
    const metadata = useSiteMetadata();
    const academiaBreadcrumbs = [
        { label: 'Home', target: '/' },
        { label: 'MongoDB for Academia', target: '/academia' },
    ];

    return (
        <Layout>
            <Helmet>
                <title>{metadata.title}</title>
            </Helmet>
            <HeroBanner breadcrumb={academiaBreadcrumbs}>
                <Header>
                    <HeaderContent>
                        <Heading>MongoDB for Academia</Heading>

                        <H3>Educators are more important than ever</H3>

                        <P>
                            Gain access to teaching resources and materials
                            created by MongoDB, and inspire the developer of
                            tomorrow with the database for modern applications.
                        </P>

                        <StyledButton to="" primary hasArrow={false}>
                            Join MongoDB for Academia
                        </StyledButton>
                    </HeaderContent>
                </Header>
            </HeroBanner>
        </Layout>
    );
};
