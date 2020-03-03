import React from 'react';
import dlv from 'dlv';
import { withPrefix } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Helmet } from 'react-helmet';
import DocumentBody from '../components/DocumentBody';
import ArticleShareFooter from '../components/dev-hub/article-share-footer';
import BlogPostTitleArea from '../components/dev-hub/blog-post-title-area';
import Layout from '../components/dev-hub/layout';
import RelatedArticles from '../components/dev-hub/related-articles';
import { size } from '../components/dev-hub/theme';
import Series from '../components/dev-hub/series';
import { getTagLinksFromMeta } from '../utils/get-tag-links-from-meta';
import { getTagPageUriComponent } from '../utils/get-tag-page-uri-component';
import { normalizePath } from '../utils/normalize-path';
import { useSiteMetadata } from '../hooks/use-site-metadata';

/**
 * Name map of directives we want to display in an article
 */
const contentNodesMap = {
    introduction: true,
    prerequisites: true,
    content: true,
    'meta-description': true,
    summary: true,
    twitter: true,
};

/**
 * search the ast for the few directives we need to display content
 * TODO this ignores some important meta like Twitter for now
 * @param {array} nodes
 * @returns {array} array of childNodes with our main content
 */
const getContent = nodes => {
    const nodesWeActuallyWant = [];
    for (let nodeIndex = 0; nodeIndex < nodes.length; nodeIndex++) {
        const childNode = nodes[nodeIndex];
        // check top level directives first
        if (contentNodesMap[childNode.name]) {
            nodesWeActuallyWant.push(childNode);
        }
        // Some content nodes will be children of section nodes
        else if (childNode.type === 'section') {
            for (
                let childIndex = 0;
                childIndex < childNode.children.length;
                childIndex++
            ) {
                const grandChildNode = childNode.children[childIndex];
                if (contentNodesMap[grandChildNode.name]) {
                    nodesWeActuallyWant.push(grandChildNode);
                }
            }
        }
    }

    return nodesWeActuallyWant;
};

const ArticleSeries = ({ allSeriesForArticle, slugTitleMapping, title }) => {
    // Handle if this article is not in a series or no series are defined
    if (!allSeriesForArticle) return null;
    // Handle if this series is not defined in the top-level content TOML file
    const getMappedSeries = seriesSlugs => {
        if (!seriesSlugs || !seriesSlugs.length) return null;
        const mappedSeries = seriesSlugs.map(slug => {
            const articleTitle = dlv(
                slugTitleMapping,
                [slug, 0, 'value'],
                slug
            );
            return {
                slug,
                title: articleTitle,
            };
        });
        return mappedSeries;
    };

    return Object.keys(allSeriesForArticle).map(series => (
        <>
            <Series name={series} currentStep={title}>
                {getMappedSeries(allSeriesForArticle[series])}
            </Series>
            <br />
        </>
    ));
};

const ArticleContent = styled('article')`
    margin: 0 auto;
    max-width: ${size.maxContentWidth};
    padding-left: ${size.small};
    padding-right: ${size.small};
`;

const Article = props => {
    const {
        pageContext: {
            __refDocMapping,
            seriesArticles,
            slug: thisPage,
            metadata: { slugToTitle: slugTitleMapping },
        },
        ...rest
    } = props;
    const { siteUrl } = useSiteMetadata();
    const childNodes = dlv(__refDocMapping, 'ast.children', []);
    const contentNodes = getContent(childNodes);
    const meta = dlv(__refDocMapping, 'query_fields');
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
    const tagList = getTagLinksFromMeta(meta);
    const articleTitle = dlv(meta.title, [0, 'value'], thisPage);
    const articleUrl = normalizePath(`${siteUrl}/${thisPage}`);
    return (
        <Layout>
            <Helmet>
                <title>{articleTitle}</title>
                <meta property="og:title" content={articleTitle}></meta>
                <meta property="og:url" content={articleUrl}></meta>
                <link rel="canonical" href={articleUrl}></link>
            </Helmet>
            <BlogPostTitleArea
                articleImage={withPrefix(meta['atf-image'])}
                author={meta.author}
                breadcrumb={articleBreadcrumbs}
                originalDate={meta.pubdate}
                tags={tagList}
                title={articleTitle}
                updatedDate={meta.updatedDate}
            />

            <ArticleContent>
                <DocumentBody
                    pageNodes={contentNodes}
                    slugTitleMapping={slugTitleMapping}
                    {...rest}
                />
                <ArticleShareFooter url={articleUrl} tags={tagList} />
                <ArticleSeries
                    allSeriesForArticle={seriesArticles}
                    slugTitleMapping={slugTitleMapping}
                    title={articleTitle}
                />
            </ArticleContent>

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
