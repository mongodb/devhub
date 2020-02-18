import React from 'react';
import styled from '@emotion/styled';
import Layout from '../components/dev-hub/layout';
import { H2, H3, H4, P } from '../components/dev-hub/text';
import MediaBlock from '../components/dev-hub/media-block';
import Card from '../components/dev-hub/card';
import Select from '../components/dev-hub/select';
import { screenSize, size } from '../components/dev-hub/theme';
import mockCardImage from '../images/360-mock-card.png';
import mockCardImageSmall from '../images/260-mock-card.png';

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
                            name="a"
                            choices={[
                                ['A', 'Choice A'],
                                ['B', 'Choice B'],
                                ['C', 'Choice C'],
                            ]}
                            defaultText="Choose an option..."
                        ></Select>
                        <Select
                            narrow
                            name="b"
                            choices={[
                                ['A', 'Choice A'],
                                ['B', 'Choice B'],
                                ['C', 'Choice C'],
                            ]}
                            defaultText="Choose an option..."
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
