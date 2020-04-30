import React from 'react';
import Layout from '../components/dev-hub/layout';
import useAllVideos from '../hooks/use-all-videos';
import { P } from '../components/dev-hub/text';
import CardList from '../components/dev-hub/card-list';
import usePodcasts from '../hooks/use-podcasts';
import Tab from '../components/dev-hub/tab';

export default () => {
    const { videos, error, isLoading } = useAllVideos();
    const { podcasts, errorPodcasts, isLoadingPodcasts } = usePodcasts();
    console.log(podcasts);
    return (
        <Layout>
            <Tab />
            {(isLoading || isLoadingPodcasts) && <P>Loading...</P>}
            {videos && <CardList videos={videos} podcasts={podcasts} />}
            {(error || errorPodcasts) && (
                <P>Check back later for upcoming media contents</P>
            )}
        </Layout>
    );
};
