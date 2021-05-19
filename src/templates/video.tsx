import React, { useMemo } from 'react';
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
import { Video as IVideo } from '~src/interfaces/video';

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

type VideoProps = {
    pageContext: {
        data: IVideo;
    };
};

const Video = ({
    pageContext: {
        data: {
            slug,
            description,
            publishDate,
            thumbnailUrl: image,
            title,
            videoId,
            mediaType,
        },
    },
}: VideoProps) => {
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
export default Video;
