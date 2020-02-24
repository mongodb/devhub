import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import HeroBanner from '../../components/dev-hub/hero-banner';
import Layout from '../../components/dev-hub/layout';
import { sampleEvents } from '../../components/dev-hub/events';
import EventsList, {
    EVENTS_API,
    EventsListPreview,
    useEventData,
} from '../../components/dev-hub/event-list';
import { H1, H2, P } from '../../components/dev-hub/text';
import TempBackgroundImage from '../../images/1x/MDB-and-Node.js.png';
import { colorMap } from '../../components/dev-hub/theme';
import FilterBar from '../../components/dev-hub/filter-bar';
import FeatureBlock from '../../components/dev-hub/feature-block';
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
            <FeatureBlock
                title="Bring MongoDB to You"
                description="Inspire, connect, and learn from MongoDB developers all around the world. Bring your friends and your local community together for MongoDB fun. We’ll support you along the way."
                imgDescription="A fun arcade night hosted by the NYC Community."
                cta={{
                    text: 'Host your own MongoDB event',
                }}
            />
        </Layout>
    );
};
