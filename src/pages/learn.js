import React, { useCallback, useMemo, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';
import Layout from '../components/dev-hub/layout';
import CardList from '../components/dev-hub/card-list';
import EmptyTextFilterResults from '../components/dev-hub/empty-text-filter-results';
import FilterBar from '../components/dev-hub/filter-bar';
import { size } from '../components/dev-hub/theme';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import { buildQueryString, parseQueryString } from '../utils/query-string';
import { LearnPageTabs } from '../utils/learn-page-tabs';
import useAllVideos from '../hooks/use-all-videos';
import usePodcasts from '../hooks/use-podcasts';
import useTextFilter from '../hooks/use-text-filter';
import Tab from '../components/dev-hub/tab';

const Article = styled('article')`
    padding: ${size.medium};
`;

const StyledFilterBar = styled(FilterBar)`
    margin: 0 ${size.large};
    padding-bottom: ${size.large};
`;

const TabBar = styled(Tab)`
    padding-top: ${size.large};
    margin: 0 ${size.large};
`;

const parseArticles = arr =>
    arr.map(({ _id, query_fields }) => {
        return { _id, ...query_fields };
    });

// strip out the 'All' param from the url and the stitch function key
const stripAllParam = filterValue => {
    const newFilter = {};
    Object.keys(filterValue).forEach(key => {
        if (filterValue[key] !== 'all') {
            newFilter[key] = filterValue[key];
        }
    });
    return newFilter;
};

const filterArticles = (filter, initialArticles) => {
    const filterValues = Object.keys(filter);
    return initialArticles.reduce((acc, article) => {
        for (let i = 0; i < filterValues.length; i++) {
            if (filterValues[i] === 'page' || filterValues[i] === 'content') {
                continue;
            }
            const fv = filterValues[i];
            const filterValuesForArticle = article[fv];
            const filterValueRequired = filter[fv];
            // If the article does not pass this specific filter, don't include it
            if (
                !(
                    filterValuesForArticle &&
                    filterValuesForArticle.includes(filterValueRequired)
                )
            ) {
                return acc;
            }
        }
        // This article passes all filters, so include it
        acc.push(article);
        return acc;
    }, []);
};

export default ({
    location,
    navigate,
    pageContext: { allArticles, allPodcasts, allVideos, filters },
}) => {
    const metadata = useSiteMetadata();
    const initialArticles = useMemo(() => parseArticles(allArticles), [
        allArticles,
    ]);
    const [articles, setArticles] = useState(initialArticles);
    const { search = '', pathname = '' } = location;
    const [filterValue, setFilterValue] = useState(parseQueryString(search));
    const [textFilterQuery, setTextFilterQuery] = useState(filterValue['text']);
    const { results: textFilterResults } = useTextFilter(textFilterQuery);
    const filterActiveArticles = useCallback(
        filter => filterArticles(filter, initialArticles),
        [initialArticles]
    );
    // Update the filter value for page so it behaves nicely with query params
    const updateAllPageFilters = useCallback(search => {
        const newFilterValues = parseQueryString(search);
        setFilterValue(newFilterValues);
        if (!newFilterValues.text) {
            setTextFilterQuery(null);
        }
    }, []);
    useEffect(() => {
        updateAllPageFilters(search);
    }, [search, updateAllPageFilters]);
    const updateTextFilterQuery = useCallback(
        query => {
            setTextFilterQuery(query);
            if (query) {
                filterValue['text'] = query;
            } else {
                delete filterValue['text'];
            }
            setFilterValue({ ...filterValue });
        },
        [filterValue]
    );
    const updateFilterQueryParams = useCallback(
        filterValue => {
            const filter = stripAllParam(filterValue);
            const searchParams = buildQueryString(filter);
            const filteredArticles = filterActiveArticles(filter);
            setArticles(filteredArticles);
            if (window.location.search !== searchParams) {
                // if the search params are empty, push the pathname state in order to remove params
                navigate(searchParams === '' ? pathname : searchParams, {
                    replace: true,
                });
            }
        },
        // Exclude "navigate" since it constantly changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [filterActiveArticles, pathname]
    );
    useEffect(() => {
        updateFilterQueryParams(filterValue);
    }, [filterValue, updateFilterQueryParams]);
    // filterValue could be {} on a page load, or values can be "all" if toggled back
    const hasNoFilter = useMemo(
        () =>
            (!filterValue.languages || filterValue.languages === 'all') &&
            (!filterValue.products || filterValue.products === 'all'),
        [filterValue]
    );

    const { videos } = useAllVideos(allVideos);

    const { podcasts } = usePodcasts(allPodcasts);

    const updateActiveFilter = useCallback(
        newTab => {
            if (newTab !== LearnPageTabs.all) {
                filterValue['content'] = newTab;
            } else {
                delete filterValue['content'];
            }
            setFilterValue({ ...filterValue });
        },
        [filterValue]
    );

    const activeContentTab = useMemo(
        () => filterValue['content'] || LearnPageTabs.all,
        [filterValue]
    );

    // If the user is on a tab not supporting the text filter, ignore the filter
    const showTextFilterResults = useMemo(
        () =>
            (activeContentTab === LearnPageTabs.all ||
                activeContentTab === LearnPageTabs.articles) &&
            textFilterQuery &&
            textFilterResults,
        [activeContentTab, textFilterQuery, textFilterResults]
    );

    const leftTabs = [LearnPageTabs.all];
    const rightTabs = [
        LearnPageTabs.articles,
        LearnPageTabs.videos,
        LearnPageTabs.podcasts,
    ];

    const ActiveCardList = () => {
        switch (activeContentTab) {
            case LearnPageTabs.articles:
                return <CardList articles={articles} />;
            case LearnPageTabs.videos:
                return <CardList videos={videos} />;
            case LearnPageTabs.podcasts:
                return <CardList podcasts={podcasts} />;
            default:
                return (
                    <CardList
                        articles={articles}
                        videos={hasNoFilter ? videos : []}
                        podcasts={hasNoFilter ? podcasts : []}
                    />
                );
        }
    };

    return (
        <Layout>
            <Helmet>
                <title>Learn - {metadata.title}</title>
            </Helmet>

            <TabBar
                // ID used specifically for anchor links
                id="main"
                handleClick={updateActiveFilter}
                leftTabs={leftTabs}
                rightTabs={rightTabs}
                activeItem={activeContentTab}
            />

            <Article>
                {(activeContentTab === LearnPageTabs.all ||
                    activeContentTab === LearnPageTabs.articles) && (
                    <StyledFilterBar
                        filters={filters}
                        filterValue={filterValue}
                        setFilterValue={setFilterValue}
                        setTextFilterQuery={updateTextFilterQuery}
                        textFilterQuery={textFilterQuery}
                    />
                )}

                {showTextFilterResults ? (
                    textFilterResults.length ? (
                        <CardList articles={textFilterResults} />
                    ) : (
                        <EmptyTextFilterResults />
                    )
                ) : (
                    <ActiveCardList />
                )}
            </Article>
        </Layout>
    );
};
