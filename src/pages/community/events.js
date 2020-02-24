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
import FeatureBlock from '../../components/dev-hub/feature-block';

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
                {/* TODO: Update filter bar below to filter by other content */}
                <FilterBar heading="All Events" />
                <EventsList items={[ ...sampleEvents, ...sampleEvents]} />
            </section>
            <FeatureBlock
                title="Bring MongoDB to You"
                description="Inspire, connect, and learn from MongoDB developers all around the world. Bring your friends and your local community together for MongoDB fun. We’ll support you along the way."
                imgDescription="A fun arcade night hosted by the NYC Community."

                cta={{
                    text: 'Host your own MongoDB event'
                }}
            />
        </Layout>
    );
};
