import React from 'react';
import CardList from './card-list';
import { LearnPageTabs } from '../../utils/learn-page-tabs';

const ActiveCardListFilter = ({ activeContentTab, textFilterResults }) => {
    switch (activeContentTab) {
        case LearnPageTabs.articles:
            return <CardList articles={textFilterResults} />;
        case LearnPageTabs.videos:
            return <CardList videos={textFilterResults} />;
        case LearnPageTabs.podcasts:
            return <CardList podcasts={textFilterResults} />;
        default:
            return <CardList all={textFilterResults} />;
    }
};

export default ActiveCardListFilter;
