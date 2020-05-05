import React, { useState } from 'react';
import Layout from '../components/dev-hub/layout';
import Tab from '../components/dev-hub/tab';
import useAllVideos from '../hooks/use-all-videos';
import usePodcasts from '../hooks/use-podcasts';
import { P } from '../components/dev-hub/text';
import CardList from '../components/dev-hub//card-list';

export default () => {
    const { videos, error, isLoading } = useAllVideos();
    const {
        podcasts,
        error: errorPodcasts,
        isLoading: isLoadingPodcasts,
    } = usePodcasts();

    const [activeItem, setActiveItem] = useState('All');

    const display = content => {
        setActiveItem(content);
    };

    const leftTabs = ['All'];
    const rightTabs = ['Articles', 'Videos', 'Podcasts'];

    return (
        <Layout>
            <Tab
                handleClick={display}
                leftTabs={leftTabs}
                rightTabs={rightTabs}
                activeItem={activeItem}
            />

            {(isLoading || isLoadingPodcasts) && <P>Loading...</P>}

            {/*TODO: display articles once we have access to them*/}

            {activeItem === 'All' && (
                <CardList videos={videos} podcasts={podcasts} />
            )}
            {activeItem === 'Videos' && <CardList videos={videos} />}
            {activeItem === 'Podcasts' && <CardList podcasts={podcasts} />}

            {(error || errorPodcasts) && (
                <P>Check back later for upcoming media contents</P>
            )}
        </Layout>
    );
};
