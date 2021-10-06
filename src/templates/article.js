import React, { useEffect, useMemo } from 'react';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import DocumentBody from '../components/DocumentBody';
import ArticleShareFooter from '../components/dev-hub/article-share-footer';
import BlogPostTitleArea from '../components/dev-hub/blog-post-title-area';
import Layout from '../components/dev-hub/layout';
import RelatedArticles from '../components/dev-hub/related-articles';
import { screenSize, size } from '../components/dev-hub/theme';
import SEO from '../components/dev-hub/SEO';
import ArticleSeries from '../components/dev-hub/article-series';
import { getTagPageUriComponent } from '../utils/get-tag-page-uri-component';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import ContentsMenu from '../components/dev-hub/contents-menu';
import { addLeadingSlashIfMissing } from '../utils/add-leading-slash-if-missing';
import { addTrailingSlashIfMissing } from '../utils/add-trailing-slash-if-missing';
import ArticleSchema from '../components/dev-hub/article-schema';
import BlogShareLinks from '../components/dev-hub/blog-share-links';
import ArticleRating from '~components/ArticleRating';
import { ArticleRatingProvider } from '~components/ArticleRatingContext';

const allowTextWrapping = css`
    /* Wrap words/content across lines */
    /* word-wrap and overflow-wrap are identical aside from CSS2/3 renaming */
    overflow-wrap: break-word;
    word-break: break-word;
    word-wrap: break-word;
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

const ArticleContent = styled('article')`
    grid-area: article;
    max-width: ${size.maxContentWidth};
    padding: 0 ${size.small};
    @media ${screenSize.upToLarge} {
        margin: 0 auto;
        padding: 0;
    }
`;

const Icons = styled('div')`
    grid-area: icons;
    margin: ${size.tiny} ${size.default};
    span {
        padding: 0 ${size.tiny};
    }
    @media ${screenSize.largeAndUp} {
        display: flex;
        flex-direction: column;
        span:not(:first-of-type) {
            margin-top: ${size.small};
        }
    }
    @media ${screenSize.upToLarge} {
        margin: 0;
        span:not(:first-of-type) {
            margin-left: ${size.small};
        }
    }
`;

const Container = styled('div')`
    ${allowTextWrapping};

    display: grid;
    grid-auto-rows: auto;
    grid-template-columns: auto;
    justify-content: center;
    grid-template-rows: ${size.medium} auto;
    grid-template-areas:
        'icons icons icons'
        'rating rating rating'
        'article article article'
        'article article article'
        'article article article';

    padding: 0 ${size.default};

    @media ${screenSize.largeAndUp} {
        grid-template-rows: auto;
        padding: 0;
        grid-template-areas:
            'rating rating rating'
            'icons article article'
            'icons article article'
            'icons article article';
    }
`;

const StyledRating = styled(ArticleRating)`
    grid-area: rating;
    margin: 0 ${size.default} ${size.large} 0;

    @media ${screenSize.largeAndUp} {
        margin: 0 6px ${size.large} 6px;
        justify-self: end;
    }
`;

const Article = props => {
    const {
        pageContext: {
            seriesArticles,
            metadata: { slugToTitle: slugTitleMapping },
            article: {
                authors,
                contentAST,
                headingNodes,
                image,
                languages,
                products,
                publishedDate,
                related,
                SEO: { canonicalUrl, metaDescription, og, twitter },
                slug,
                tags,
                title,
                type,
                updatedDate,
            },
        },
        ...rest
    } = props;
    const slugWithAllSlashes = addLeadingSlashIfMissing(
        addTrailingSlashIfMissing(slug)
    );

    const meta = { authors, slug: slugWithAllSlashes, title };
    const { siteUrl } = useSiteMetadata();
    const articleBreadcrumb = useMemo(() => {
        const breadcrumb = [
            { label: 'Home', target: '/' },
            { label: 'Learn', target: '/learn' },
            {
                label: title,
                target: slug,
            },
        ];
        if (type && type.length) {
            breadcrumb.splice(2, 0, {
                label: type[0].toUpperCase() + type.substring(1),
                target: `/type/${getTagPageUriComponent(type)}`,
            });
        }

        return breadcrumb;
    }, [slug, title, type]);

    const tagList = [...products, ...languages, ...tags];
    // For structured data, we would like a list of the tags to include
    const tagLabels = tagList.map(({ label }) => label);
    const articleUrl = addTrailingSlashIfMissing(`${siteUrl}/${slug}`);

    useEffect(() => {
        window.DiscourseEmbed = {
            discourseUrl:
                'https://mongodbcom-cdn.website.staging.corp.mongodb.com/community/forums/',
            topicId: 13892,
        };

        (function () {
            var d = document.createElement('script');
            d.type = 'text/javascript';
            d.async = true;
            d.src = window.DiscourseEmbed.discourseUrl + 'javascripts/embed.js';
            (
                document.getElementsByTagName('head')[0] ||
                document.getElementsByTagName('body')[0]
            ).appendChild(d);
        })();
    }, []);

    return (
        <ArticleRatingProvider>
            <Layout includeCanonical={false}>
                <SEO
                    title={title}
                    canonicalUrl={canonicalUrl}
                    image={og.image}
                    metaDescription={metaDescription}
                    ogDescription={og.description}
                    ogTitle={og.title || title}
                    ogUrl={og.url || articleUrl}
                    twitter={twitter}
                    type={og.type}
                />
                <ArticleSchema
                    authors={authors}
                    articleUrl={articleUrl}
                    description={metaDescription}
                    imageUrl={image}
                    modifiedDate={updatedDate}
                    publishedDate={publishedDate}
                    tags={tagLabels}
                    title={title}
                />
                <BlogPostTitleArea
                    articleImage={image}
                    authors={authors}
                    breadcrumb={articleBreadcrumb}
                    originalDate={publishedDate}
                    tags={tagList}
                    title={title}
                    updatedDate={updatedDate}
                />
                <Container>
                    <StyledRating articleMeta={meta} isTop />
                    <Icons>
                        <ContentsMenu
                            title="Contents"
                            headingNodes={headingNodes}
                            height={size.default}
                            width={size.default}
                        />
                        <StyledBlogShareLinks
                            isTop
                            position="right"
                            title={title}
                            url={articleUrl}
                        />
                    </Icons>
                    <ArticleContent>
                        <DocumentBody
                            pageNodes={contentAST}
                            slugTitleMapping={slugTitleMapping}
                            slug={slug}
                            {...rest}
                        />
                        <ArticleRating isBottom articleMeta={meta} />
                        <ArticleShareFooter
                            title={title}
                            url={articleUrl}
                            tags={tagList}
                        />
                        <ArticleSeries
                            allSeriesForArticle={seriesArticles}
                            slugTitleMapping={slugTitleMapping}
                            title={title}
                        />
                    </ArticleContent>
                </Container>
                <RelatedArticles
                    related={related}
                    slugTitleMapping={slugTitleMapping}
                />
                <div id="discourse-comments"></div>
            </Layout>
        </ArticleRatingProvider>
    );
};

export default Article;
