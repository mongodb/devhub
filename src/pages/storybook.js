import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Badge from '../components/dev-hub/badge';
import Breadcrumb from '../components/dev-hub/breadcrumb';
import Blockquote from '../components/dev-hub/blockquote';
import BlogTagList from '../components/dev-hub/blog-tag-list';
import { StorybookLayout } from '../components/dev-hub/layout';
import BylineBlock from '../components/dev-hub/byline-block';
import Card from '../components/dev-hub/card';
import CodeBlock from '../components/dev-hub/codeblock';
import Event from '../components/dev-hub/events';
import { sampleEvents } from '../hooks/use-event-data';
import Link from '../components/dev-hub/link';
import Image from '../components/Image';
import Input from '../components/dev-hub/input';
import TextArea from '../components/dev-hub/text-area';
import HeroBanner from '../components/dev-hub/hero-banner';
import MediaBlock from '../components/dev-hub/media-block';
import Modal from '../components/dev-hub/modal';
import Notification from '../components/dev-hub/notification';
import Select from '../components/dev-hub/select';
import {
    H1,
    H2,
    H3,
    H4,
    P,
    P2,
    P3,
    P4,
    P5,
    SubHeader,
} from '../components/dev-hub/text';
import {
    colorMap,
    size,
    screenSize,
    gradientMap,
} from '../components/dev-hub/theme';
import Series from '../components/dev-hub/series';
import Button from '../components/dev-hub/button';
import ShareIcon from '../components/dev-hub/icons/share-icon';
import FacebookIcon from '../components/dev-hub/icons/facebook-icon';
import ListIcon from '../components/dev-hub/icons/list-icon';
import LinkIcon from '../components/dev-hub/icons/link-icon';
import LocationIcon from '../components/dev-hub/icons/location-icon';
import TwitterIcon from '../components/dev-hub/icons/twitter-icon';
import EnvelopeIcon from '../components/dev-hub/icons/envelope-icon';
import Tooltip from '../components/dev-hub/tooltip';
import ContentsMenu from '../components/dev-hub/contents-menu';
import ShareMenu from '../components/dev-hub/share-menu';
import LinkedInIcon from '../components/dev-hub/icons/linkedin';
import Github from '../components/dev-hub/icons/github';
import Youtube from '../components/dev-hub/icons/youtube';
import Twitch from '../components/dev-hub/icons/twitch';
import mockCardImage from '../images/360-mock-img.png';
import MockAuthorImage from '../images/1x/MDB-and-Node.js.png';
import VideoEmbed from '../components/dev-hub/video-embed';
import GradientUnderline from '../components/dev-hub/gradient-underline';
import Folder from '../components/dev-hub/icons/folder';
import UploadButton from '../components/dev-hub/upload-button';
import FeatureBlock from '../components/dev-hub/feature-block';
import EventsList from '../components/dev-hub/event-list';
import { mapTagTypeToUrl } from '../utils/map-tag-type-to-url';

