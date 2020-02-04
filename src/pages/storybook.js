import React from 'react';
import styled from '@emotion/styled';
import Badge from '../components/dev-hub/badge';
import { StorybookLayout } from '../components/dev-hub/layout';
import Card from '../components/dev-hub/card';
import Link from '../components/dev-hub/link';
import Image from '../components/Image';
import MediaBlock from '../components/dev-hub/media-block';
import { H1, H2, H3, H4, P } from '../components/dev-hub/text';
import { colorMap, size, screenSize } from '../components/dev-hub/theme';

const cardProps = {
    gradient: false,
    image: '/images/compass-create-database.png',
    title: "I'm a Card That can Represent a Post on the New Devhub Platform!",
    tag: 'Article',
};

const gradientCardProps = {
    ...cardProps,
    gradient: true,
    title: "I'm a Card With A Gradient",
};


const CardRow = styled('div')`
    background: rgb(27, 39, 46);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    @media ${screenSize.upToMedium} {
        flex-direction: column;
    }
`;

const StorybookContainer = styled('div')`
    padding: ${size.default};
`;

const Swatch = styled('div')`
    background-color: ${props => props.colorValue};
    font-weight: bold;
    padding: ${size.small};
    margin: ${size.tiny};
`;

const SectionHeader = styled(H2)`
    text-decoration: underline;
`;

const FirstClusterTestImage = () => (
    <Image
        nodeData={{
            argument: [
                {
                    value: '/images/firstcluster.png',
                },
            ],
        }}
    />
);

const MediaBlockContent = styled('div')`
    display: flex;
    height: 100%;
    padding: 16px;
    align-items: center;
`;

const MediaBlockStory = ({ reverse }) => (
    <MediaBlock
        mediaComponent={<FirstClusterTestImage />}
        mediaWidth={786}
        reverse={reverse}
    >
        <MediaBlockContent>
            <div>
                <H2>Let's do it live!</H2>
                <P>
                    Connect with MongoDB engineers and community experts weekly
                    for live coding demos on Twitch. Ask questions, chat, or
                    just follow along.
                </P>
                <button>Join us on Twitch</button>
            </div>
        </MediaBlockContent>
    </MediaBlock>
);

export default () => (
    <StorybookLayout>
        <StorybookContainer>
            <H1>DevHub Component "Storybook"</H1>
            <SectionHeader>Text</SectionHeader>
            <H1 collapse>Heading 1</H1>
            <H2>Heading 2</H2>
            <H3>Heading 3</H3>
            <H4>Heading 4</H4>
            <P>Paragraph</P>
            <SectionHeader>Content Label</SectionHeader>
            <Badge>How-To</Badge>
            <Badge>Quick Start</Badge>
            <Badge>Article</Badge>
            <Badge>Event</Badge>
            <Badge>Community</Badge>
            <Badge>Deep Dive</Badge>
            <SectionHeader>Links</SectionHeader>
            <Link primary>Hello World</Link>
            <SectionHeader>Media Block</SectionHeader>
            <MediaBlockStory />
            <SectionHeader>Media Block (reverse)</SectionHeader>
            <MediaBlockStory reverse />
            <SectionHeader>Colors</SectionHeader>
            {Object.keys(colorMap).map(colorName => (
                <Swatch
                    key={colorName}
                    colorName={colorName}
                    colorValue={colorMap[colorName]}
                >
                    <P collapse>
                        {colorMap[colorName]} - {colorName}
                    </P>
                </Swatch>
            ))}
            <CardRow>
                <Card {...cardProps} />
                <Card {...gradientCardProps} />
            </CardRow>
        </StorybookContainer>
    </StorybookLayout>
);
