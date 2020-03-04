import React, { useCallback, useMemo, useEffect, useState } from 'react';
import dlv from 'dlv';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';
import { withPrefix } from 'gatsby';
import Layout from '../components/dev-hub/layout';
import { H2 } from '../components/dev-hub/text';
import MediaBlock from '../components/dev-hub/media-block';
import Card from '../components/dev-hub/card';
import CardList from '../components/dev-hub/card-list';
import FilterBar from '../components/dev-hub/filter-bar';
import { colorMap, screenSize, size } from '../components/dev-hub/theme';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import { buildQueryString, parseQueryString } from '../utils/query-string';
import { getTagLinksFromMeta } from '../utils/get-tag-links-from-meta';

const MainFeatureGrid = styled('div')`
    @media ${screenSize.mediumAndUp} {
        display: grid;
        grid-template-areas:
            'primary secondary'
            'primary tertiary';
        grid-gap: ${size.medium};
        margin-top: ${size.large};
    }
`;

const PrimarySection = styled('div')`
    border-right: 1px solid ${colorMap.greyDarkTwo};
    grid-area: primary;
    padding-right: ${size.medium};
`;

const SecondArticle = styled(Card)`
    grid-area: secondary;
`;

const LastArticle = styled(Card)`
    grid-area: tertiary;
`;

const Header = styled('header')`
    background: ${colorMap.devBlack};
    margin-bottom: ${size.xlarge};
    padding: ${size.xlarge} ${size.medium};
`;

const Article = styled('article')`
    padding: ${size.medium};
`;

const FEATURED_ARTICLE_URLS = [
    '/quickstart/java-setup-crud-operations',
    '/how-to/golang-alexa-skills',
    '/how-to/polymorphic-pattern',
];

const useFeaturedArticles = articles => {
    const [primary, setPrimary] = useState(articles[0] || null);
    const [secondary, setSecondary] = useState(articles[1] || null);
    const [tertiary, setTertiary] = useState(articles[2] || null);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (articles.length < 3) {
            setError(
                `Expected three articles for featured section, got ${articles &&
                    articles.length}`
            );
        } else {
            articles.map(article => {
                if (article.query_fields.slug === FEATURED_ARTICLE_URLS[0]) {
                    setPrimary(article);
                } else if (
                    article.query_fields.slug === FEATURED_ARTICLE_URLS[1]
                ) {
                    setSecondary(article);
                } else if (
                    article.query_fields.slug === FEATURED_ARTICLE_URLS[2]
                ) {
                    setTertiary(article);
                }
            });
        }
    }, [articles, setPrimary, setSecondary, setTertiary, setError]);

    return { primary, secondary, tertiary, error };
};

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

const getFeaturedCardFields = article => {
    if (!article) {
        return {
            image: null,
            slug: null,
            title: null,
            description: null,
            tags: null,
        };
    }
    const query_fields = article.query_fields;
    const image = withPrefix(query_fields['atf-image']);
    const slug = query_fields.slug;
    const title = dlv(query_fields, ['title', 0, 'value']);
    const description = dlv(query_fields, [
        'meta-description',
        0,
        'children',
        0,
        'value',
    ]);
    const tags = {
        products: query_fields.products,
        tags: query_fields.tags,
        languages: query_fields.languages,
    };
    return { image, slug, title, description, tags };
};

const SecondaryFeaturedArticle = ({ article, Wrapper }) => {
    try {
        const { description, slug, tags, title } = getFeaturedCardFields(
            article
        );
        return (
            <Wrapper
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
    const { error, primary, secondary, tertiary } = useFeaturedArticles(
        articles
    );
    if (error) {
        console.error(error);
        return null;
    }

    const { description, image, slug, tags, title } = getFeaturedCardFields(
        primary
    );
    return (
        <MainFeatureGrid>
            <PrimarySection>
                <MediaBlock
                    mediaComponent={<img src={withPrefix(image)} alt="" />}
                    mediaWidth={360}
                >
                    <Card
                        maxDescriptionLines={4}
                        to={slug}
                        title={title}
                        description={description}
                        tags={getTagLinksFromMeta(tags)}
                    />
                </MediaBlock>
            </PrimarySection>
            <SecondaryFeaturedArticle
                article={secondary}
                Wrapper={SecondArticle}
            />
            <SecondaryFeaturedArticle
                article={tertiary}
                Wrapper={LastArticle}
            />
        </MainFeatureGrid>
    );
};

export default ({
    location,
    pageContext: { allArticles, featuredArticles },
}) => {
    const metadata = useSiteMetadata();
    const initialArticles = useMemo(() => parseArticles(allArticles), [
        allArticles,
    ]);
    const [articles, setArticles] = useState(initialArticles);
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
    return (
        <Layout>
            <Helmet>
                <title>Learn - {metadata.title}</title>
            </Helmet>
            <Header>
                <H2>Make better, faster applications</H2>
                <FeaturedArticles articles={featuredArticles} />
            </Header>
            <Article>
                <FilterBar
                    filterValue={filterValue}
                    setFilterValue={updateFilter}
                />
                <CardList items={articles} />
            </Article>
        </Layout>
    );
};
