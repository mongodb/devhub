import React from 'react';
import styled from '@emotion/styled';
import Layout from '../components/dev-hub/layout';
import { H2, H3 } from '../components/dev-hub/text';
import MediaBlock from '../components/dev-hub/media-block';
import Card from '../components/dev-hub/card';
import Select from '../components/dev-hub/select';
import { colorMap, screenSize, size } from '../components/dev-hub/theme';
import mockCardImage from '../images/360-mock-card.png';
import mockCardImageSmall from '../images/260-mock-card.png';

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
