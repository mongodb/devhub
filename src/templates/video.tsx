import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import ArticleSchema from '~components/dev-hub/article-schema';
import BlogPostTitleArea from '~components/dev-hub/blog-post-title-area';
import Layout from '~components/dev-hub/layout';
import SEO from '~components/dev-hub/SEO';
import ShareFooter from '~components/dev-hub/article-share-footer';
import VideoEmbed from '~components/dev-hub/video-embed';
import { P } from '~components/dev-hub/text';
import getTwitchThumbnail from '~utils/get-twitch-thumbnail';
import { addTrailingSlashIfMissing } from '~utils/add-trailing-slash-if-missing';
import { useSiteMetadata } from '~hooks/use-site-metadata';
import BlogShareLinks from '../components/dev-hub/blog-share-links';
import { lineHeight, screenSize, size } from '~components/dev-hub/theme';
import { Video as IVideo } from '~src/interfaces/video';
import {BannerType} from "~src/types/banner-type";

const VIDEO_BREADCRUMB = [
    {
        label: 'Home',
        target: '/',
    },
    {
        label: 'Learn',
        target: '/learn'
    },

];

const TOOLTIP_TEXT = 'Video link copied to clipboard!';

const Container = styled('div')`
    margin: 0 auto;
    @media ${screenSize.largeAndUp} {
        display: flex;
        justify-content: center;
        margin-top: 50px;
    }
`;

const StyledBlogShareLinks = styled(BlogShareLinks)`
    flex-direction: column;
    align-items: center;
    > * {
        margin-top: ${size.medium};
    }
    @media ${screenSize.upToLarge} {
        display: inline-flex;
        flex-direction: row;
        > * {
            margin-top: 0;
            margin-left: ${size.mediumLarge};
        }
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
    white-space: pre-wrap;
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
            thumbnailUrl,
            title,
            videoId,
            mediaType,
        },
    },
}: VideoProps) => {
    const { siteUrl } = useSiteMetadata();
    const pageUrl = addTrailingSlashIfMissing(`${siteUrl}${slug}`);
    const capitalizedBreadcrumb = mediaType.charAt(0).toUpperCase() + mediaType.slice(1);

    const videoBreadcrumb = useMemo(
        () => {
            return [
            ...VIDEO_BREADCRUMB,
                {
                    label: `${capitalizedBreadcrumb} Video`,
                    target: `/type/${mediaType}-video`,
                },
                {
                    label: title,
                    target: slug
                }
                ];
        },
        [mediaType, slug, capitalizedBreadcrumb,title]
    );

    const image = useMemo(
        () =>
            mediaType === 'twitch'
                ? getTwitchThumbnail(thumbnailUrl)
                : thumbnailUrl,
        [mediaType, thumbnailUrl]
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
                publishedDate={publishDate}
            />
            <BlogPostTitleArea
                breadcrumb={videoBreadcrumb}
                originalDate={publishDate}
                title={title}
                maintainSquareAspectRatio={false}
                bannerType={BannerType.VIDEO}
            />
            <Container>
                <Icons>
                    <StyledBlogShareLinks
                        isTop
                        position="right"
                        title={title}
                        url={pageUrl}
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
