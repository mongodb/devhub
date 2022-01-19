import React, { useCallback, useMemo, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { withPrefix } from 'gatsby';
import Layout from '../components/dev-hub/layout';
import { H2 } from '../components/dev-hub/text';
import MediaBlock from '../components/dev-hub/media-block';
import Card from '../components/dev-hub/card';
import {
    NAV_DESKTOP_HEIGHT,
    NAV_MOBILE_HEIGHT,
} from '../components/dev-hub/consistent-nav';
import CardList from '../components/dev-hub/card-list';
import EmptyTextFilterResults from '../components/dev-hub/empty-text-filter-results';
import FilterBar from '../components/dev-hub/filter-bar';
import { screenSize, size } from '../components/dev-hub/theme';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import { buildQueryString, parseQueryString } from '../utils/query-string';
import { getFeaturedCardFields } from '../utils/get-featured-card-fields';
import { LearnPageTabs } from '../utils/learn-page-tabs';
import useTextFilter from '../hooks/use-text-filter';
import Tab from '../components/dev-hub/tab';
import PageHelmet from '~components/dev-hub/page-helmet';
import ActiveCardList from '../components/dev-hub/active-card-list';
import ActiveCardListFilter from '../components/dev-hub/active-card-list-filter';

const FEATURED_ARTICLE_MAX_WIDTH = '1200px';
const FEATURED_ARTICLE_CARD_WIDTH = '410px';

const Title = H2.withComponent('h1');

const PrimaryMediaBlock = styled(MediaBlock)`
    @media ${screenSize.upToMedium} {
        /*
        To prevent CLS on the anchor tag, we want to specify a 1:1 aspect
        ratio by way of vw - padding on either side
        */
        grid-template-rows: calc(100vw - ${size.medium} - ${size.medium}) auto;
    }
`;

const MainAnchor = styled('div')`
    display: block;
    position: relative;
    top: -${NAV_DESKTOP_HEIGHT};
    visibility: hidden;
    @media ${screenSize.upToMedium} {
        top: -${NAV_MOBILE_HEIGHT};
    }
`;

const MainFeatureGrid = styled('div')`
    @media ${screenSize.mediumAndUp} {
        display: grid;
        grid-template-areas:
            'primary secondary'
            'primary tertiary';
        grid-gap: ${size.medium};
        margin-top: ${size.large};
    }
    @media ${screenSize.largeAndUp} {
        grid-template-columns: auto ${FEATURED_ARTICLE_CARD_WIDTH};
    }
`;

const PrimarySection = styled('div')`
    grid-area: primary;
    @media ${screenSize.mediumAndUp} {
        border-right: 1px solid ${({ theme }) => theme.colorMap.greyDarkTwo};
        padding-right: ${size.medium};
    }
`;

const PrimaryImage = styled('img')`
    border-radius: ${size.small};
    height: 100%;
    width: 100%;
`;

const SecondArticle = styled(Card)`
    grid-area: secondary;
`;

const LastArticle = styled(Card)`
    grid-area: tertiary;
`;

const Header = styled('header')`
    background: ${({ theme }) => theme.colorMap.devBlack};
    margin-bottom: ${size.xlarge};
    padding: ${size.xlarge} ${size.medium};
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.large};
    }
`;

const HeaderContent = styled('div')`
    max-width: ${FEATURED_ARTICLE_MAX_WIDTH};
    margin-left: auto;
    margin-right: auto;
`;

const Article = styled('article')`
    padding: ${size.medium};
`;

const StyledFilterBar = styled(FilterBar)`
    margin: 0 ${size.large};
    padding-bottom: ${size.large};
`;

const TabBar = styled(Tab)`
    margin: 0 ${size.large};
`;

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
    const allowedKeys = ['content', 'page', 'text', 'products', 'languages'];
    const filterValues = Object.keys(filter).filter(key =>
        allowedKeys.includes(key)
    );
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
                    filterValuesForArticle.find(
                        ({ label }) => label === filterValueRequired
                    )
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

const SecondaryFeaturedArticle = ({ article, Wrapper }) => {
    try {
        const { description, slug, tags, title } = getFeaturedCardFields(
            article,
            'learn'
        );
        return (
            <Wrapper
                data-test="secondary-featured-article"
                collapseImage
                to={slug}
                title={title}
                description={description}
                tags={tags}
            />
        );
    } catch {
        return null;
    }
};

const FeaturedArticles = ({ articles }) => {
    if (articles.length < 3) {
        console.error(
            `Expected three articles for featured section, got ${
                articles && articles.length
            }`
        );
        return null;
    }

    const { description, image, slug, tags, title } = getFeaturedCardFields(
        articles[0],
        'learn'
    );
    return (
        <MainFeatureGrid data-test="featured-articles">
            <PrimarySection
                data-test="primary-featured-article"
                height="100%"
                width="100%"
            >
                <PrimaryMediaBlock
                    mediaComponent={
                        <PrimaryImage
                            height="100%"
                            width="100%"
                            src={image}
                            alt=""
                        />
                    }
                    mediaWidth="360px"
                >
                    <Card
                        collapseImage
                        to={slug}
                        title={title}
                        description={description}
                        tags={tags}
                    />
                </PrimaryMediaBlock>
            </PrimarySection>
            <SecondaryFeaturedArticle
                article={articles[1]}
                Wrapper={SecondArticle}
            />
            <SecondaryFeaturedArticle
                article={articles[2]}
                Wrapper={LastArticle}
            />
        </MainFeatureGrid>
    );
};

const LearnPage = ({
    location,
    navigate,
    pageContext: {
        allArticles,
        allPodcasts: podcasts,
        allVideos: videos,
        featuredArticles,
        filters,
    },
    path,
}) => {
    const { title } = useSiteMetadata();
    const [articles, setArticles] = useState(allArticles);
    const { search = '', pathname = '' } = location;
    const [filterValue, setFilterValue] = useState(parseQueryString(search));
    const [textFilterQuery, setTextFilterQuery] = useState(filterValue['text']);
    const [activeTab, setActiveTab] = useState(LearnPageTabs.all);

    const activeContentTab = useMemo(() => {
        const currentContentFilter = filterValue['content'];
        if (currentContentFilter) {
            return (
                LearnPageTabs[filterValue['content']] || filterValue['content']
            );
        }
        return LearnPageTabs.all;
    }, [filterValue]);

    const { results: textFilterResults } = useTextFilter(
        textFilterQuery,
        activeContentTab
    );
    const filterActiveArticles = useCallback(
        filter => filterArticles(filter, allArticles),
        [allArticles]
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
            filteredArticles.length && setArticles(filteredArticles);
            if (window.location.search !== searchParams) {
                // if the search params are empty, push the pathname state in order to remove params
                navigate(
                    searchParams === ''
                        ? pathname
                        : withPrefix(`/learn/${searchParams}`),
                    {
                        replace: true,
                    }
                );
            }
        },
        // Exclude "navigate" since it constantly changes
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [filterActiveArticles, pathname]
    );

    useEffect(() => {
        updateFilterQueryParams(filterValue);
    }, [filterValue, updateFilterQueryParams]);

    useEffect(() => {
        setActiveTab(activeContentTab);
    }, [activeContentTab]);

    // filterValue could be {} on a page load, or values can be "all" if toggled back
    const hasNoFilter = useMemo(() => {
        return (
            (!filterValue.languages || filterValue.languages === 'all') &&
            (!filterValue.products || filterValue.products === 'all')
        );
    }, [filterValue]);

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

    // If the user is on a tab not supporting the text filter, ignore the filter
    const showTextFilterResults = useMemo(() => {
        return textFilterQuery && textFilterResults;
    }, [activeContentTab, textFilterQuery, textFilterResults]);

    const leftTabs = [LearnPageTabs.all];
    const rightTabs = [
        LearnPageTabs.articles,
        LearnPageTabs.videos,
        LearnPageTabs.podcasts,
    ];

    const { page } = filterValue;
    const pageTitle = `Learn - ${page ? `Page ${page} - ` : ''}${title}`;

    return (
        <Layout>
            <PageHelmet pagePath={path} title={pageTitle} />
            <Header>
                <HeaderContent>
                    <Title>Make better, faster applications</Title>
                    <FeaturedArticles articles={featuredArticles} />
                </HeaderContent>
            </Header>

            {/* ID used specifically for anchor links */}
            <MainAnchor id="main" />

            <TabBar
                handleClick={updateActiveFilter}
                leftTabs={leftTabs}
                rightTabs={rightTabs}
                activeItem={activeContentTab}
            />

            <Article>
                <StyledFilterBar
                    filters={filters}
                    filterValue={filterValue}
                    setFilterValue={setFilterValue}
                    setTextFilterQuery={updateTextFilterQuery}
                    textFilterQuery={textFilterQuery}
                    activeContentTab={activeContentTab}
                />

                {showTextFilterResults ? (
                    textFilterResults.length ? (
                        <ActiveCardListFilter
                            activeContentTab={activeContentTab}
                            textFilterResults={textFilterResults}
                        />
                    ) : (
                        <EmptyTextFilterResults />
                    )
                ) : (
                    <ActiveCardList
                        activeContentTab={activeTab}
                        articles={articles}
                        videos={videos}
                        podcasts={podcasts}
                        hasNoFilter={hasNoFilter}
                    />
                )}
            </Article>
        </Layout>
    );
};

export default LearnPage;
