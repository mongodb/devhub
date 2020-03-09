import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';
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
import buildImage from '../images/2x/Build@2x.png';
import graphqlImage from '../images/1x/GraphQL.png';
import greenPatternImage from '../images/2x/pattern-green@2x.png';
import meetupsImage from '../images/1x/Meetups.png';
import nodejsIllustration from '../images/1x/Node.Js-Illustration.png';
import pythonImage from '../images/1x/Python.png';
import GradientUnderline from '../components/dev-hub/gradient-underline';
import homepageBackground from '../images/1x/homepage-background.png';
import ProjectSignUpForm from '../components/dev-hub/project-sign-up-form';
import { getPageSchema } from '../utils/get-page-schema';
import useTwitchApi from '../utils/use-twitch-api';
import { Modal } from '../components/dev-hub/modal';
import VideoEmbed from '../components/dev-hub/video-embed';
import { useSiteMetadata } from '../hooks/use-site-metadata';

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

const ThumbnailCard = styled(Card)`
    position: relative;
`;

const ThumbnailButton = styled(Button)`
    left: 40%;
    position: absolute;
    top: 35%;
`;

const TwitchVideoModal = ({ id, trigger }) => (
    <Modal
        dialogContainerStyle={{
            height: '90%',
            padding: `0 ${size.large}`,
            width: '90%',
        }}
        transparent
        triggerComponent={trigger}
    >
        <VideoEmbed
            nodeData={{
                argument: [{ value: id }],
                name: 'twitch',
            }}
            autoplay={true}
        />
    </Modal>
);

const Thumbnail = ({ video }) => {
    let thumbnailUrl = greenPatternImage; //fallback image if there is none
    let dimensionsMatcher = '{width}x{height}';
    if (video.thumbnail_url) {
        const containsSpace = video.thumbnail_url.match('%{width}x%{height}');
        dimensionsMatcher = containsSpace
            ? '%{width}x%{height}'
            : dimensionsMatcher;
        thumbnailUrl = video.thumbnail_url.replace(
            dimensionsMatcher,
            `${MEDIA_WIDTH}x${MEDIA_WIDTH}`
        );
    }

    return (
        <ThumbnailCard
            maxWidth={MEDIA_WIDTH}
            image={thumbnailUrl}
            title={video.title}
        >
            <TwitchVideoModal
                id={video.id}
                trigger={<ThumbnailButton play />}
            />
        </ThumbnailCard>
    );
};

export default () => {
    const { stream, videos } = useTwitchApi();
    const { siteUrl, title } = useSiteMetadata();
    const twitchVideo = useMemo(() => {
        if (stream) return stream;
        if (videos && videos.length) return videos[0];
        return null;
    }, [stream, videos]);

    return (
        <Layout>
            <Helmet>
                <title>{title}</title>
                <script type="application/ld+json">
                    {getPageSchema(siteUrl)}
                </script>
            </Helmet>
            <BackgroundImage>
                {stream && (
                    <Notification link={stream.url} title={stream.title} />
                )}
                <Hero>
                    <Heading>
                        {`ideas.find({"attributes":`}
                        <br />
                        {`["fast", "innovative", "original"]})`}
                    </Heading>
                    <Sub>What will you create today?</Sub>
                    <CardGallery>
                        <StyledTopCard
                            maxTitleLines={3}
                            image={nodejsIllustration}
                            to="/how-to/nextjs-building-modern-applications"
                            title="Building Modern Applications with Next.js and
                            MongoDB"
                        />
                        <StyledTopCard
                            maxTitleLines={3}
                            image={pythonImage}
                            to="/how-to/python-starlette-stitch"
                            title="Build a Property Booking Website with Starlette,
                            MongoDB, and Twilio"
                        />
                        <StyledTopCard
                            maxTitleLines={3}
                            image={graphqlImage}
                            to="/how-to/graphql-support-atlas-stitch"
                            title="Introducing GraphQL Support in MongoDB Atlas with
                            Stitch"
                        />
                        <StyledTopCard
                            maxTitleLines={3}
                            image={buildImage}
                            to="/quickstart/free-atlas-cluster"
                            title="Quick Start: Getting Your Free MongoDB Atlas Cluster"
                        />
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
                            twitchVideo && <Thumbnail video={twitchVideo} />
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
                            {twitchVideo && (
                                <TwitchVideoModal
                                    id={twitchVideo.id}
                                    trigger={<Button secondary>Watch</Button>}
                                />
                            )}
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
