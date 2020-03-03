import React, { useCallback, useMemo, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';
import Layout from '../components/dev-hub/layout';
import { H2 } from '../components/dev-hub/text';
import MediaBlock from '../components/dev-hub/media-block';
import Card from '../components/dev-hub/card';
import CardList from '../components/dev-hub/card-list';
import FilterBar from '../components/dev-hub/filter-bar';
import { colorMap, screenSize, size } from '../components/dev-hub/theme';
import mockCardImage from '../images/360-mock-card.png';
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

export default ({ location, pageContext: { allArticles } }) => {
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
                <MainFeatureGrid>
                    <PrimarySection>
                        <MediaBlock
                            mediaComponent={<img src={mockCardImage} alt="" />}
                            mediaWidth={360}
                        >
                            <Card
                                maxDescriptionLines={4}
                                to="/article/active-active-application-architectures-with-mongodb"
                                title="Active-Active Application Architectures with MongoDB"
                                description="This post will begin by describing the database capabilities required by modern multi-data center applications."
                                tags={getTagLinksFromMeta({
                                    products: ['MongoDB'],
                                    tags: ['Technical'],
                                })}
                            />
                        </MediaBlock>
                    </PrimarySection>
                    <SecondArticle
                        to="/how-to/storing-large-objects-and-files-in-mongodb"
                        title="Storing Large Objects and Files in MongoDB"
                        description="Discover how to store large objects and files in MongoDB."
                        tags={getTagLinksFromMeta({
                            products: ['MongoDB'],
                            tags: ['Releases'],
                        })}
                    />

                    <LastArticle
                        to="how-to/working-with-mongodb-stitch-through-the-mongo-shell"
                        title="Working with MongoDB Stitch Through the mongo Shell – MongoDB Wire Protocol Support"
                        description="The Stitch SDK is the best way to access MongoDB Stitch from your frontend application code – getting to your data and accessing your Stitch Services and Functions becomes child's play."
                        tags={getTagLinksFromMeta({
                            tags: ['Cloud', 'Stitch'],
                            products: ['Stitch', 'Atlas'],
                            languages: ['javascript'],
                        })}
                    />
                </MainFeatureGrid>
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
