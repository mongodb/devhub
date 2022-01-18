import React from 'react';
import CardList from './card-list';
import { LearnPageTabs } from '../../utils/learn-page-tabs';

const ActiveCardListFilter = ({ activeContentTab, textFilterResults }) => {
    switch (activeContentTab) {
        case LearnPageTabs.articles:
            return <CardList articles={textFilterResults} shouldSort />;
        case LearnPageTabs.videos:
            return <CardList videos={textFilterResults} shouldSort />;
        case LearnPageTabs.podcasts:
            return <CardList podcasts={textFilterResults} shouldSort />;
        default:
            return <CardList all={textFilterResults} shouldSort />;
    }
};

export default ActiveCardListFilter;
