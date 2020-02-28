import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Button from '../../components/dev-hub/button';
import GradientImage from '../../components/dev-hub/gradient-image';
import HeroBanner from '../../components/dev-hub/hero-banner';
import Layout from '../../components/dev-hub/layout';
import MediaBlock from '../../components/dev-hub/media-block';
import Link from '../../components/dev-hub/link';
import { EventsListPreview } from '../../components/dev-hub/event-list';
import { H2, P, H4 } from '../../components/dev-hub/text';
import {
    colorMap,
    screenSize,
    fontSize,
    size,
} from '../../components/dev-hub/theme';
import ProjectSignUpForm from '../../components/dev-hub/project-sign-up-form';
import mockCardImage from '../../images/360-mock-card.png';
import communityHeroBackground from '../../images/1x/Community-hero.png';

const maxWidthStyles = css`
    max-width: 500px;
    @media ${screenSize.upToMedium} {
        width: 100%;
    }
`;
const sectionPadding = css`
    padding: ${size.xlarge} ${size.medium};
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
    margin: 0 auto;
    max-width: 100%;
    p {
        color: ${colorMap.greyLightTwo};
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
    }
    ${sectionPadding}
`;

const SectionTitle = styled(H2)`
    font-size: ${fontSize.xlarge};
`;

const MobileViewAllBtn = styled(Button)`
    align-self: center;
    display: none;
    margin-top: ${size.default};
    @media ${screenSize.upToMedium} {
        display: inline-block;
    }
`;

const EventsHeader = styled('header')`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @media ${screenSize.upToMedium} {
        /* toggle mobile/desktop 'view all' cta's */
        a {
            display: none;
        }
    }
`;

const UpcomingEvents = styled('section')`
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    ${sectionPadding}
    h2 {
        align-self: start;
    }
`;

const HeroContent = styled('div')`
    padding-top: ${size.large};
    p {
        color: ${colorMap.greyLightTwo};
        margin-bottom: ${size.xlarge};
        @media ${screenSize.upToMedium} {
            margin-bottom: ${size.large};
        }
    }
`;

export default ({ ...data }) => {
    return (
        <Layout>
            <HeroBanner
                background={communityHeroBackground}
                showImageOnMobile={false}
            >
                <HeroContent>
                    <H2 bold>Find Your Place</H2>
                    <P>
                        Have a burning question you want to ask? Looking for a
                        community of like minded developers?
                    </P>
                    <Button primary href="https://community.mongodb.com/">
                        Join
                    </Button>
                </HeroContent>
            </HeroBanner>
            <UpcomingEvents>
                <EventsHeader>
                    <SectionTitle bold>Upcoming Events</SectionTitle>
                    <Link to="/community/events" tertiary>
                        See all events
                    </Link>
                </EventsHeader>
                <EventsListPreview />
                <MobileViewAllBtn to="/community/events" secondary>
                    View all
                </MobileViewAllBtn>
            </UpcomingEvents>
            <FeaturedProject>
                <MediaBlock
                    mediaComponent={
                        <GradientImage
                            css={maxWidthStyles}
                            src={mockCardImage}
                        />
                    }
                    mediaWidth={500}
                >
                    <ProjectDescription>
                        <SectionTitle bold>
                            Made by Developers <br />
                            like You
                        </SectionTitle>
                        <H4 bold>Radar</H4>
                        <P>
                            Radar is a startup that helps companies make better
                            decisions with location data. Their technology is
                            built for scale with MongoDB Atlas and AWS, and it’s
                            currently running on more than 25 million devices
                            around the globe.
                        </P>
                        <ProjectActions>
                            <Button to="/article" primary>
                                Learn how they did it
                            </Button>
                            <ProjectSignUpForm
                                triggerComponent={
                                    <Link tertiary>Share your project</Link>
                                }
                            />
                        </ProjectActions>
                    </ProjectDescription>
                </MediaBlock>
            </FeaturedProject>
        </Layout>
    );
};
