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
import { H3, ArticleH2, ArticleH3 } from '../components/dev-hub/text';
import styled from '@emotion/styled';
import Button from '../components/dev-hub/button';
import HeroBanner from '../components/dev-hub/hero-banner';

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

const Title = styled(ArticleH2)`
    font-size: ${fontSize.small};
    font-family: 'Fira Mono';
`;

const StyledArticleH3 = styled(ArticleH3)`
    font-family: akzidenz;
    font-weight: normal;
`;

const StyledButton = styled(Button)`
    margin-top: ${size.large};
`;

const OfferingsSection = styled('div')`
    // padding-left: 360px;
    // display: flex;
    // justify-content: center;
    // flex-direction: column;
    // margin: 0 auto;
`;

const OfferingsContent = styled('div')`
    margin-bottom: ${size.xlarge};
    max-width: 324px;
    width: 100%;
    margin: 0 auto;
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
                <title>Academia - {metadata.title}</title>
            </Helmet>
            <HeroBanner breadcrumb={academiaBreadcrumbs}>
                <Header>
                    <HeaderContent>
                        <Title>MongoDB for Academia</Title>

                        <H3>Teach modern databases with MongoDB</H3>

                        <StyledArticleH3>
                            Enrich your curriculum with MongoDB content and
                            prepare the developers of tomorrow to build modern
                            applications.
                        </StyledArticleH3>

                        <StyledButton to="" primary hasArrow={false}>
                            Join MongoDB for Academia
                        </StyledButton>
                    </HeaderContent>
                </Header>
            </HeroBanner>

            <OfferingsSection>
                <OfferingsContent>
                    <ArticleH2>Teach MongoDB with Confidence</ArticleH2>
                    <StyledArticleH3>
                        Gain access to MongoDB software and curriculum content
                        sourced from MongoDB education experts that easily
                        integrates in your classroom teaching. We can also
                        consult you with planning a curriculum.
                    </StyledArticleH3>
                </OfferingsContent>

                <OfferingsContent>
                    <ArticleH2>MongoDB University On-Demand</ArticleH2>
                    <StyledArticleH3>
                        You and your students will receive special on-demand
                        access to MongoDB University, with cohort tracking,
                        usage analytics in addition to great content that you
                        can incorporate into your curriculum.
                    </StyledArticleH3>
                </OfferingsContent>

                <OfferingsContent>
                    <ArticleH2>
                        Connect with Educators Around the World{' '}
                    </ArticleH2>
                    <StyledArticleH3>
                        Access our MongoDB for Academia community to
                        collaborate, share tips and get inspired.
                    </StyledArticleH3>
                </OfferingsContent>
            </OfferingsSection>
        </Layout>
    );
};
