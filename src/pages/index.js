import React from 'react';
import styled from '@emotion/styled';
import Card from '../components/dev-hub/card';
import MediaBlock from '../components/dev-hub/media-block';
import Layout from '../components/dev-hub/layout';
import Notification from '../components/dev-hub/notification';
import { H4, H2, P } from '../components/dev-hub/text';
import { colorMap, size } from '../components/dev-hub/theme';
import Button from '../components/dev-hub/button';
import devToolsImage from '../images/1x/Dev-Tools.png';
import javaImage from '../images/1x/Java.png';
import nodejsImage from '../images/1x/Node.JS-1.png';
import unityImage from '../images/1x/Unity.png';
import greenPatternImage from '../images/1x/pattern-green.png';
import meetupsImage from '../images/1x/Meetups.png';
import buildImage from '../images/1x/Build.png';

const Hero = styled('header')`
    color: ${colorMap.devWhite};
    padding: ${size.large} 0;
    text-align: center;
`;

const FeatureSection = styled('section')`
    ${({ altBackground }) =>
        altBackground && `background-color: ${colorMap.devBlack};`};
    margin: 0 ${size.large};
    padding-bottom: 80px;
    padding-top: 80px;
`;

const CardGallery = styled('section')`
    display: flex;
    justify-content: space-between;
    margin-bottom: ${size.large};
    text-align: left;
`;

const SectionContent = styled('div')`
    padding: 5%;
`;

export default ({ ...data }) => {
    console.log(data);
    return (
        <Layout>
            <Notification />
            <Hero>
                <H4>
                    ideas.find( "attributes" : ["fast", "innovative",
                    "original"])
                </H4>
                <P>What will you create today?</P>
                <CardGallery>
                    <Card image={unityImage}>
                        Rest APIs with Java, Spring Boot &amp; MongoDB
                    </Card>
                    <Card image={nodejsImage}>
                        How to get connected to your MongoDB Cluster
                    </Card>
                    <Card image={javaImage}>Delete Operations</Card>
                    <Card image={devToolsImage}>
                        Stitch Hosting: a Drag and Drop Delight
                    </Card>
                </CardGallery>
                <div>
                    <Button to="/learn" primary>
                        Learn MongoDB Today
                    </Button>
                </div>
            </Hero>
            <FeatureSection altBackground>
                <MediaBlock
                    mediaComponent={
                        <Card image={buildImage}>
                            Working with MongoDB and GraphQL
                        </Card>
                    }
                >
                    <SectionContent>
                        <H2>Live Coding on Our Twitch Channel</H2>
                        <P>
                            Every Friday at 11.00am EST come watch our
                            developers make the MongoDB platform come alive.
                        </P>
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
                        ></Card>
                    }
                    reverse
                >
                    <SectionContent>
                        <H2>MongoDB In-Person Events</H2>
                        <P>
                            The best way to learn what's new with MongoDB is at
                            our .local and community events.
                        </P>
                        <P>Come to learn, stay to connect.</P>
                        <Button to="/events" secondary>
                            Join the Community
                        </Button>
                    </SectionContent>
                </MediaBlock>
            </FeatureSection>
            <FeatureSection altBackground>
                <MediaBlock
                    mediaComponent={
                        <Card
                            image={meetupsImage}
                            title="Radar"
                            description="By Radar  •  Made with Atlas"
                        ></Card>
                    }
                >
                    <SectionContent>
                        <H2>Showcase Your Knowledge</H2>
                        <P>
                            Show others what you have done with MongoDB. Help
                            other beginners on their journey.
                        </P>

                        <P>Share your knowledge.</P>
                        <Button secondary>Tell Us About Your Project</Button>
                    </SectionContent>
                </MediaBlock>
            </FeatureSection>
        </Layout>
    );
};
