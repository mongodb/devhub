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
import { H3, ArticleH2, ArticleH4, P, P3 } from '../components/dev-hub/text';
import styled from '@emotion/styled';
import Button from '../components/dev-hub/button';
import HeroBanner from '../components/dev-hub/hero-banner';
import BackgroundWaves from '../images/code-for-good/background-waves.png';
import WildAidLogo from '../images/code-for-good/wild-aid-logo.png';
import WildAidDashboard from '../images/code-for-good/wild-aid-dashboard.png';
import VesselRecord from '../images/code-for-good/vessel-record.png';
import Link from '../components/dev-hub/link';

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
        margin-bottom: ${size.large};
        flex-direction: column-reverse;
    }
`;
const HeaderText = styled('div')`
    margin-bottom: -${size.xlarge};
    max-width: ${HERO_TEXT_WIDTH};
    @media ${screenSize.upToMedium} {
        width: 100%;
    }
`;

// TODO: uncomment when header link is ready
// const HeaderLink = styled(Link)`
//     color: ${colorMap.darkGreen};
//     display: inline;
//     margin-top: ${size.large};
//     margin-left: ${size.mediumLarge};
//     white-space: nowrap;
//     @media ${screenSize.upToLarge} {
//         display: block;
//         margin: 0;
//     }
// `;

const StyledHeroBanner = styled(HeroBanner)`
    margin: 0 ${size.medium};
    @media ${screenSize.upToLarge} {
        margin: 0;
    }
`;

const StyledP = styled(P)`
    margin-top: ${size.articleContent};
    margin-bottom: ${size.xlarge};
`;

const BodyText = styled(P)`
    margin-top: ${fontSize.default};
`;

const StyledButton = styled(Button)`
    margin-top: ${size.small};
`;

const BodyContent = styled('div')`
    margin: 0 auto;
    max-width: ${size.maxContentWidth};
    width: 100%;
    @media ${screenSize.upToMedium} {
        max-width: 100%;
        padding: 0 ${size.default};
        width: 100%;
    }
`;

const StyledParagraphLink = styled(Link)`
    color: ${colorMap.darkGreen};
    text-decoration: none;
    :visited {
        color: ${colorMap.darkGreen};
    }
`;

const StyledLink = styled(Link)`
    color: ${colorMap.darkGreen};
    font-weight: bold;
    margin-top: ${size.mediumLarge};
    text-decoration: none;
    :visited {
        color: ${colorMap.darkGreen};
    }
`;

const UnderstandTextSection = styled('div')`
    margin-bottom: ${size.xlarge};
    margin-top: ${size.xlarge};
    max-width: ${BODY_TEXT_MAX_WIDTH};
    @media ${screenSize.upToMedium} {
        max-width: 100%;
        width: 100%;
    }
`;

const VesselAppTextContainer = styled('div')`
    margin-bottom: ${size.xlarge};
    max-width: ${BODY_TEXT_MAX_WIDTH};
    @media ${screenSize.upToMedium} {
        max-width: 100%;
        width: 100%;
    }
`;

const VesselAppContainer = styled('div')`
    display: flex;
    justify-content: space-between;
    @media ${screenSize.upToMedium} {
        flex-direction: column-reverse;
    }
`;

const StyledVesselImage = styled('img')`
    flex: 0 0 ${VESSEL_IMAGE_WIDTH}px;
    width: ${VESSEL_IMAGE_WIDTH}px;
    @media ${screenSize.upToMedium} {
        width: 100%;
    }
`;

const VesselImageDiv = styled('div')`
    margin-top: ${size.xlarge};
`;

const StyledLogoImage = styled('img')`
    margin-top: -${size.xlarge};
    flex: 0 0 ${LOGO_IMAGE_WIDTH}px;
    height: ${LOGO_IMAGE_HEIGHT}px;
    width: ${LOGO_IMAGE_WIDTH}px;
    @media ${screenSize.upToMedium} {
        flex-direction: column-reverse;
        height: 100%;
        width: 100%;
    }
`;

const StyledDashBoardImage = styled('img')`
    flex: 0 0 ${DASHBOARD_IMAGE_WIDTH}px;
    width: ${DASHBOARD_IMAGE_WIDTH}px;
    @media ${screenSize.upToMedium} {
        width: 100%;
    }
`;

