import React from 'react';
import styled from '@emotion/styled';
import HeroBanner from '../../components/dev-hub/hero-banner';
import Layout from '../../components/dev-hub/layout';
import { sampleEvents } from '../../components/dev-hub/events';
import EventsList from '../../components/dev-hub/event-list';
import { H1, H2, P } from '../../components/dev-hub/text';
import TempBackgroundImage from '../../images/1x/MDB-and-Node.js.png';
import { colorMap } from '../../components/dev-hub/theme';
import FilterBar from '../../components/dev-hub/filter-bar';
import { size } from '../../components/dev-hub/theme';

const EventsFilter = styled('div')`
    margin-bottom: ${size.medium};
`;

const PageDescription = styled(P)`
    color: ${colorMap.greyLightTwo};
`;

export default () => {
    // TODO: uncomment below when events api is working
    // const [events, error] = useEventData(EVENTS_API);

    return (
        <Layout>
            <HeroBanner
                background={TempBackgroundImage}
                breadcrumb={[
                    { label: 'Home', to: '/' },
                    { label: 'Community', to: '/community' },
                    { label: 'Events', to: '/community/events' },
                ]}
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
                    {/* TODO: Update filter bar below to filter by other content */}
                    <FilterBar heading="All Events" />
                </EventsFilter>
                {/* TODO: remove below when events_api is working */}
                <EventsList items={[...sampleEvents, ...sampleEvents]} />
            </section>
        </Layout>
    );
};
