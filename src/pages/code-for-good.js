import React from 'react';
import Layout from '../components/dev-hub/layout';
import { Helmet } from 'react-helmet';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import {
    colorMap,
    fontSize,
    screenSize,
    size,
    lineHeight,
} from '../components/dev-hub/theme';
import { H3, ArticleH2, P } from '../components/dev-hub/text';
import styled from '@emotion/styled';
import Button from '../components/dev-hub/button';
import HeroBanner from '../components/dev-hub/hero-banner';
import BackgroundWaves from '../images/code-for-good/background-waves.png';
import WildAidLogo from '../images/code-for-good/wild-aid-logo.png';
import WildAidDashboard from '../images/code-for-good/wild-aid-dashboard.png';
import VesselRecord from '../images/code-for-good/vessel-record.png';

const CAPTION_MAX_WIDTH = '345px';
const BODY_TEXT_MAX_WIDTH = '320px';
const HERO_TEXT_WIDTH = '425px';
const DASHBOARD_IMAGE_WIDTH = 780;
const VESSEL_IMAGE_WIDTH = 345;
const LOGO_IMAGE_WIDTH = 350;
const LOGO_IMAGE_HEIGHT = 450;

const Header = styled('header')`
    display: flex;
    justify-content: space-between;
    padding-top: ${size.large};
    @media ${screenSize.upToLarge} {
        display: block;
        margin-bottom: ${size.large};
    }
`;
const HeaderText = styled('div')`
    margin-bottom: -${size.xlarge};
    max-width: ${HERO_TEXT_WIDTH};
`;

const HeaderLink = styled('a')`
    color: ${colorMap.darkGreen};
    margin-top: ${size.large};
    margin-left: ${size.mediumLarge};
    text-decoration: none;
    @media ${screenSize.upToLarge} {
        display: block;
        margin-left: auto;
    }
`;

const Title = styled(ArticleH2)`
    font-size: ${fontSize.small};
    font-family: 'Fira Mono';
`;

const StyledHeroBanner = styled(HeroBanner)`
    margin: 0 ${size.medium};
`;

const StyledP = styled(P)`
    font-family: akzidenz;
    font-size: ${fontSize.default};
    line-height: ${lineHeight.default};
    margin-top: ${size.articleContent};
    margin-bottom: ${size.xlarge};
`;

const BodyText = styled(P)`
    font-family: akzidenz;
    font-size: ${fontSize.default};
    line-height: ${lineHeight.default};
    margin-top: ${fontSize.default};
`;

const StyledButton = styled(Button)`
    margin-top: ${size.large};
    margin-bottom: ${size.xlarge};
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.small};
    }
`;

const BodyContent = styled('div')`
    margin: 0 auto;
    max-width: ${size.maxContentWidth};
    width: 100%;
    @media ${screenSize.upToMedium} {
        padding: 0 ${size.default};
    }
`;

const StyledLink = styled('a')`
    color: ${colorMap.darkGreen};
    margin-top: ${size.mediumLarge};
    text-decoration: none;
`;

const FirstSection = styled('div')`
    margin-bottom: ${size.xlarge};
    margin-top: ${size.xlarge};
    max-width: ${BODY_TEXT_MAX_WIDTH};
`;

const SecondSection = styled('div')`
    margin-bottom: ${size.xlarge};
    max-width: ${BODY_TEXT_MAX_WIDTH};
`;

const StyledDiv = styled('div')`
    display: flex;
    justify-content: space-between;
    @media ${screenSize.upToMedium} {
        flex-direction: column-reverse;
    }
`;

const StyledVesselImage = styled('img')`
    flex: 0 0 ${VESSEL_IMAGE_WIDTH}px;
    width: ${VESSEL_IMAGE_WIDTH}px;
`;

const VesselImageDiv = styled('div')`
    margin-top: ${size.xlarge};
`;

const StyledLogoImage = styled('img')`
    margin-top: -${size.xlarge};
    flex: 0 0 ${LOGO_IMAGE_WIDTH}px;
    height: ${LOGO_IMAGE_HEIGHT}px;
    width: ${LOGO_IMAGE_WIDTH}px;
`;

const StyledDashBoardImage = styled('img')`
    flex: 0 0 ${DASHBOARD_IMAGE_WIDTH}px;
    width: ${DASHBOARD_IMAGE_WIDTH}px;
`;

