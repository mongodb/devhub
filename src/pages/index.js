import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';
import Card from '../components/dev-hub/card';
import Layout from '../components/dev-hub/layout';
import Notification from '../components/dev-hub/notification';
import { H1, SubHeader } from '../components/dev-hub/text';
import { screenSize, size } from '../components/dev-hub/theme';
import Button from '../components/dev-hub/button';
import homepageBackground from '../images/1x/homepage-background.png';
import useTwitchApi from '../hooks/use-twitch-api';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import { getFeaturedCardFields } from '../utils/get-featured-card-fields';
import {
    AcademiaFeature,
    CommunityFeature,
    EventsFeature,
    TwitchFeature,
} from '../components/pages/home';

const BackgroundImage = styled('div')`
    background-image: url(${homepageBackground});
    background-size: cover;
`;
const Hero = styled('header')`
    color: ${({ theme }) => theme.colorMap.devWhite};
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

// TODO: Generalize as new content types are supported
const FeaturedHomePageItem = ({ item }) => {
    if (item.type === 'article') {
        const { image, slug, title } = getFeaturedCardFields(item);
        return (
            <StyledTopCard
                maxTitleLines={3}
                image={image}
                to={slug}
                title={title}
                key={title}
            />
        );
    }
};

export default ({ pageContext: { featuredItems } }) => {
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
                <meta
                    name="description"
                    content="Code, content, tutorials, programs and community to enable developers of all skill levels on the MongoDB Data Platform which includes Atlas, Realm, Compass, Data Lake and more. Whether you're coding in Java, JavaScript, C#, Python, Node, Go or looking for how this fits with IOT, AI, ML - join or follow us here."
                />
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
                        {featuredItems.map(item => (
                            <FeaturedHomePageItem item={item} />
                        ))}
                    </CardGallery>
                    <div>
                        <Button to="/learn" primary>
                            Learn MongoDB
                        </Button>
                    </div>
                </Hero>
                <TwitchFeature twitchVideo={twitchVideo} />
                <EventsFeature />
                <AcademiaFeature />
                <CommunityFeature />
            </BackgroundImage>
        </Layout>
    );
};
