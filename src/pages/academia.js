import React, { useRef } from 'react';
import Layout from '../components/dev-hub/layout';
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import {
    colorMap,
    fontSize,
    screenSize,
    size,
} from '../components/dev-hub/theme';
import { H3, ArticleH2, ArticleH3 } from '../components/dev-hub/text';
import styled from '@emotion/styled';
import Button from '../components/dev-hub/button';
import HeroBanner from '../components/dev-hub/hero-banner';
import AcademiaSignUpForm from '../components/dev-hub/academia-sign-up-form';

const HEADER_CONTENT_MAX_WIDTH = '400px';

const Header = styled('header')`
    background: ${colorMap.devBlack};
    padding-top: ${size.large};
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.large};
    }
`;

const HeaderContent = styled('div')`
    max-width: ${HEADER_CONTENT_MAX_WIDTH};
`;

const Heading = styled(ArticleH2)`
    font-size: ${fontSize.small};
    font-family: 'Fira Mono';
`;

const Description = styled(ArticleH3)`
    font-family: akzidenz;
    font-weight: normal;
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

    const scrollToRef = ref =>
        window.scrollTo({ behavior: 'smooth', top: ref.current.offsetTop });
    const formRef = useRef();
    return (
        <Layout>
            <Helmet>
                <title>Academia - {metadata.title}</title>
            </Helmet>
            <HeroBanner breadcrumb={academiaBreadcrumbs}>
                <Header>
                    <HeaderContent>
                        <Heading>MongoDB for Academia</Heading>

                        <H3>Educators are more important than ever</H3>

                        <Description>
                            Gain access to teaching resources and materials
                            created by MongoDB, and inspire the developer of
                            tomorrow with the database for modern applications.
                        </Description>

                        <StyledButton
                            onClick={() => scrollToRef(formRef)}
                            primary
                            hasArrow={false}
                        >
                            Join MongoDB for Academia
                        </StyledButton>
                    </HeaderContent>
                </Header>
            </HeroBanner>
            <div ref={formRef}>
                <AcademiaSignUpForm />
            </div>
        </Layout>
    );
};
