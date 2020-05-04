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

    const [showContent, setShowContent] = useState('All');
    const [activeItem, setActiveItem] = useState('All');

    const display = content => {
        setShowContent(content);
        setActiveItem(content);
    };

    const tabTexts = ['All', 'Articles', 'Videos', 'Podcasts'];

    return (
        <Layout>
            <Tab
                handleClick={display}
                tabTexts={tabTexts}
                activeItem={activeItem}
            />

            {(isLoading || isLoadingPodcasts) && <P>Loading...</P>}

            {/*TODO: display articles once we have access to them*/}

            {showContent === 'All' && (
                <CardList videos={videos} podcasts={podcasts} />
            )}
            {showContent === 'Videos' && <CardList videos={videos} />}
            {showContent === 'Podcasts' && <CardList podcasts={podcasts} />}

            {(error || errorPodcasts) && (
                <P>Check back later for upcoming media contents</P>
            )}
        </Layout>
    );
};
