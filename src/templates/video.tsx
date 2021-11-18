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
import { BannerType } from '~src/types/banner-type';
import RelatedArticles from '../components/dev-hub/related-articles';
import ArticleSeries from '../components/dev-hub/article-series';

const VIDEO_BREADCRUMB = [
    {
        label: 'Home',
        target: '/',
    },
    {
        label: 'Learn',
        target: '/learn',
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
    @media ${screenSize.largeAndUp} {
        > * {
            
                margin-bottom: ${size.medium};
            
        }
    }

    @media ${screenSize.upToLarge} {
        display: inline-flex;
        flex-direction: row;
       
        > * {
            margin-top: 0;
            margin-right: ${size.mediumLarge};
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

const StyledShareFooter = styled(ShareFooter)`
    a {
        margin-left: 0 !important;
        margin-right: ${size.medium};
    } 
`;


const Video = ({
    pageContext: {
        seriesVideos,
        data: {
            slug,
            description,
            publishDate,
            thumbnailUrl,
            title,
            videoId,
            mediaType,
            tags,
            products,
            languages,
            related,
            authors,
        },
    },
}) => {
    const { siteUrl } = useSiteMetadata();
    const pageUrl = addTrailingSlashIfMissing(`${siteUrl}${slug}`);
    const capitalizedBreadcrumb =
        mediaType.charAt(0).toUpperCase() + mediaType.slice(1);
    const tagList = [...products, ...languages, ...tags];
    // For structured data, we would like a list of the tags to include
    const tagLabels = tagList.map(({ label }) => label);
    const videoBreadcrumb = useMemo(() => {
        return [
            ...VIDEO_BREADCRUMB,
            {
                label: `${capitalizedBreadcrumb} Video`,
                target: `/type/${mediaType}-video`,
            },
            {
                label: title,
                target: slug,
            },
        ];
    }, [mediaType, slug, capitalizedBreadcrumb, title]);

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
                title={title}
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
                description={description}
                publishedDate={publishDate}
                tags={[]}
                title={title}
            />
            <BlogPostTitleArea
                breadcrumb={videoBreadcrumb}
                originalDate={publishDate}
                title={title}
                maintainSquareAspectRatio={false}
                bannerType={BannerType.VIDEO}
                tags={tagList}
                authors={authors}
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
                    <StyledShareFooter
                        title={title}
                        url={pageUrl}
                        tags={tagList}
                    />
                    <ArticleSeries
                        allSeriesForArticle={seriesVideos}
                        title={title}
                    />
                </Content>
            </Container>
            <RelatedArticles
                related={related}
            />
        </Layout>
    );
};

export default Video;
