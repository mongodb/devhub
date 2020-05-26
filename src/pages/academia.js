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
import SectionHeader from '../components/dev-hub/section-header';

const HEADER_CONTENT_MAX_WIDTH = '400px';
const CONTENT_MAX_WIDTH = '720px';

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

const BodyContent = styled('div')`
    margin: 0 auto;
    max-width: ${CONTENT_MAX_WIDTH};
    width: 100%;
`;

const OfferingsContent = styled('div')`
    margin-bottom: ${size.xlarge};
    max-width: 324px;
`;

const EligibilityContent = styled('div')`
    margin-bottom: ${size.xlarge};
`;

const StyledSectionHeader = styled(SectionHeader)`
    margin-bottom: ${size.mediumLarge};
`;

const StyledLink = styled('a')`
    color: ${colorMap.darkGreen};
    text-decoration: none;
`;

const StyledBullet = styled('ul')`
    list-style-type: circle;
    color: ${colorMap.darkGreen};
`;

const StyledSpan = styled('span')`
    color: white;
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

            <BodyContent>
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
                        Connect with Educators Around the World
                    </ArticleH2>
                    <StyledArticleH3>
                        Access our MongoDB for Academia community to
                        collaborate, share tips and get inspired.
                    </StyledArticleH3>
                </OfferingsContent>

                <EligibilityContent>
                    <StyledSectionHeader>For Educators</StyledSectionHeader>
                    <StyledArticleH3>
                        If you’re a student, you can apply for the{' '}
                        <StyledLink href="https://education.github.com/pack">
                            GitHub Student Developer Pack
                        </StyledLink>{' '}
                        and get access to MongoDB Atlas, University on-demand
                        content and certifications.
                    </StyledArticleH3>
                </EligibilityContent>

                <EligibilityContent>
                    <StyledSectionHeader>For Students</StyledSectionHeader>
                    <StyledArticleH3>
                        MongoDB for Academia is for educators who want to
                        prepare students for careers that require in-demand
                        database skills that power modern applications.
                        <br />
                        <br />
                        You’re eligible for this program if you teach:
                        <StyledBullet>
                            <li>
                                <StyledSpan>
                                    Higher Education, College and University
                                    programs
                                </StyledSpan>
                            </li>
                            <li>
                                <StyledSpan>
                                    Bootcamps and Online Courses
                                </StyledSpan>
                            </li>
                        </StyledBullet>
                    </StyledArticleH3>
                </EligibilityContent>
            </BodyContent>
        </Layout>
    );
};
