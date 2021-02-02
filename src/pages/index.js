import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';
import Layout from '~components/dev-hub/layout';
import Notification from '~components/dev-hub/notification';
import homepageBackground from '~images/1x/homepage-background.png';
import useTwitchApi from '~hooks/use-twitch-api';
import { useSiteMetadata } from '~hooks/use-site-metadata';
import {
    AcademiaFeature,
    CommunityFeature,
    EventsFeature,
    Hero,
    TwitchFeature,
} from '~components/pages/home';

const BackgroundImage = styled('div')`
    background-image: url(${homepageBackground});
    background-size: cover;
`;

const Index = ({ pageContext: { fallbackTwitchVideo, featuredItems } }) => {
    const { stream, videos } = useTwitchApi();
    const { title } = useSiteMetadata();
    const twitchVideo = useMemo(() => {
        if (stream) return stream;
        if (videos && videos.length) return videos[0];
        return fallbackTwitchVideo;
    }, [fallbackTwitchVideo, stream, videos]);
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
                <Hero featuredItems={featuredItems} />
                <TwitchFeature twitchVideo={twitchVideo} />
                <EventsFeature />
                <AcademiaFeature />
                <CommunityFeature />
            </BackgroundImage>
        </Layout>
    );
};

export default Index;
