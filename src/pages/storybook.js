import React, { useState } from 'react';
import styled from '@emotion/styled';
import Badge from '../components/dev-hub/badge';
import { StorybookLayout } from '../components/dev-hub/layout';
import Card from '../components/dev-hub/card';
import CodeBlock from '../components/dev-hub/codeblock';
import Link from '../components/dev-hub/link';
import Image from '../components/Image';
import Input from '../components/dev-hub/input';
import MediaBlock from '../components/dev-hub/media-block';
import Notification from '../components/dev-hub/notification';
import Select from '../components/dev-hub/select';
import { H1, H2, H3, H4, P } from '../components/dev-hub/text';
import { colorMap, size, screenSize } from '../components/dev-hub/theme';
import Button from '../components/dev-hub/button';
import ShareIcon from '../components/dev-hub/share-icon';
import FacebookIcon from '../components/dev-hub/facebook-icon';
import TwitterIcon from '../components/dev-hub/twitter-icon';
import EnvelopeIcon from '../components/dev-hub/envelope-icon';

const cardProps = {
    gradient: false,
    image: '/images/compass-create-database.png',
    tags: ['Article'],
};

const gradientCardProps = {
    ...cardProps,
    gradient: true,
};

const Row = styled('div')`
    color: ${colorMap.devBlack};
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 16px 0;
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

const InputStory = ({ narrow }) => {
    const [value, setValue] = useState('');
    const onChange = e => {
        const { value } = e.target;
        setValue(value);
    };
    return (
        <Input
            narrow={narrow}
            value={value}
            placeholder="Email Address"
            onChange={onChange}
        />
    );
};
const SelectStory = ({ narrow }) => {
    const [value, setValue] = useState('');
    const handleValueChange = v => {
        setValue(v);
    };
    return (
        <Select
            name="test-select"
            narrow={narrow}
            choices={[
                ['A', 'Choice A'],
                ['B', 'Choice B'],
                ['C', 'Choice C'],
            ]}
            defaultText="Choose an option..."
            value={value}
            onChange={handleValueChange}
        />
    );
};

export default () => (
    <StorybookLayout>
        <StorybookContainer>
            <H1>DevHub Component "Storybook"</H1>
            <SectionHeader>Text</SectionHeader>
            <H1>Heading 1</H1>
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
            <SectionHeader>Buttons</SectionHeader>
            <Row>
                <Button href="#" primary>
                    Join the Community (Primary)
                </Button>
                <Button secondary>Join the Community (Secondary)</Button>
                <Button tertiary>Join the Community (tertiary)</Button>
                <Button play />
            </Row>
            <SectionHeader>Notification</SectionHeader>
            <Notification />
            <SectionHeader>Code Block</SectionHeader>
            <CodeBlock>{['Example code, without a new line']}</CodeBlock>
            <CodeBlock>{['Example code\n', 'With multiple lines\n']}</CodeBlock>
            <CodeBlock>
                {[
                    'Lets try out a really really really long block of text this should overflow ',
                    'Lets try out a really really really long block of text this should overflow',
                ]}
            </CodeBlock>
            <SectionHeader>Links</SectionHeader>
            <Link href="#">Hello World</Link>
            <Link href="#" tertiary>
                Hello World
            </Link>
            <SectionHeader>Media Block</SectionHeader>
            <MediaBlockStory />
            <SectionHeader>Media Block (reverse)</SectionHeader>
            <MediaBlockStory reverse />
            <SectionHeader>Form Elements</SectionHeader>
            <H4>Input</H4>
            <InputStory />
            <br />
            <H4>Input (Narrow)</H4>
            <InputStory narrow />
            <H4>Select</H4>
            <SelectStory />
            <br />
            <H4>Select (Narrow)</H4>
            <SelectStory narrow />
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
            <SectionHeader>Cards</SectionHeader>
            <Row>
                <Card distinct {...cardProps}>
                    <H4>I'm a Card For A Post on the New Devhub Platform!</H4>
                </Card>
                <Card {...gradientCardProps}>
                    <H4>I'm a Gradient Card</H4>
                </Card>
                <Card {...gradientCardProps} highlight>
                    <H4>I'm a Gradient Card</H4>
                </Card>
            </Row>
            <Row>
                <Card distinct width="300px">
                    <H4 bold>
                        Install MongoDB Community Edition on Red Hat or CentOS
                        in minutes
                    </H4>
                    <P>
                        Use this tutorial to install community edition on any
                        and every operating system known to man, woman, and
                        child.
                    </P>
                </Card>
                <Card width="300px">
                    <H4 bold>
                        Install MongoDB Community Edition on Red Hat or CentOS
                        in minutes
                    </H4>
                    <P>
                        Use this tutorial to install community edition on any
                        and every operating system known to man, woman, and
                        child.
                    </P>
                </Card>
                <Card highlight width="300px">
                    <H4 bold>I'm a Card With No Image</H4>
                    <P bold>written by Author </P>
                    <P>preview preview preview</P>
                </Card>
            </Row>
            <SectionHeader>Icons</SectionHeader>
            <Row>
                <ShareIcon color={colorMap.teal} />
                <FacebookIcon color={colorMap.salmon} />
                <TwitterIcon color={colorMap.violet} />
                <EnvelopeIcon color={colorMap.magenta} />
            </Row>
        </StorybookContainer>
    </StorybookLayout>
);
