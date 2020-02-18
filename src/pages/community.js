import React from 'react';
import styled from '@emotion/styled';
import Button from '../components/dev-hub/button';
import Card from '../components/dev-hub/card';
import Layout from '../components/dev-hub/layout';
import MediaBlock from '../components/dev-hub/media-block';
import { Link } from '@reach/router';
import { H1, H2, P, H4 } from '../components/dev-hub/text';
import { size } from '../components/dev-hub/theme';

const HeroContent = styled('div')`
    margin: 0 auto;
    max-width: 1024px;
    text-align: left;
    width: 60%;
`;

const Hero = styled('header')`
    width: 100vw;
    min-height: 40vh;
    padding: ${size.large} 0;
`;

export default ({ ...data }) => {
    return (
        <Layout>
            <H1>Community</H1>
            <Hero>
                <HeroContent>
                    <H2 bold>Find Your Place</H2>
                    <P>
                        Do you want to share your amazing work? Do you have a
                        question or a problem and are looking for help? Do you
                        want to get connected with and inspired by others with a
                        passion for MongoDB? Join the MongoDB Community!
                    </P>
                    <Button primary>Join our online community</Button>
                </HeroContent>
            </Hero>
            <div>
                <H2 bold>Upcoming Events</H2>
                <div>
                    list of events
                    <Link to="#">See all events</Link>
                </div>
            </div>
            <div>
                <MediaBlock
                    mediaComponent={
                        <Card
                            image="/images/compass-create-database.png"
                            gradient
                        ></Card>
                    }
                >
                    <div>
                        <H2 bold>Made by Developers like You</H2>
                        <H4 bold>Radar</H4>
                        <P>
                            Radar is a startup that helps companies make better
                            decisions with location data. Their technology is
                            built for scale with MongoDB Atlas and AWS, and it’s
                            currently running on more than 25 million devices
                            around the globe.
                        </P>
                        <Button secondary>Learn how they did it</Button>
                        <Link to="#">Share your project</Link>
                    </div>
                </MediaBlock>
            </div>
        </Layout>
    );
};