const StyledVesselCaption = styled(P3)`
    color: ${colorMap.greyLightTwo};
    margin-top: ${size.medium};
    max-width: ${CAPTION_MAX_WIDTH};
    @media ${screenSize.upToMedium} {
        margin-bottom: ${size.large};
        width: 100%;
    }
`;

const VesselCaption = StyledVesselCaption.withComponent('figcaption');

const StyledDashboardCaption = styled(P3)`
    color: ${colorMap.greyLightTwo};
    margin-bottom: ${size.xlarge};
    margin-top: ${size.medium};
    @media ${screenSize.upToMedium} {
        margin-bottom: ${size.small};
    }
`;

const DashboardCaption = StyledDashboardCaption.withComponent('figcaption');

const HeaderActionsContainer = styled('div')`
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    padding-top: ${size.large};
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
                shouldContainBackground={false}
            >
                <Header>
                    <div>
                        <HeaderText>
                            <ArticleH4>Code for Good</ArticleH4>

                            <H3>Make a difference with MongoDB</H3>

                            <StyledP>
                                Use your current MongoDB skills and pick up new
                                ones. Contribute back to O-FISH and help protect
                                our oceans.
                            </StyledP>
                        </HeaderText>
                        <HeaderActionsContainer>
                            <StyledButton
                                primary
                                hasArrow={false}
                                href="https://wildaid.github.io"
                            >
                                Build your own O-FISH app
                            </StyledButton>

                            {/* TODO: uncomment when learn link href is decided */}
                            {/* <HeaderLink href="#" tertiary>
                            Learn why we created O-FISH
                        </HeaderLink> */}
                        </HeaderActionsContainer>
                    </div>
                    <StyledLogoImage
                        src={WildAidLogo}
                        alt="Logo for the WildAid Marine Program"
                    />
                </Header>
            </StyledHeroBanner>

            <BodyContent>
                <UnderstandTextSection>
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
                </UnderstandTextSection>

                <StyledDashBoardImage
                    src={WildAidDashboard}
                    alt="A sample dashboard for the Wild Aid application"
                />

                <DashboardCaption>
                    With MongoDB Charts, the O-FISH web app allows WildAid to
                    gain insights about marine protection enforcement efforts.
                </DashboardCaption>

                <VesselAppContainer>
                    <div>
                        <VesselAppTextContainer>
                            <ArticleH2>
                                Build your own fully functional app for free
                            </ArticleH2>
                            <BodyText>
                                All you need is a{' '}
                                <StyledParagraphLink href="https://cloud.mongodb.com">
                                    free Atlas account
                                </StyledParagraphLink>{' '}
                                and{' '}
                                <StyledParagraphLink href="https://www.mongodb.com/try/download/database-tools">
                                    MongoDB Database Tools
                                </StyledParagraphLink>{' '}
                                to build your own O-FISH instance.
                            </BodyText>

                            <StyledLink href="https://wildaid.github.io">
                                Start building now
                            </StyledLink>
                        </VesselAppTextContainer>

                        <VesselAppTextContainer>
                            <ArticleH2>
                                Contribute code to help protect our oceans
                            </ArticleH2>
                            <BodyText>
                                Submit new features, translations, and styles to
                                O-FISH. This is an open source application;
                                anyone can contribute.
                            </BodyText>

                            <StyledLink href="https://wildaid.github.io/contribute/">
                                Contribute your code
                            </StyledLink>
                        </VesselAppTextContainer>

                        <VesselAppTextContainer>
                            <ArticleH2>
                                Collaborate with MongoDB Developers around the
                                world
                            </ArticleH2>
                            <BodyText>
                                Connect with your fellow MongoDB developers to
                                discuss how the O-FISH app works and how to make
                                it better.
                            </BodyText>
                            <StyledLink href="https://developer.mongodb.com/community/forums/">
                                Discuss O-FISH with the community
                            </StyledLink>
                        </VesselAppTextContainer>
                    </div>

                    <VesselImageDiv>
                        <StyledVesselImage
                            src={VesselRecord}
                            alt="Sample O-Fish application with vessel boarding information"
                        />
                        <VesselCaption>
                            Realm Sync enables officers to see and submit
                            boarding reports through the mobile app even when
                            they are out at sea, offline.
                        </VesselCaption>
                    </VesselImageDiv>
                </VesselAppContainer>
            </BodyContent>
        </Layout>
    );
};
