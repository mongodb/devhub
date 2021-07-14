import React, { useContext, useMemo } from 'react';
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
import { SITE_URL } from '~src/constants';
import { AuthenticationContext } from '~components/dev-hub/SSO';

const BackgroundImage = styled('div')`
    background-image: url(${homepageBackground});
    background-size: cover;
`;

const Index = ({ pageContext: { fallbackTwitchVideo, featuredItems } }) => {
    const { user } = useContext(AuthenticationContext);
    console.log(user);
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
                <script type="application/ld+json">
                    {JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Organization',
                        name: 'MongoDB Developer Hub',
                        logo:
                            'https://webassets.mongodb.com/_com_assets/cms/mongodb_logo1-76twgcu2dm.png',
                        url: SITE_URL,
                        telephone: '+1-844-666-4632',
                        sameAs: [
                            'https://www.facebook.com/MongoDB/',
                            'https://www.instagram.com/mongodb/',
                            'https://www.linkedin.com/company/mongodbinc/',
                            'https://www.youtube.com/user/mongodb',
                            'https://twitter.com/MongoDB',
                            'https://en.wikipedia.org/wiki/MongoDB',
                        ],
                        contactPoint: [
                            {
                                '@type': 'ContactPoint',
                                telephone: '+1-646-201-9247',
                                contactType: 'technical support',
                            },
                        ],
                    })}
                </script>
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
