import React from 'react';
import styled from '@emotion/styled';
import HeroBanner from '../../components/dev-hub/hero-banner';
import Layout from '../../components/dev-hub/layout';
import { sampleEvents } from '../../components/dev-hub/events';
import EventsList from '../../components/dev-hub/event-list';
import { H1, H3, P } from '../../components/dev-hub/text';
import TempBackgroundImage from '../../images/1x/MDB-and-Node.js.png';
import { colorMap } from '../../components/dev-hub/theme';
import { size } from '../../components/dev-hub/theme';

const EventsFilter = styled('div')`
    margin-bottom: ${size.medium};
`;

const PageDescription = styled(P)`
    color: ${colorMap.greyLightTwo};
`;

export default ({ ...data }) => {
    // TODO: uncomment below when events api is working
    // const [events, error] = useEventData(EVENTS_API);
    console.log(data);

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
                    {/* TODO: Add FilterBar */}
                    <H3>All Events</H3>
                </EventsFilter>
                {/* TODO: remove below when events_api is working */}
                <EventsList items={[...sampleEvents, ...sampleEvents]} />
            </section>
        </Layout>
    );
};
