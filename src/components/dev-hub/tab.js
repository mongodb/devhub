import { React, useState } from 'react';
import styled from '@emotion/styled';
import { colorMap, size } from './theme';
import { P } from './text';
import CardList from './card-list';
import useAllVideos from '../../hooks/use-all-videos';
import usePodcasts from '../../hooks/use-podcasts';

const Tab = styled('div')`
    overflow: hidden;
    border-bottom: 1px solid ${colorMap.greyDarkOne};
    margin-left: 38px;
    margin-right: 38px;
    margin-top: 50px;
    margin-bottom: 30px;
`;

const TabButton = styled('button')`
    float: right;
    border: none;
    outline: none;
    cursor: pointer;
    transition: 0.3s;
    font-size: 18px;
    font-family: Fira Mono;
    color: ${colorMap.greyDarkOne};
    background-color: inherit;
    border-bottom: 3px solid transparent;
    width: 136px;
    padding-top: ${size.micro};
    padding-bottom: ${size.medium};
    padding-left: ${size.mediumLarge};
    padding-right: ${size.mediumLarge};
    &:hover {
        color: white;
    }
    &:focus {
        border-bottom-color: ${colorMap.darkGreen};
    }
`;

const AllContentStyle = {
    marginRight: '818px',
    width: '136px',
};

export default () => {
    const { videos, error, isLoading } = useAllVideos();
    const {
        podcasts,
        error: errorPodcasts,
        isLoading: isLoadingPodcasts,
    } = usePodcasts();

    const [showVideos, setShowVideos] = useState(false);
    const [showPodcasts, setShowPodcasts] = useState(false);
    const [showArticles, setShowArticles] = useState(false);
    const [showAll, setShowAll] = useState(true);

    const displayVideos = () => {
        setShowAll(false);
        setShowVideos(true);
        setShowPodcasts(false);
        setShowArticles(false);
    };

    const displayPodcasts = () => {
        setShowAll(false);
        setShowPodcasts(true);
        setShowVideos(false);
        setShowArticles(false);
    };

    const displayArticles = () => {
        setShowAll(false);
        setShowArticles(true);
        setShowPodcasts(false);
        setShowVideos(false);
    };

    const displayAll = () => {
        setShowAll(true);
        setShowArticles(false);
        setShowVideos(false);
        setShowPodcasts(false);
    };

    return (
        <div>
            <Tab collapse>
                <TabButton onClick={() => displayVideos()}>Videos</TabButton>
                <TabButton onClick={() => displayPodcasts()}>
                    Podcasts
                </TabButton>
                <TabButton onClick={() => displayArticles()}>
                    Articles
                </TabButton>
                <TabButton style={AllContentStyle} onClick={() => displayAll()}>
                    All
                </TabButton>
            </Tab>

            {(isLoading || isLoadingPodcasts) && <P>Loading...</P>}

            {/*TODO: display articles once we have access to them*/}

            {showAll && <CardList videos={videos} podcasts={podcasts} />}
            {showVideos && <CardList videos={videos} />}
            {showPodcasts && <CardList podcasts={podcasts} />}

            {(error || errorPodcasts) && (
                <P>Check back later for upcoming media contents</P>
            )}
        </div>
    );
};
