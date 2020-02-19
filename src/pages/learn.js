import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Layout from '../components/dev-hub/layout';
import { H2, H3 } from '../components/dev-hub/text';
import MediaBlock from '../components/dev-hub/media-block';
import Card from '../components/dev-hub/card';
import Select from '../components/dev-hub/select';
import { colorMap, screenSize, size } from '../components/dev-hub/theme';
import mockCardImage from '../images/360-mock-card.png';
import mockCardImageSmall from '../images/260-mock-card.png';
// import { callStitchFunction } from '../utils/stitch';
// import { useSiteMetadata } from '../hooks/use-site-metadata';
import { devhubMapping } from '../constants';

// Zip array of objects into array of 2-element arrays to populate Select forms
// Replace key with label text, if defined (e.g. nodejs => Node.js)
const zipObjects = arr =>
    arr.map(({ _id, count }) => {
        const label = devhubMapping[_id] || _id;
        return [_id, `${label} (${count})`];
    });

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
    padding: ${size.xlarge} 2%;
`;

const ResponsiveFlexContainer = styled('div')`
    display: flex;
    justify-content: space-between;
    @media ${screenSize.upToMedium} {
        display: block;
    }
`;
export default ({ ...data }) => {
    console.log(data);
    // const metadata = useSiteMetadata();
    const [languages] = useState([]);
    const [products] = useState([]);

    // useEffect(() => {
    //     if (languages.length === 0) {
    //         callStitch('languages', setLanguages);
    //     }

    //     if (products.length === 0) {
    //         callStitch('products', setProducts);
    //     }
    // }, [callStitch, languages.length, products.length]);

    // Populate forms by fetching all values associated with given key
    // Returns array of {_id: 'Name', count: X} objects in descending count order
    // These objects are then zipped into an array of arrays
    // const callStitch = async (key, callback) => {
    //     const res = await callStitchFunction('getValuesByKey', metadata, [key]);
    //     callback(zipObjects(res));
    // };

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
                                tags={['nodejs']}
                            />
                        </MediaBlock>
                    </PrimarySection>
                    <SecondArticle
                        title="Quick Start - Node.js"
                        description=" Master all the CRUD operations in Node.js with
                            MongoDB"
                        tags={['nodejs']}
                    />

                    <LastArticle
                        title="Visualising the Coronavirus"
                        description="See the spread of the Coronavirus in MongoDB
                            Charts"
                        tags={['charts']}
                    />
                </MainFeatureGrid>
            </Header>
            <article>
                <ResponsiveFlexContainer>
                    <H3>All Articles</H3>
                    <ResponsiveFlexContainer>
                        <span>Filter By</span>
                        <Select
                            narrow
                            name="product"
                            choices={products}
                            defaultText="Product"
                        ></Select>
                        <Select
                            narrow
                            name="language"
                            choices={languages}
                            defaultText="Language"
                        ></Select>
                    </ResponsiveFlexContainer>
                </ResponsiveFlexContainer>
                <ResponsiveFlexContainer>
                    <Card image={mockCardImageSmall}>
                        Never miss us live. Sign up for the MongoDB Twitch
                        stream today.
                    </Card>
                    <Card image={mockCardImage}>
                        Never miss us live. Sign up for the MongoDB Twitch
                        stream today.
                    </Card>
                    <Card image={mockCardImageSmall}>
                        Never miss us live. Sign up for the MongoDB Twitch
                        stream today.
                    </Card>
                    <Card image={mockCardImage}>
                        Never miss us live. Sign up for the MongoDB Twitch
                        stream today.
                    </Card>
                </ResponsiveFlexContainer>
            </article>
        </Layout>
    );
};
