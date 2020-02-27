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
                    {`ideas.find({"attributes":`}
                    <br />
                    {`["fast", "innovative", "original"]})`}
                </Heading>
                <Sub>What will you create today?</Sub>
                <CardGallery>
                    <StyledTopCard image={unityImage} to="/article">
                        Rest APIs with Java, Spring Boot &amp; MongoDB
                    </StyledTopCard>
                    <StyledTopCard image={nodejsImage} to="/article">
                        How to get connected to your MongoDB Cluster
                    </StyledTopCard>
                    <StyledTopCard image={javaImage} to="/article">
                        Delete Operations
                    </StyledTopCard>
                    <StyledTopCard image={devToolsImage} to="/article">
                        Stitch Hosting: a Drag and Drop Delight
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
                        <Card maxWidth={MEDIA_WIDTH} image={buildImage}></Card>
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
                            Every Friday at noon EST come watch our developers
                            make the MongoDB platform come alive.
                        </DescriptiveText>
                        <Button secondary href="https://www.twitch.tv/mongodb">
                            Watch
                        </Button>
                    </SectionContent>
                </MediaBlock>
            </FeatureSection>
            <FeatureSection>
                <MediaBlock
                    mediaComponent={
                        <Card
                            image={greenPatternImage}
                            maxWidth={MEDIA_WIDTH}
                        ></Card>
                    }
                    reverse
                >
                    <SectionContent>
                        <H2>
                            <GradientUnderline gradient={gradientMap.greenTeal}>
                                Events
                            </GradientUnderline>
                        </H2>
                        <DescriptiveText>
                            Join us at our MongoDB .local and community events.
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
                            image={meetupsImage}
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
                            Building something on MongoDB? Share your stories,
                            demos, and wisdom with those still learning.
                        </DescriptiveText>
                        <Button to="/community" secondary>
                            Share
                        </Button>
                    </SectionContent>
                </MediaBlock>
            </FeatureSection>
        </Layout>
    );
};
