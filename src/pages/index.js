import React from 'react';
import styled from '@emotion/styled';
import Card from '../components/dev-hub/card';
import MediaBlock from '../components/dev-hub/media-block';
import Layout from '../components/dev-hub/layout';
import Notification from '../components/dev-hub/notification';
import { H1, H2, P, SubHeader } from '../components/dev-hub/text';
import {
    colorMap,
    gradientMap,
    screenSize,
    size,
} from '../components/dev-hub/theme';
import Button from '../components/dev-hub/button';
import devToolsImage from '../images/1x/Dev-Tools.png';
import javaImage from '../images/1x/Java.png';
import nodejsImage from '../images/1x/Node.JS-1.png';
import unityImage from '../images/1x/Unity.png';
import greenPatternImage from '../images/1x/pattern-green.png';
import meetupsImage from '../images/1x/Meetups.png';
import buildImage from '../images/1x/Build.png';
import GradientUnderline from '../components/dev-hub/gradient-underline';

const MEDIA_WIDTH = '550';

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
    max-width: 300px;
    @media ${screenSize.upToLarge} {
        flex-basis: 50%;
    }
    @media ${screenSize.upToMedium} {
        flex-basis: 100%;
    }
`;
const FEATURE_SECTION_DISTANCE = '80px';
const FeatureSection = styled('section')`
    ${({ altBackground }) =>
        altBackground && `background-color: ${colorMap.devBlack};`};
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.medium};
        padding: 0;
        padding-bottom: ${size.medium};
    }
    @media ${screenSize.largeAndUp} {
        margin: 0 ${size.large} ${FEATURE_SECTION_DISTANCE};
        padding-bottom: ${FEATURE_SECTION_DISTANCE};
        padding-top: ${FEATURE_SECTION_DISTANCE};
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
export default ({ ...data }) => {
    console.log(data);
    return (
        <Layout>
            <Notification />
            <Hero>
                <Heading>
                    {`ideas.find({"attributes" : ["fast", "innovative",
                    "original"]})`}
                </Heading>
                <Sub>What will you create today?</Sub>
                <CardGallery>
                    <StyledTopCard image={unityImage}>
                        Rest APIs with Java, Spring Boot &amp; MongoDB
                    </StyledTopCard>
                    <StyledTopCard image={nodejsImage}>
                        How to get connected to your MongoDB Cluster
                    </StyledTopCard>
                    <StyledTopCard image={javaImage}>
                        Delete Operations
                    </StyledTopCard>
                    <StyledTopCard image={devToolsImage}>
                        Stitch Hosting: a Drag and Drop Delight
                    </StyledTopCard>
                </CardGallery>
                <div>
                    <Button to="/learn" primary arrow>
                        Learn MongoDB
                    </Button>
                </div>
            </Hero>
            <FeatureSection altBackground>
                <MediaBlock
                    mediaComponent={
                        <Card maxWidth={MEDIA_WIDTH} image={buildImage}>
                            Working with MongoDB and GraphQL
                        </Card>
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
                            Every Friday at 11.00am EST come watch our
                            developers make the MongoDB platform come alive.
                        </DescriptiveText>
                        <Button secondary>Sign Up For Twitch</Button>
                    </SectionContent>
                </MediaBlock>
            </FeatureSection>
            <FeatureSection>
                <MediaBlock
                    mediaComponent={
                        <Card
                            image={greenPatternImage}
                            title="MongoDB.local San Francisco"
                            description="San Francisco  •  January 14"
                            maxWidth={MEDIA_WIDTH}
                        ></Card>
                    }
                    reverse
                >
                    <SectionContent>
                        <H2>
                            <GradientUnderline gradient={gradientMap.greenTeal}>
                                MongoDB In-Person Events
                            </GradientUnderline>
                        </H2>
                        <DescriptiveText>
                            The best way to learn what's new with MongoDB is at
                            our .local and community events.
                        </DescriptiveText>
                        <DescriptiveText>
                            Come to learn, stay to connect.
                        </DescriptiveText>
                        <Button to="/events" secondary>
                            Join the Community
                        </Button>
                    </SectionContent>
                </MediaBlock>
            </FeatureSection>
            <FeatureSection altBackground>
                <MediaBlock
                    mediaWidth={MEDIA_WIDTH}
                    mediaComponent={
                        <Card
                            image={meetupsImage}
                            title="Radar"
                            description="By Radar  •  Made with Atlas"
                            maxWidth={MEDIA_WIDTH}
                        ></Card>
                    }
                >
                    <SectionContent>
                        <H2>
                            <GradientUnderline
                                gradient={gradientMap.magentaSalmonSherbet}
                            >
                                Showcase Your Knowledge
                            </GradientUnderline>
                        </H2>
                        <DescriptiveText>
                            Show others what you have done with MongoDB. Help
                            other beginners on their journey.
                        </DescriptiveText>
                        <DescriptiveText>Share your knowledge.</DescriptiveText>
                        <Button secondary>Tell Us About Your Project</Button>
                    </SectionContent>
                </MediaBlock>
            </FeatureSection>
        </Layout>
    );
};
