import React from 'react';
import styled from '@emotion/styled';
import Card from '../components/dev-hub/card';
import MediaBlock from '../components/dev-hub/media-block';
import Layout from '../components/dev-hub/layout';
import { H1, H2, P, SubHeader } from '../components/dev-hub/text';
import {
    colorMap,
    gradientMap,
    screenSize,
    size,
} from '../components/dev-hub/theme';
import Button from '../components/dev-hub/button';
import cSharpImage from '../images/1x/c-sharp.png';
import nodejsImage from '../images/1x/Node.JS-1.png';
import stichImage from '../images/2x/Stitch-triggers@2x.png';
import greenPatternImage from '../images/1x/pattern-green.png';
import meetupsImage from '../images/1x/Meetups.png';
import buildImage from '../images/1x/Build.png';
import GradientUnderline from '../components/dev-hub/gradient-underline';
import homepageBackground from '../images/1x/homepage-background.png';
import ProjectSignUpForm from '../components/dev-hub/project-sign-up-form';
// import Notification from '../components/dev-hub/notification';
// import useTwitchApi from '../utils/use-twitch-api';

const MEDIA_WIDTH = '550';

const BackgroundImage = styled('div')`
    background-image: url(${homepageBackground});
    background-size: cover;
`;
const Hero = styled('header')`
    color: ${colorMap.devWhite};
    padding: ${size.xlarge} ${size.large};
    @media ${screenSize.upToMedium} {
        padding: ${size.large} ${size.medium};
    }
    text-align: center;
`;
const Heading = styled(H1)`
    max-width: 920px;
    margin: ${size.default} auto;
    word-wrap: break-word;
`;
const Sub = styled(SubHeader)`
    margin: ${size.default} 0;
`;
const CardGallery = styled('section')`
    display: flex;
    justify-content: center;
    margin: ${size.default} ${size.xlarge} ${size.large};
    @media ${screenSize.upToLarge} {
        flex-wrap: wrap;
    }
    @media ${screenSize.upToMedium} {
        margin: ${size.default};
    }
`;
const StyledTopCard = styled(Card)`
    /* max-width: 300px; */
    @media ${screenSize.upToLarge} {
        flex-basis: 50%;
    }
    @media ${screenSize.upToMedium} {
        flex-basis: 100%;
    }
`;

const FeatureSection = styled('section')`
    ${({ altBackground }) =>
        altBackground && `background-color: ${colorMap.devBlack};`};
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.medium};
        padding: 0;
        padding-bottom: ${size.medium};
    }
    @media ${screenSize.largeAndUp} {
        margin: 0 ${size.large} ${size.medium};
        padding-top: ${size.medium};
    }
`;
const SectionContent = styled('div')`
    padding: 0 ${size.default};
    @media ${screenSize.largeAndUp} {
        margin-top: 15%;
        padding: 8%;
    }
`;
const DescriptiveText = styled(P)`
    color: ${colorMap.greyLightTwo};
    margin-bottom: ${size.medium};
`;
export default () => {
    // TODO enable for launch
    // const { error, live, pending, videos } = useTwitchApi();
    return (
        <Layout>
            <BackgroundImage>
                {/* 
                // TODO enable for launch
                {live && (
                    <Notification
                        link={live.url}
                        title={live.title}
                    />
                )} 
                */}
                <Hero>
                    <Heading>
                        {`ideas.find({"attributes":`}
                        <br />
                        {`["fast", "innovative", "original"]})`}
                    </Heading>
                    <Sub>What will you create today?</Sub>
                    <CardGallery>
                        <StyledTopCard
                            image={nodejsImage}
                            to="/how-to/calling-the-mongodb-atlas-api--how-to-do-it-from-node-python-and-ruby"
                        >
                            Calling the MongoDB Atlas API - How to do it from
                            Node, Python, and Ruby
                        </StyledTopCard>
                        <StyledTopCard
                            image={stichImage}
                            to="/how-to/mongodb-stitch-authentication-triggers"
                        >
                            MongoDB Stitch Authentication Triggers
                        </StyledTopCard>
                        <StyledTopCard
                            image={cSharpImage}
                            to="/how-to/working-with-mongodb-transactions-with-c-and-the-net-framework"
                        >
                            Working with MongoDB Transactions with C# and the
                            .NET Framework{' '}
                        </StyledTopCard>
                    </CardGallery>
                    <div>
                        <Button to="/learn" primary>
                            Learn MongoDB
                        </Button>
                    </div>
                </Hero>
                <FeatureSection altBackground>
                    <MediaBlock
                        mediaComponent={
                            <Card
                                maxWidth={MEDIA_WIDTH}
                                image={greenPatternImage}
                            ></Card>
                        }
                    >
                        <SectionContent>
                            <H2>
                                <GradientUnderline
                                    gradient={gradientMap.tealVioletPurple}
                                >
                                    Live Coding on Our Twitch Channel
                                </GradientUnderline>
                            </H2>
                            <DescriptiveText>
                                Every Friday at noon EST come watch our
                                developers make the MongoDB platform come alive.
                            </DescriptiveText>
                            <Button
                                secondary
                                href="https://www.twitch.tv/mongodb"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Watch
                            </Button>
                        </SectionContent>
                    </MediaBlock>
                </FeatureSection>
                <FeatureSection>
                    <MediaBlock
                        mediaComponent={
                            <Card
                                image={meetupsImage}
                                maxWidth={MEDIA_WIDTH}
                            ></Card>
                        }
                        reverse
                    >
                        <SectionContent>
                            <H2>
                                <GradientUnderline
                                    gradient={gradientMap.greenTeal}
                                >
                                    Events
                                </GradientUnderline>
                            </H2>
                            <DescriptiveText>
                                Join us at our MongoDB .local and community
                                events.
                            </DescriptiveText>
                            <DescriptiveText>
                                Come to learn, stay to connect.
                            </DescriptiveText>
                            <Button to="/community/events" secondary>
                                Join Us
                            </Button>
                        </SectionContent>
                    </MediaBlock>
                </FeatureSection>
                <FeatureSection altBackground>
                    <MediaBlock
                        mediaComponent={
                            <Card
                                image={buildImage}
                                maxWidth={MEDIA_WIDTH}
                            ></Card>
                        }
                    >
                        <SectionContent>
                            <H2>
                                <GradientUnderline
                                    gradient={gradientMap.magentaSalmonSherbet}
                                >
                                    Show Your Stuff
                                </GradientUnderline>
                            </H2>
                            <DescriptiveText>
                                Building something on MongoDB? Share your
                                stories, demos, and wisdom with those still
                                learning.
                            </DescriptiveText>
                            <ProjectSignUpForm
                                triggerComponent={
                                    <Button secondary>Share</Button>
                                }
                            />
                        </SectionContent>
                    </MediaBlock>
                </FeatureSection>
            </BackgroundImage>
        </Layout>
    );
};
