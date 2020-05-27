import React from 'react';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';
import { css } from '@emotion/core';
import Button from '../../components/dev-hub/button';
import HeroBanner from '../../components/dev-hub/hero-banner';
import Layout from '../../components/dev-hub/layout';
import Link from '../../components/dev-hub/link';
import { EventsListPreview } from '../../components/dev-hub/event-list';
import { H2, P } from '../../components/dev-hub/text';
import {
    colorMap,
    screenSize,
    fontSize,
    size,
} from '../../components/dev-hub/theme';
import communityHeroBackground from '../../images/1x/Community-hero.png';
import { useSiteMetadata } from '../../hooks/use-site-metadata';

const sectionPadding = css`
    padding: ${size.xlarge} ${size.medium};
    @media ${screenSize.upToMedium} {
        padding: ${size.large} ${size.default};
    }
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

const CommunityHeroBanner = styled(HeroBanner)`
    @media ${screenSize.largeAndUp} {
        margin-bottom: ${size.xxlarge};
    }
`;

export default () => {
    const { title } = useSiteMetadata();
    return (
        <Layout>
            <Helmet>
                <title>Community - {title}</title>
            </Helmet>
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
            <CommunityHeroBanner
                background={communityHeroBackground}
                showImageOnMobile={false}
            >
                <HeroContent>
                    <H2 bold>Join the Community Forums</H2>
                    <P>
                        Collaborate with other MongoDB users. Solve problems.
                        Build the future.
                    </P>
                    <Button
                        primary
                        href="https://developer.mongodb.com/community/forums"
                    >
                        Join
                    </Button>
                </HeroContent>
            </CommunityHeroBanner>
        </Layout>
    );
};
