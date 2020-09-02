import React, { useCallback, useMemo, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';
import Layout from '../components/dev-hub/layout';
import { H2 } from '../components/dev-hub/text';
import MediaBlock from '../components/dev-hub/media-block';
import Card from '../components/dev-hub/card';
import CardList from '../components/dev-hub/card-list';
import EmptyTextFilterResults from '../components/dev-hub/empty-text-filter-results';
import FilterBar from '../components/dev-hub/filter-bar';
import { screenSize, size } from '../components/dev-hub/theme';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import { buildQueryString, parseQueryString } from '../utils/query-string';
import { getFeaturedCardFields } from '../utils/get-featured-card-fields';
import { getTagLinksFromMeta } from '../utils/get-tag-links-from-meta';
import useAllVideos from '../hooks/use-all-videos';
import usePodcasts from '../hooks/use-podcasts';
import useTextFilter from '../hooks/use-text-filter';
import Tab from '../components/dev-hub/tab';

const FEATURED_ARTICLE_MAX_WIDTH = '1200px';
const FEATURED_ARTICLE_CARD_WIDTH = '410px';

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

const SecondaryFeaturedArticle = ({ article, Wrapper }) => {
    try {
        const { description, slug, tags, title } = getFeaturedCardFields(
            article
        );
        return (
            <Wrapper
                collapseImage
                to={slug}
                title={title}
                description={description}
                tags={getTagLinksFromMeta(tags)}
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
        articles[0]
    );
    return (
        <MainFeatureGrid>
            <PrimarySection>
                <MediaBlock
                    mediaComponent={<PrimaryImage src={image} alt="" />}
                    mediaWidth={360}
                >
                    <Card
                        collapseImage
                        maxDescriptionLines={4}
                        to={slug}
                        title={title}
                        description={description}
                        tags={getTagLinksFromMeta(tags)}
                    />
                </MediaBlock>
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

export default ({
    location,
    pageContext: {
        allArticles,
        allPodcasts,
        allVideos,
        featuredArticles,
        filters,
    },
}) => {
    const metadata = useSiteMetadata();
    const initialArticles = useMemo(() => parseArticles(allArticles), [
        allArticles,
    ]);
    const [articles, setArticles] = useState(initialArticles);
    const [textFilterQuery, setTextFilterQuery] = useState(null);
    const { results: textFilterResults } = useTextFilter(textFilterQuery);
    const { search = '', pathname = '' } = location;
    const [filterValue, setFilterValue] = useState(parseQueryString(search));
    const filterActiveArticles = useCallback(
        filter => filterArticles(filter, initialArticles),
        [initialArticles]
    );
    useEffect(() => {
        const filter = stripAllParam(filterValue);
        const searchParams = buildQueryString(filter);
        // if the search params are empty, push the pathname state in order to remove params
        window.history.replaceState(
            {},
            '',
            searchParams === '' ? pathname : searchParams
        );
        const filteredArticles = filterActiveArticles(filter);
        setArticles(filteredArticles);
    }, [metadata, filterValue, pathname, filterActiveArticles]);
    const updateFilter = useCallback(filter => setFilterValue(filter), []);
    // filterValue could be {} on a page load, or values can be "all" if toggled back
    const hasNoFilter = useMemo(
        () =>
            (!filterValue.languages || filterValue.languages === 'all') &&
            (!filterValue.products || filterValue.products === 'all'),
        [filterValue]
    );

    const { videos } = useAllVideos(allVideos);

    const { podcasts } = usePodcasts(allPodcasts);

    const [activeItem, setActiveItem] = useState('All');

    // If the user is on a tab not supporting the text filter, ignore the filter
    const showTextFilterResults = useMemo(
        () =>
            (activeItem === 'All' || activeItem === 'Articles') &&
            textFilterQuery &&
            textFilterResults,
        [activeItem, textFilterQuery, textFilterResults]
    );

    const leftTabs = ['All'];
    const rightTabs = ['Articles', 'Videos', 'Podcasts'];

    const ActiveCardList = () => {
        switch (activeItem) {
            case 'Articles':
                return <CardList articles={articles} />;
            case 'Videos':
                return <CardList videos={videos} />;
            case 'Podcasts':
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
            <Header>
                <HeaderContent>
                    <H2>Make better, faster applications</H2>
                    <FeaturedArticles articles={featuredArticles} />
                </HeaderContent>
            </Header>

            <TabBar
                handleClick={setActiveItem}
                leftTabs={leftTabs}
                rightTabs={rightTabs}
                activeItem={activeItem}
            />

            <Article>
                {(activeItem === 'All' || activeItem === 'Articles') && (
                    <StyledFilterBar
                        filters={filters}
                        filterValue={filterValue}
                        setFilterValue={updateFilter}
                        setTextFilterQuery={setTextFilterQuery}
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
