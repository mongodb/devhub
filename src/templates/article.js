import React, { useMemo } from 'react';
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
    /* These are technically the same, but use both */
    overflow-wrap: break-word;
    word-wrap: break-word;

    -ms-word-break: break-all;
    /* This is the dangerous one in WebKit, as it breaks things wherever */
    word-break: break-all;
    /* Instead use this non-standard one: */
    word-break: break-word;

    /* Adds a hyphen where the word breaks, if supported (No Blink) */
    -ms-hyphens: auto;
    -moz-hyphens: auto;
    -webkit-hyphens: auto;
    hyphens: auto;

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
        grid-template-rows: unset;
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
    const articleUrl = addTrailingSlashIfMissing(`${siteUrl}/${slug}`);

    return (
        <ArticleRatingProvider>
            <Layout includeCanonical={false}>
                <SEO
                    articleTitle={title}
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
                    articleUrl={articleUrl}
                    title={title}
                    description={metaDescription}
                    publishedDate={publishedDate}
                    modifiedDate={updatedDate}
                    imageUrl={image}
                    authors={authors}
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
            </Layout>
        </ArticleRatingProvider>
    );
};

export default Article;
