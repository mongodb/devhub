import React from 'react';
import CardList from './card-list';
import { LearnPageTabs } from '../../utils/learn-page-tabs';

const ActiveCardList = ({
    activeContentTab,
    articles,
    videos,
    podcasts,
    hasNoFilter,
}) => {
    switch (activeContentTab) {
        case LearnPageTabs.articles:
            return <CardList articles={articles} shouldSort />;
        case LearnPageTabs.videos:
            return <CardList videos={videos} shouldSort />;
        case LearnPageTabs.podcasts:
            return <CardList podcasts={podcasts} shouldSort />;
        default:
            return (
                <CardList
                    shouldSort
                    articles={articles}
                    videos={hasNoFilter ? videos : []}
                    podcasts={hasNoFilter ? podcasts : []}
                />
            );
    }
};

export default ActiveCardList;
