import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Button from '../../components/dev-hub/button';
import CardList from '../../components/dev-hub/card-list';
import GradientImage from '../../components/dev-hub/gradient-image';
import HeroBanner from '../../components/dev-hub/hero-banner';
import Layout from '../../components/dev-hub/layout';
import MediaBlock from '../../components/dev-hub/media-block';
import Link from '../../components/dev-hub/link';
import { sampleEvents } from '../../components/dev-hub/events';
import EventsList, {
    EventsListPreview,
} from '../../components/dev-hub/event-list';
import { H1, H2, P, H4 } from '../../components/dev-hub/text';
import TempBackgroundImage from '../../images/1x/MDB-and-Node.js.png';
import { colorMap } from '../../components/dev-hub/theme';
import FilterBar from '../../components/dev-hub/filter-bar';

const PageDescription = styled(P)`
    color: ${colorMap.greyLightTwo};
`;

export default ({ ...data }) => {
    console.log({ sampleEvents });
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
                <header>
                    {/* TODO: Update filter bar below to filter by other content */}
                    <FilterBar heading="All Events" />
                </header>
                <EventsList items={sampleEvents} />
            </section>
        </Layout>
    );
};
