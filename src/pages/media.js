import React from 'react';
import Layout from '../components/dev-hub/layout';
import useAllVideos from '../hooks/use-all-videos';
import { P } from '../components/dev-hub/text';
import CardList from '../components/dev-hub/card-list';

export default () => {
    const { videos, error, isLoading } = useAllVideos();

    return (
        <Layout>
            {isLoading && <P>Loading...</P>}
            {videos && <CardList videos={videos} />}
            {error && <P>Check back later for upcoming media contents</P>}
        </Layout>
    );
};
