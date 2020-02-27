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

export default ({ location }) => {
    const metadata = useSiteMetadata();
    const [articles, setArticles] = useState([]);
    const { search = {} } = location;
    const [filterValue, setFilterValue] = useState(parseQueryString(search));
    useEffect(() => {
        window.history.pushState({}, '', buildQueryString(filterValue));
        authenticate();
        callStitch(metadata, filterValue, setArticles);
    }, [metadata, filterValue]);
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
                                to="/#"
                                title="Building Modern Applications with Next.js and
                            MongoDB"
                                description="Developers have more choices than ever before when
                            it comes to choosing the technology stack for their
                            next application. Developer productivity is one of
                            the most important factors in choosing a modern
                            stack and I believe that Next.js coupled with
                            MongoDB can get you up and running on the next great
                            application in no time at all. Let’s find out how
                            and why!"
                                tags={mapTagTypeToUrl(['nodejs'], 'language')}
                            />
                        </MediaBlock>
                    </PrimarySection>
                    <SecondArticle
                        title="Quick Start - Node.js"
                        description=" Master all the CRUD operations in Node.js with
                            MongoDB"
                        tags={mapTagTypeToUrl(['nodejs'], 'language')}
                    />

                    <LastArticle
                        title="Visualising the Coronavirus"
                        description="See the spread of the Coronavirus in MongoDB
                            Charts"
                        tags={mapTagTypeToUrl(['charts'], 'product')}
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