const VesselCaptionText = styled('div')`
    font-family: akzidenz;
    font-size: ${fontSize.small};
    line-height: ${lineHeight.small};
    margin-top: ${size.medium};
    margin-bottom: ${size.medium};
    max-width: ${CAPTION_MAX_WIDTH};
    @media ${screenSize.upToMedium} {
        margin-bottom: ${size.xlarge};
    }
`;

const DashboardCaptionText = styled('div')`
    font-family: akzidenz;
    font-size: ${fontSize.small};
    line-height: ${lineHeight.small};
    margin-bottom: ${size.xlarge};
    margin-top: ${size.medium};
`;

export default () => {
    const metadata = useSiteMetadata();
    const codeForGoodBreadcrumbs = [
        { label: 'Home', target: '/' },
        { label: 'Code for Good', target: '/code-for-good' },
    ];

    return (
        <Layout>
            <Helmet>
                <title>Code for Good - {metadata.title}</title>
            </Helmet>
            <StyledHeroBanner
                breadcrumb={codeForGoodBreadcrumbs}
                background={BackgroundWaves}
                fullWidth={true}
                showImageOnMobile={false}
            >
                <Header>
                    <div>
                        <HeaderText>
                            <Title>Code for Good</Title>

                            <H3>Make a difference with MongoDB</H3>

                            <StyledP>
                                Use your current MongoDB skills and pick up new
                                ones. Contribute back to O-FISH and help protect
                                our oceans.
                            </StyledP>
                        </HeaderText>
                        <StyledButton
                            primary
                            hasArrow={false}
                            href="https://o-fish.github.io"
                        >
                            Build your own O-FISH app
                        </StyledButton>

                        <HeaderLink href="#">
                            Learn why we created O-FISH
                            <span> &rarr;</span>
                        </HeaderLink>
                    </div>
                    <StyledLogoImage src={WildAidLogo} alt="" />
                </Header>
            </StyledHeroBanner>

            <BodyContent>
                <FirstSection>
                    <ArticleH2>
                        Understand how to use MongoDB features in web and mobile
                        applications
                    </ArticleH2>
                    <BodyText>
                        Use the context of a real-world application to
                        understand MongoDB features and principles such as:
                        schema modeling, Realm Sync, serverless logic with
                        functions and triggers, full-text search, Charts data
                        visualization.
                    </BodyText>

                    <StyledP>Blog posts coming soon</StyledP>
                </FirstSection>

                <StyledDashBoardImage src={WildAidDashboard} alt="" />

                <DashboardCaptionText>
                    With MongoDB Charts, the O-FISH web app allows WildAid to
                    gain insights about marine protection enforcement efforts.
                </DashboardCaptionText>

                <StyledDiv>
                    <div>
                        <SecondSection>
                            <ArticleH2>
                                Build your own fully functional app for free
                            </ArticleH2>
                            <BodyText>
                                All you need is a{' '}
                                <StyledLink href="https://cloud.mongodb.com">
                                    free Atlas account
                                </StyledLink>{' '}
                                and{' '}
                                <StyledLink href="https://docs.mongodb.com/manual/installation/#mongodb-community-edition-installation-tutorials">
                                    MongoDB Community Edition{' '}
                                </StyledLink>{' '}
                                to build your own O-FISH instance.
                            </BodyText>

                            <StyledLink href="https://o-fish.github.io">
                                Start building now
                            </StyledLink>
                        </SecondSection>

                        <SecondSection>
                            <ArticleH2>
                                Contribute code to help protect our oceans
                            </ArticleH2>
                            <BodyText>
                                Submit new features, translations, and styles to
                                O-FISH. This is an open source application;
                                anyone can contribute.
                            </BodyText>

                            <StyledLink href="#">
                                Contribute your code
                            </StyledLink>
                        </SecondSection>

                        <SecondSection>
                            <ArticleH2>
                                Collaborate with MongoDB Developers around the
                                world
                            </ArticleH2>
                            <BodyText>
                                Connect with your fellow MongoDB developers to
                                discuss how the O-FISH app works and how to make
                                it better.
                            </BodyText>
                            <StyledLink href="#">
                                Discuss O-FISH with the community
                            </StyledLink>
                        </SecondSection>
                    </div>

                    <VesselImageDiv>
                        <StyledVesselImage
                            src={VesselRecord}
                            alt=""
                            height="614px"
                            width="345px"
                        />
                        <VesselCaptionText>
                            Realm Sync enables officers to see and submit
                            boarding reports through the mobile app even when
                            they are out at sea, offline.
                        </VesselCaptionText>
                    </VesselImageDiv>
                </StyledDiv>
            </BodyContent>
        </Layout>
    );
};
