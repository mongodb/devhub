import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Button from '../components/dev-hub/button';
import Card from '../components/dev-hub/card';
import GradientImage from '../components/dev-hub/gradient-image';
import Layout from '../components/dev-hub/layout';
import MediaBlock from '../components/dev-hub/media-block';
import Link from '../components/dev-hub/link';
import { Event, EventList } from '../components/dev-hub/events';
import { H1, H2, P, H4 } from '../components/dev-hub/text';
import { size, colorMap, screenSize } from '../components/dev-hub/theme';

const PAGE_MAX_WIDTH = '1200px';
const maxWidthStyles = css`
    max-width: 500px;
    @media ${screenSize.upToMedium} {
        width: 100%;
    }
`;
const sectionPadding = css`
    padding: ${size.xlarge} ${size.default};
    @media ${screenSize.upToMedium} {
        padding: ${size.large} ${size.default};
    }
`;

const ProjectActions = styled('div')`
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @media ${screenSize.upToMedium} {
        align-items: start;
        flex-direction: column;
        > *:first-child {
            margin: ${size.large} 0;
        }
    }
`;

const ProjectDescription = styled('div')`
    p {
        margin-bottom: ${size.xlarge};
        @media ${screenSize.upToMedium} {
            margin-bottom: 0;
        }
    }
    ${maxWidthStyles}
`;

const FeaturedProject = styled('section')`
    background-color: ${colorMap.devBlack};
    > div:first-child {
        margin: 0 auto;
        max-width: ${PAGE_MAX_WIDTH};
    }
    ${sectionPadding}
`;

const EventsHeader = styled('header')`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const UpcomingEvents = styled('section')`
    margin: 0 auto;
    max-width: ${PAGE_MAX_WIDTH};
    ${sectionPadding}
    /* hide mobile 'view all' btn */
    [type="button"] {
        display: none;
    }
    @media ${screenSize.upToMedium} {
        /* toggle mobile/desktop 'view all' cta's */
        a {
            display: none;
        }
        [type='button'] {
            display: block;
        }
    }
`;

const HeroContent = styled('div')`
    margin: 0 auto;
    text-align: left;
    max-width: ${PAGE_MAX_WIDTH};
    p {
        width: 70%;
        @media ${screenSize.upToMedium} {
            width: 100%;
        }
    }
`;

const Hero = styled('header')`
    background-color: ${colorMap.devBlack};
    ${sectionPadding}
`;

export default ({ ...data }) => {
    return (
        <Layout>
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
            <UpcomingEvents>
                <EventsHeader>
                    <H2 bold>Upcoming Events</H2>
                    <Link to="/community" tertiary>
                        See all events
                    </Link>
                </EventsHeader>
                <EventList />
                <Button to="/community" secondary>
                    View all
                </Button>
            </UpcomingEvents>
            <FeaturedProject>
                <MediaBlock
                    mediaComponent={
                        <GradientImage
                            css={maxWidthStyles}
                            src="/images/compass-create-database.png"
                        />
                    }
                    mediaWidth="100%"
                >
                    <ProjectDescription>
                        <H2 bold>
                            Made by Developers <br />
                            like You
                        </H2>
                        <H4 bold>Radar</H4>
                        <P>
                            Radar is a startup that helps companies make better
                            decisions with location data. Their technology is
                            built for scale with MongoDB Atlas and AWS, and it’s
                            currently running on more than 25 million devices
                            around the globe.
                        </P>
                        <ProjectActions>
                            <Button to="#" secondary>
                                Learn how they did it
                            </Button>
                            <Link to="#" tertiary>
                                Share your project
                            </Link>
                        </ProjectActions>
                    </ProjectDescription>
                </MediaBlock>
            </FeaturedProject>
        </Layout>
    );
};
