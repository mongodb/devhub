import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

import ArticleSchema from '~components/dev-hub/article-schema';
import BlogPostTitleArea from '~components/dev-hub/blog-post-title-area';
import Layout from '~components/dev-hub/layout';
import SEO from '~components/dev-hub/SEO';
import ShareFooter from '~components/dev-hub/article-share-footer';
import ShareMenu from '~components/dev-hub/share-menu';
import VideoEmbed from '~components/dev-hub/video-embed';
import { P } from '~components/dev-hub/text';

import { toDateString } from '~utils/format-dates';
import { addTrailingSlashIfMissing } from '~utils/add-trailing-slash-if-missing';
import { useSiteMetadata } from '~hooks/use-site-metadata';

import { dateFormatOptions } from '~src/constants';
import { lineHeight, screenSize, size } from '~components/dev-hub/theme';

const VIDEO_BREADCRUMB = [
    {
        label: 'Home',
        target: '/',
    },
    { label: 'Learn', target: '/learn' },
];

const TOOLTIP_TEXT = 'Video link copied to clipboard!';

const Container = styled('div')`
    margin: 0 auto;
    @media ${screenSize.largeAndUp} {
        display: flex;
        justify-content: center;
        margin-top: ${size.xxlarge};
    }
`;

const Content = styled('article')`
    margin: 0 auto;
    max-width: ${size.maxContentWidth};
    padding-left: ${size.small};
    padding-right: ${size.small};
    width: 100%;
    @media ${screenSize.largeAndUp} {
        margin: initial;
    }
`;

const Icons = styled('div')`
    margin: 0 ${size.small};
    span {
        &:not(:first-of-type) {
            margin-left: ${size.small};
        }
        padding: 0 ${size.tiny};
    }
    @media ${screenSize.largeAndUp} {
        display: flex;
        flex-direction: column;
        margin: 0 ${size.default};
        span:not(:first-of-type) {
            margin-top: ${size.small};
        }
    }
`;

const StyledParagraph = styled(P)`
    line-height: ${lineHeight.default};
`;

//This is TEST DATA and will removed in DEVHUB-663. For test just add the component instead of article.
//Youtube
const data = {
    description:
        'Want to integrate MongoDB into your Phaser HTML5 games? Learn how in the first part of a multi-part Twitch series hosted by Nic Raboy and Adrienne Tacke.\n\nIn this part we explore how to draw lines with a mouse cursor or mobile device stylus on a Phaser canvas. We take time to understand how these lines are created and the data that can be potentially stored in MongoDB. After getting basic drawing down, we transition into configuring MongoDB Atlas and MongoDB Realm, components that will be made use of in the next part of the series.',
    mediaType: 'youtube',
    playlistId: 'PL4RCxklHWZ9sOT_iMTc3RKgSoVbQpe8aX',
    publishDate: '2020-07-15T14:00:13Z',
    thumbnailUrl: 'https://i.ytimg.com/vi/sx_hnMUhiHA/sddefault.jpg',
    title:
        'Creating a Multiplayer Drawing Game with Phaser and MongoDB, Part 1',
    videoId: 'sx_hnMUhiHA',
};
//
//Twitch
// const data = {
//     description: "",
//     mediaType: "twitch",
//     publishDate: "2021-03-31T17:02:32Z",
//     thumbnailUrl: "https://static-cdn.jtvnw.net/cf_vods/d2nvs31859zcd8/664c72cb8d59f8790fb0_mongodb_42167974830_1617210143//thumb/thumb0-%{width}x%{height}.jpg",
//     title: "Creating a Pokémon Game with MongoDB Change Streams",
//     videoId: "970171464",
// }

const Video = ({
    pageContext: {
        data: {
            description,
            publishDate,
            thumbnailUrl: image,
            title,
            videoId,
            mediaType,
        },
        slug,
    } = { data, slug: '/test' },
}) => {
    const { siteUrl } = useSiteMetadata();
    const pageUrl = addTrailingSlashIfMissing(`${siteUrl}${slug}`);
    const formattedPublishDate = toDateString(publishDate, dateFormatOptions);

    const videoBreadcrumb = useMemo(
        () => [
            ...VIDEO_BREADCRUMB,
            {
                label: `${mediaType} Video`,
                target: slug,
            },
        ],
        [mediaType, slug]
    );

    return (
        <Layout includeCanonical={false}>
            <SEO
                articleTitle={title}
                canonicalUrl={pageUrl}
                image={image}
                metaDescription={description}
                ogDescription={description}
                ogTitle={title}
                ogUrl={pageUrl}
                twitter={{
                    description,
                    image,
                    title,
                }}
            />
            <ArticleSchema
                articleUrl={pageUrl}
                title={title}
                description={description}
                publishedDate={formattedPublishDate}
                imageUrl={image}
            />
            <BlogPostTitleArea
                breadcrumb={videoBreadcrumb}
                originalDate={formattedPublishDate}
                title={title}
            />
            <Container>
                <Icons>
                    <ShareMenu
                        height={size.default}
                        title={title}
                        url={pageUrl}
                        width={size.default}
                    />
                </Icons>
                <Content>
                    <VideoEmbed
                        nodeData={{
                            argument: [{ value: videoId }],
                            name: mediaType,
                        }}
                        thumbnail={image}
                    />
                    <StyledParagraph>{description}</StyledParagraph>
                    <ShareFooter
                        title={title}
                        tooltipText={TOOLTIP_TEXT}
                        url={pageUrl}
                    />
                </Content>
            </Container>
        </Layout>
    );
};

Video.propTypes = {
    pageContext: PropTypes.shape({
        data: PropTypes.shape({
            description: PropTypes.string,
            mediaType: PropTypes.string,
            publishDate: PropTypes.string,
            thumbnailUrl: PropTypes.string,
            title: PropTypes.string,
            videoId: PropTypes.string,
        }),
        slug: PropTypes.string,
    }),
};

export default Video;