const Row = styled('div')`
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

const TableOfContentsStory = () => {
    // TODO: Still not sure what the data-model will look like
    // For now using this simple structure to get base functionality
    const contents = [
        { title: 'Getting Set Up', to: '/storybook#intro' },
        { title: 'Created Data', to: '/storybook#create-data' },
        { title: 'The Final Code', to: '/storybook#final-code' },
        { title: 'Wrapping Up', to: '/storybook#conclusion' },
        { title: 'End', to: '/storybook#end' },
    ];

    return (
        <>
            <ShareMenu facebook="#" shareLink="#" twitter="#" />
            <ContentsMenu title="Table of Contents" contents={contents} />
        </>
    );
};
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
const SeriesStory = () => {
    const series = [
        { title: 'Step 1', slug: '#' },
        { title: 'Step 2', slug: '#' },
        { title: 'Step 3', slug: '#' },
    ];
    return (
        <Series name="Storybook Series" currentStep="Step 2">
            {series}
        </Series>
    );
};
const BreadcrumbStory = () => {
    const breadcrumbs = [
        { label: 'Home', to: '#' },
        { label: 'Community', to: '#' },
        { label: 'Events', to: '#' },
        { label: 'Webinar', to: '#' },
    ];
    return <Breadcrumb>{breadcrumbs}</Breadcrumb>;
};
const BlockQuoteStory = () => (
    <Blockquote
        nodeData={{
            children: [
                {
                    name: 'text',
                    type: 'text',
                    value:
                        "If you didn't set up your free cluster on MongoDB Atlas, now is a great time to do so. You have all the instructions in this blog post.",
                },
            ],
        }}
    ></Blockquote>
);

const shortCodeSample = `
function greeting(entity) {
  return \`Hello, \${entity}!\`;
}

genericFunction(greeting('World'));`;

const codeSample = `
function greeting(entity) {
  return \`Hello, \${entity}!\`;
}

genericFunction(greeting('World'));genericFunction(greeting('World'));
function greeting(entity) {
  return \`Hello, \${entity}!\`;
}

genericFunction(greeting('World'));
function greeting(entity) {
  return \`Hello, \${entity}!\`;
}

genericFunction(greeting('World'));

`;

const cSharpCodeSample = `
using System;
using System.Collections.Generic;

namespace CSharpTutorials
{
    class Program
    {
        static void Main(string[] args)
        {
            string message = "Hello World!!";
            // collections can't be created inside a transaction so create it first await database.CreateCollectionAsync("products");
            Console.WriteLine(message);
        }
    }
}
`;

const BlogTagListStory = ({ short }) => {
    const blogTags = short
        ? [
              { label: 'Kerberos', to: '#' },
              { label: 'Golang', to: '#' },
          ]
        : [
              { label: 'Kerberos', to: '#' },
              { label: 'Golang', to: '#' },
              { label: 'Python', to: '#' },
              { label: 'Another Tag', to: '#' },
          ];
    return <BlogTagList tags={blogTags} />;
};

const CodeArticle = styled('div')`
    display: flex;
    justify-content: space-between;
    width: 100%;
`;
const ModalContainer = styled('div')`
    padding: ${size.default};
`;
const UploadButtonStory = () => {
    const [file, setFile] = useState(null);
    return (
        <UploadButton
            label="Attach walkthrough (mov., .zip, etc)"
            name="walkthrough"
            onChange={e => setFile(e.target.files[0])}
            file={file}
        />
    );
};
export default () => (
    <StorybookLayout>
        <StorybookContainer>
            <HeroBanner
                background={MockAuthorImage}
                breadcrumb={[
                    { label: 'Home', to: '#' },
                    { label: 'Storybook', to: '#' },
                ]}
            >
                <H1>DevHub Component "Storybook"</H1>
                <BylineBlock
                    authorName="UP Team"
                    authorImage={MockAuthorImage}
                />
            </HeroBanner>
            <SectionHeader>Text</SectionHeader>
            <H1>Heading 1</H1>
            <H2>Heading 2</H2>
            <H3>Heading 3</H3>
            <H4>Heading 4</H4>
            <P>Paragraph 1</P>
            <P2>Paragraph 2</P2>
            <P3>Paragraph 3</P3>
            <P4>Paragraph 4</P4>
            <P5>Paragraph 1</P5>

            <SubHeader>SubHeader</SubHeader>
            <SectionHeader>Block Quote</SectionHeader>
            <BlockQuoteStory />
            <SectionHeader>Content Label</SectionHeader>
            <Badge>How-To</Badge>
            <Badge>Quick Start</Badge>
            <Badge>Article</Badge>
            <Badge>Event</Badge>
            <Badge>Community</Badge>
            <Badge>Deep Dive</Badge>
            <SectionHeader>Blog Tags</SectionHeader>
            <H4>Short List</H4>
            <BlogTagListStory short />
            <H4>Expandable List</H4>
            <BlogTagListStory />
            <SectionHeader>Embedded Video</SectionHeader>
            <H4>YouTube</H4>
            <VideoEmbed
                nodeData={{
                    argument: [{ value: 'Yx7OCVfeXlY' }],
                    name: 'youtube',
                }}
            />
            <H4>Twitch</H4>
            <VideoEmbed
                nodeData={{
                    argument: [{ value: '548256262' }],
                    name: 'twitch',
                }}
            />
            <SectionHeader>Modal</SectionHeader>
            <Modal triggerComponent={<Button play />}>
                <ModalContainer>
                    <MediaBlockStory />
                    <H4>Input</H4>
                    <InputStory />
                    <br />
                    <H4>Input (Narrow)</H4>
                    <InputStory narrow />
                    <br />
                    <H4>TextArea</H4>
                    <TextArea placeholder="Email Address" />
                    <br />
                    <H4>Select</H4>
                    <SelectStory />
                    <br />
                    <H4>Select (Narrow)</H4>
                    <SelectStory narrow />
                    <UploadButtonStory />
                </ModalContainer>
            </Modal>
            <br />
            <Modal
                dialogContainerStyle={{
                    height: '90%',
                    width: '90%',
                }}
                transparent
                triggerComponent={<Button primary>Play a Video</Button>}
            >
                <VideoEmbed
                    nodeData={{
                        argument: [{ value: 'Yx7OCVfeXlY' }],
                        name: 'youtube',
                    }}
                />
            </Modal>
            <SectionHeader>Buttons</SectionHeader>
            <Row>
                <div>
                    <Button primary>Button (Primary)</Button>
                    <Button secondary>Button (Secondary)</Button>
                    <Button tertiary>Button (tertiary)</Button>
                    <Button secondary pagination>
                        Button (pagination)
                    </Button>
                    <Button play />
                </div>
            </Row>
            <Row>
                <div>
                    <Button href="#" primary>
                        external link (Primary)
                    </Button>
                    <Button href="#" secondary>
                        external link (Secondary)
                    </Button>
                    <Button href="#" tertiary>
                        external link (tertiary)
                    </Button>
                </div>
            </Row>
            <Row>
                <div>
                    <Button to="/storybook" primary>
                        Internal link (Primary)
                    </Button>
                    <Button to="/storybook" secondary>
                        Internal link (Secondary)
                    </Button>
                    <Button to="/storybook" tertiary>
                        Internal link (tertiary)
                    </Button>
                </div>
            </Row>
            <SectionHeader>Notification</SectionHeader>
            <Notification />
            <SectionHeader>Code Block</SectionHeader>
            <CodeArticle>
                <P>Some fancy article content</P>
                <CodeBlock nodeData={{ value: shortCodeSample }} />
            </CodeArticle>
            <br />
            <CodeBlock nodeData={{ value: codeSample }} />
            <CodeBlock nodeData={{ value: cSharpCodeSample, lang: 'csp' }} />
            <SectionHeader>Links</SectionHeader>
            <Link href="#">Hello World</Link>
            <Link href="#" tertiary>
                Hello World
            </Link>
            <SectionHeader>Breadcrumbs</SectionHeader>
            <BreadcrumbStory />
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
            <br />
            <H4>Select</H4>
            <SelectStory />
            <br />
            <H4>Select (Narrow)</H4>
            <SelectStory narrow />
            <br />
            <H4>TextArea</H4>
            <TextArea placeholder="Email Address" />
            <br />
            <UploadButtonStory />
            <br />
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
            <SectionHeader>Article Series</SectionHeader>
            <SeriesStory />
            <SectionHeader>ToolTip/Content Menus</SectionHeader>
            <Row>
                <TableOfContentsStory />
                <Tooltip
                    hasGradientBorder
                    position="top"
                    trigger={<ShareIcon color={colorMap.yellow} />}
                >
                    <div>
                        <H2 bold>Title</H2>
                        <P>I'm REVEALED AGAIN! asdfasdfasdsfda</P>
                    </div>
                </Tooltip>
                <Tooltip
                    position="bottom"
                    trigger={<ShareIcon color={colorMap.lightGreen} />}
                >
                    I'm REVEALED!
                </Tooltip>
                <Tooltip position="left" trigger="Click on Me!">
                    I'm REVEALED AGAIN!
                </Tooltip>
            </Row>
            <Row>
                <H2
                    css={css`
                        max-width: 400px;
                    `}
                >
                    <GradientUnderline
                        gradient={gradientMap.violentMagentaOrange}
                    >
                        Gradient Underline Heading
                    </GradientUnderline>
                </H2>
            </Row>
            <SectionHeader>Cards</SectionHeader>
            <Row id="card-row">
                <Card
                    distinct
                    image={mockCardImage}
                    tags={mapTagTypeToUrl(['tag one', 'tag two'], 'tags')}
                    maxTitleLines={3}
                    title="I'm a Card For A Post on the New Devhub Platform! With no
                    links or clickable actions!"
                ></Card>
                <Card
                    href="#card-row"
                    image={mockCardImage}
                    tags={mapTagTypeToUrl(
                        ['tag one', 'tag two', 'tag three'],
                        'tags'
                    )}
                    title="I'm a Card"
                ></Card>
                <Card
                    image={mockCardImage}
                    onClick={() => console.log('Clicked!')}
                    highlight
                    card="I'm a highlighted Card"
                ></Card>
            </Row>
            <Row>
                <Card
                    distinct
                    width="300px"
                    title="
                        Install MongoDB Community Edition on Red Hat or CentOS
                        in minutes"
                    description="
                        Use this tutorial to install community edition on any
                        and every operating system known to man, woman, and
                        child."
                    href="#card-row"
                />
                <Card
                    width="300px"
                    title="
                        Install MongoDB Community Edition on Red Hat or CentOS
                        in minutes"
                    description="
                        Use this tutorial to install community edition on any
                        and every operating system known to man, woman, and
                        child.
                    "
                />
                <Card
                    highlight
                    width="300px"
                    title="I'm a Card With No Image"
                    description="written by Author"
                    href="#card-row"
                />
            </Row>
            <SectionHeader>Icons</SectionHeader>
            <Row>
                <ShareIcon color={colorMap.teal} />
                <FacebookIcon color={colorMap.salmon} />
                <TwitterIcon color={colorMap.violet} />
                <EnvelopeIcon color={colorMap.magenta} />
                <LinkIcon color={colorMap.orange} />
                <ListIcon color={colorMap.yellow} />
                <Youtube color={colorMap.lightGreen} />
                <LinkedInIcon color={colorMap.sherbet} />
                <Github color={colorMap.darkGreen} />
                <Twitch color={colorMap.devWhite} />
                <LocationIcon color={colorMap.violet} />
                <Folder />
            </Row>
            <SectionHeader>Events</SectionHeader>
            <EventsList items={sampleEvents} />
            <SectionHeader>Feature Block </SectionHeader>
            <FeatureBlock
                description="I'm a feature block that can be used to highlight content on any page"
                title="Feature Block"
                imgDescription="im an image description"
                imgTitle="Image Title"
                cta={{
                    text: 'Learn More',
                    to: '/storybook',
                }}
            />
            <br />
            <FeatureBlock
                reverse
                description="I'm a feature block that can be used to highlight content on any page"
                title="Feature Block"
                imgDescription="im an image description"
                imgTitle="Image Title"
                cta={{
                    text: 'Learn More',
                    to: '/storybook',
                }}
            />
        </StorybookContainer>
    </StorybookLayout>
);
