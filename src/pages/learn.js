import React, { useCallback, useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Layout from '../components/dev-hub/layout';
import { H2 } from '../components/dev-hub/text';
import MediaBlock from '../components/dev-hub/media-block';
import Card from '../components/dev-hub/card';
import CardList from '../components/dev-hub/card-list';
import FilterBar from '../components/dev-hub/filter-bar';
import { colorMap, screenSize, size } from '../components/dev-hub/theme';
import mockCardImage from '../images/360-mock-card.png';
import { authenticate, callStitchFunction } from '../utils/stitch';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import { mapTagTypeToUrl } from '../utils/map-tag-type-to-url';
import { buildQueryString, parseQueryString } from '../utils/query-string';
import { getTagLinksFromMeta } from '../utils/get-tag-links-from-meta';
import Loading from '../components/dev-hub/loading';

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

const callStitch = async (metadata, key, callback) => {
    const res = await callStitchFunction('fetchDevhubMetadata', metadata, key);
    callback(parseArticles(res));
};
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
export default ({ location }) => {
    const metadata = useSiteMetadata();
    const [articles, setArticles] = useState([]);
    const { search = '', pathname = '' } = location;
    const [filterValue, setFilterValue] = useState(parseQueryString(search));
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const filter = stripAllParam(filterValue);
        const searchParams = buildQueryString(filter);
        // if the search params are empty, push the pathname state in order to remove params
        window.history.replaceState(
            {},
            '',
            searchParams === '' ? pathname : searchParams
        );
        authenticate();
        const callback = articles => {
            setArticles(articles);
            setIsLoading(false);
        };
        callStitch(metadata, filter, callback);
    }, [metadata, filterValue, pathname]);
    const updateFilter = useCallback(filter => setFilterValue(filter), []);
    return (
        <Layout>
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
                {isLoading ? <Loading /> : <CardList items={articles} />}
            </Article>
        </Layout>
    );
};
