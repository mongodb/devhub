import React from 'react';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';
import HeroBanner from '../../components/dev-hub/hero-banner';
import Layout from '../../components/dev-hub/layout';
import useEventData from '../../hooks/use-event-data';
import EventsList from '../../components/dev-hub/event-list';
import { H1, H3, P } from '../../components/dev-hub/text';
import AllEventsBackgroundImage from '../../images/1x/all-events-hero.png';
import { colorMap } from '../../components/dev-hub/theme';
import { size } from '../../components/dev-hub/theme';
import { useSiteMetadata } from '../../hooks/use-site-metadata';
const EventsFilter = styled('div')`
    margin-bottom: ${size.medium};
`;

const PageDescription = styled(P)`
    color: ${colorMap.greyLightTwo};
`;

const breadcrumbs = [
    { label: 'Home', target: '/' },
    { label: 'Community', target: '/community' },
    { label: 'Events', target: '/community/events' },
];

export default () => {
    const [events, error, isLoading] = useEventData();

    const metadata = useSiteMetadata();
    return (
        <Layout>
            <Helmet>
                <title>Events - {metadata.title}</title>
            </Helmet>
            <HeroBanner
                background={AllEventsBackgroundImage}
                breadcrumb={breadcrumbs}
                showImageOnMobile={false}
            >
                <H1>Events</H1>
                <PageDescription>
                    Join us in a city near you to connect with MongoDB users who
                    are shaking up their industries, and be among the first to
                    hear updates and exciting news.
                </PageDescription>
            </HeroBanner>
            <section>
                <EventsFilter>
                    {/* TODO: Add FilterBar */}
                    <H3>All Events</H3>
                </EventsFilter>
                {isLoading && <P>Loading...</P>}
                {events && <EventsList items={events} />}
                {error && <P>Check back later for upcoming events</P>}
            </section>
        </Layout>
    );
};
