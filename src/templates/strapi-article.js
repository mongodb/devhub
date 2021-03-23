import React from 'react';
import dlv from 'dlv';
import { withPrefix } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import DocumentBody from '../components/DocumentBody';
import ArticleShareFooter from '../components/dev-hub/article-share-footer';
import BlogPostTitleArea from '../components/dev-hub/blog-post-title-area';
import Layout from '../components/dev-hub/layout';
import RelatedArticles from '../components/dev-hub/related-articles';
import { screenSize, size } from '../components/dev-hub/theme';
import SEO from '../components/dev-hub/SEO';
import ArticleSeries from '../components/dev-hub/article-series';
import { getTagLinksFromMeta } from '../utils/get-tag-links-from-meta';
import { getTagPageUriComponent } from '../utils/get-tag-page-uri-component';
import { toDateString } from '../utils/format-dates';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import ShareMenu from '../components/dev-hub/share-menu';
import ContentsMenu from '../components/dev-hub/contents-menu';
import { addTrailingSlashIfMissing } from '../utils/add-trailing-slash-if-missing';
import { getNestedValue } from '../utils/get-nested-value';
import { findSectionHeadings } from '../utils/find-section-headings';
import { getNestedText } from '../utils/get-nested-text';
import ArticleSchema from '../components/dev-hub/article-schema';

const dateFormatOptions = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
};

const ArticleContent = styled('article')`
    max-width: ${size.maxContentWidth};
    padding-left: ${size.small};
    padding-right: ${size.small};
    @media ${screenSize.upToLarge} {
        margin: 0 auto;
    }
`;
const Icons = styled('div')`
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
        margin: 0 ${size.small};
        span:not(:first-of-type) {
            margin-left: ${size.small};
        }
    }
`;
const Container = styled('div')`
    margin: 0 auto;
    @media ${screenSize.largeAndUp} {
        display: flex;
        justify-content: center;
    }
`;
const Article = props => {
    const {
        pageContext: {
            parsedContent,
            seriesArticles,
            slug: thisPage,
            metadata: { slugToTitle: slugTitleMapping },
            name,
            tags,
            products,
            languages,
            published_at,
            updatedAt,
            ...otherContext
        },
        ...rest
    } = props;
    const { siteUrl } = useSiteMetadata();
    const childNodes = dlv(parsedContent, 'children', []);
    console.log(childNodes, otherContext, languages);
    const meta = dlv(parsedContent, 'query_fields') || {};
    const og = meta.og || {};
    const ogDescription =
        og.children && og.children.length ? getNestedText(og.children) : null;
    const twitterNode = childNodes.find(node => node.name === 'twitter');
    const metaDescriptionNode = childNodes.find(
        node => node.name === 'meta-description'
    );
    const metaDescription =
        metaDescriptionNode && getNestedText(metaDescriptionNode.children);
    const articleBreadcrumbs = [
        { label: 'Home', target: '/' },
        { label: 'Learn', target: '/learn' },
    ];
    if (meta.type && meta.type.length) {
        articleBreadcrumbs.push({
            label: meta.type[0].toUpperCase() + meta.type.substring(1),
            target: `/type/${getTagPageUriComponent(meta.type)}`,
        });
    }
    const tagList = getTagLinksFromMeta({ tags, products, languages });
    const articleUrl = addTrailingSlashIfMissing(`${siteUrl}/${thisPage}`);
    const headingNodes = [];
    const formattedPublishedDate = toDateString(
        published_at,
        dateFormatOptions
    );
    const formattedUpdatedDate = toDateString(updatedAt, dateFormatOptions);
    const canonicalUrl = dlv(
        parsedContent,
        'ast.options.canonical-href',
        articleUrl
    );

    const articleImage = withPrefix(meta['atf-image']);

    return (
        <Layout includeCanonical={false}>
            <SEO
                articleTitle={name}
                canonicalUrl={canonicalUrl}
                image={og.image}
                metaDescription={metaDescription}
                ogDescription={ogDescription}
                ogTitle={og.title || name}
                ogUrl={og.url || articleUrl}
                twitterNode={twitterNode}
                type={og.type}
            />
            <ArticleSchema
                articleUrl={articleUrl}
                title={name}
                description={metaDescription}
                publishedDate={published_at}
                modifiedDate={updatedAt}
                imageUrl={articleImage}
                authors={meta.author}
            />
            <BlogPostTitleArea
                articleImage={articleImage}
                authors={meta.author}
                breadcrumb={articleBreadcrumbs}
                originalDate={formattedPublishedDate}
                tags={tagList}
                title={name}
                updatedDate={formattedUpdatedDate}
            />
            <Container>
                <Icons>
                    <ContentsMenu
                        title="Contents"
                        headingNodes={headingNodes}
                        height={size.default}
                        width={size.default}
                    />
                    <ShareMenu
                        title={name}
                        url={articleUrl}
                        height={size.default}
                        width={size.default}
                    />
                </Icons>
                <ArticleContent>
                    <DocumentBody
                        pageNodes={childNodes}
                        slugTitleMapping={slugTitleMapping}
                        slug={thisPage}
                        {...rest}
                    />
                    <ArticleShareFooter
                        title={name}
                        url={articleUrl}
                        tags={tagList}
                    />
                    <ArticleSeries
                        allSeriesForArticle={seriesArticles}
                        slugTitleMapping={slugTitleMapping}
                        title={name}
                    />
                </ArticleContent>
            </Container>
            <RelatedArticles
                related={meta.related}
                slugTitleMapping={slugTitleMapping}
            />
        </Layout>
    );
};

Article.propTypes = {
    pageContext: PropTypes.shape({
        __refDocMapping: PropTypes.shape({
            ast: PropTypes.shape({
                children: PropTypes.array,
            }).isRequired,
        }).isRequired,
        slugTitleMapping: PropTypes.shape({
            [PropTypes.string]: PropTypes.string,
        }),
    }).isRequired,
};

export default Article;
