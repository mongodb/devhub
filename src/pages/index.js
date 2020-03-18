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
import greenPatternImage from '../images/2x/pattern-green@2x.png';
import meetupsImage from '../images/1x/Meetups.png';
import GradientUnderline from '../components/dev-hub/gradient-underline';
import homepageBackground from '../images/1x/homepage-background.png';
import ProjectSignUpForm from '../components/dev-hub/project-sign-up-form';
import useTwitchApi from '../utils/use-twitch-api';
import { Modal } from '../components/dev-hub/modal';
import VideoEmbed from '../components/dev-hub/video-embed';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import { getFeaturedCardFields } from '../utils/get-featured-card-fields';

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
    width: 100%;
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

const SIZE_TOKEN = '%{width}x%{height}';
const SIZE_TOKEN_ALT = '{width}x{height}';

const getThumbnail = (url, width = MEDIA_WIDTH, height = MEDIA_WIDTH) => {
    if (!url) {
        return greenPatternImage;
    }
    const containsSpace = url.match(SIZE_TOKEN);
    const dimensionsMatcher = containsSpace ? SIZE_TOKEN : SIZE_TOKEN_ALT;
    return url.replace(dimensionsMatcher, `${width}x${height}`);
};

const TwitchVideoModal = ({ id, trigger, thumbnail }) => (
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
            thumbnail={thumbnail}
        />
    </Modal>
);

const Thumbnail = ({ video }) => {
    return (
        <ThumbnailCard
            maxWidth={MEDIA_WIDTH}
            image={getThumbnail(video.thumbnail_url)}
            title={video.title}
        >
            <TwitchVideoModal
                id={video.id}
                trigger={<ThumbnailButton play />}
                thumbnail={getThumbnail(video.thumbnail_url, 1200)}
            />
        </ThumbnailCard>
    );
};

export default ({ pageContext: { featuredArticles } }) => {
    const { stream, videos } = useTwitchApi();
    const { title } = useSiteMetadata();
    const twitchVideo = useMemo(() => {
        if (stream) return stream;
        if (videos && videos.length) return videos[0];
        return null;
    }, [stream, videos]);

    return (
        <Layout>
            <Helmet>
                <title>{title}</title>
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
                        {featuredArticles.map(article => {
                            const {
                                image,
                                slug,
                                title,
                            } = getFeaturedCardFields(article);
                            return (
                                <StyledTopCard
                                    maxTitleLines={3}
                                    image={image}
                                    to={slug}
                                    title={title}
                                    key={title}
                                />
                            );
                        })}
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
                                    thumbnail={getThumbnail(
                                        twitchVideo.thumbnail_url,
                                        1200
                                    )}
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
