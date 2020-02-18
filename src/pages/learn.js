import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Layout from '../components/dev-hub/layout';
import { H2, H3, H4, P } from '../components/dev-hub/text';
import MediaBlock from '../components/dev-hub/media-block';
import Card from '../components/dev-hub/card';
import Select from '../components/dev-hub/select';
import { screenSize, size } from '../components/dev-hub/theme';
import mockCardImage from '../images/360-mock-card.png';
import mockCardImageSmall from '../images/260-mock-card.png';
import { callStitchFunction } from '../utils/stitch';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import { devhubMapping } from '../constants';

// Zip array of objects into array of 2-element arrays to populate Select forms
// Replace key with label text, if defined (e.g. nodejs => Node.js)
const zipObjects = arr =>
    arr.map(({ _id, count }) => {
        const label = devhubMapping[_id] || _id;
        return [_id, `${label} (${count})`];
    });

const SecondarySection = styled('div')`
    @media ${screenSize.mediumAndUp} {
        border-left: 1px solid #fff;
        margin-left: ${size.medium};
        padding-left: ${size.medium};
        > div {
            height: 50%;
        }
    }
`;

const Header = styled('header')`
    margin: 0 auto;
    padding: ${size.medium};
    width: 90%;
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
    const metadata = useSiteMetadata();
    const [languages, setLanguages] = useState([]);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (languages.length === 0) {
            callStitch('languages', setLanguages);
        }

        if (products.length === 0) {
            callStitch('products', setProducts);
        }
    }, [callStitch, languages.length, products.length]);

    // Populate forms by fetching all values associated with given key
    // Returns array of {_id: 'Name', count: X} objects in descending count order
    // These objects are then zipped into an array of arrays
    const callStitch = async (key, callback) => {
        const res = await callStitchFunction('getValuesByKey', metadata, [key]);
        callback(zipObjects(res));
    };

    return (
        <Layout>
            <Header>
                <H2>Learn How to Build Your Next Application</H2>
                <ResponsiveFlexContainer>
                    <MediaBlock
                        mediaComponent={<img src={mockCardImage} alt="" />}
                        mediaWidth={360}
                    >
                        <H4>Live Coding on Our Twitch Channel</H4>
                        <P>
                            Every Friday at 11.00am EST come watch our
                            developers live coding on the MongoDB Platform.
                        </P>
                    </MediaBlock>
                    <SecondarySection>
                        <Card>
                            Never miss us live. Sign up for the MongoDB Twitch
                            stream today.
                        </Card>
                        <Card>
                            Never miss us live. Sign up for the MongoDB Twitch
                            stream today.
                        </Card>
                    </SecondarySection>
                </ResponsiveFlexContainer>
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
