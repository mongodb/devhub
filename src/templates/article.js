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
import Series from '../components/dev-hub/series';
import { getTagLinksFromMeta } from '../utils/get-tag-links-from-meta';
import { getTagPageUriComponent } from '../utils/get-tag-page-uri-component';
import { toDateString } from '../utils/format-dates';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import ShareMenu from '../components/dev-hub/share-menu';
import ContentsMenu from '../components/dev-hub/contents-menu';
import { getNestedValue } from '../utils/get-nested-value';
import { findSectionHeadings } from '../utils/find-section-headings';
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

const dateFormatOptions = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
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
    max-width: ${size.maxContentWidth};
    padding-left: ${size.small};
    padding-right: ${size.small};
`;
const Icons = styled('div')`
    margin: ${size.tiny} ${size.default};
    span {
        padding: 0 ${size.tiny};
    }
    @media ${screenSize.smallAndUp} {
        display: flex;
        flex-direction: column;
        span:not(:first-of-type) {
            margin-top: ${size.small};
        }
    }
    @media ${screenSize.upToSmall} {
        margin: 0 ${size.small};
        span:not(:first-of-type) {
            margin-left: ${size.small};
        }
    }
`;
const Container = styled('div')`
    margin: 0 auto;
    @media ${screenSize.smallAndUp} {
        display: flex;
        justify-content: center;
    }
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
    const og = meta.og || {};
    const twitterNode = contentNodes.find(node => node.name === 'twitter');
    if (twitterNode) {
        // Remove it from content nodes
        const index = contentNodes.indexOf(twitterNode);
        contentNodes.splice(index, 1);
    }
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
    const articleUrl = `${siteUrl}/${thisPage}/`;
    const headingNodes = findSectionHeadings(
        getNestedValue(['ast', 'children'], __refDocMapping),
        'type',
        'heading',
        1
    );
    const formattedPublishedDate = toDateString(
        meta.pubdate,
        dateFormatOptions
    );
    const formattedUpdatedDate = toDateString(
        meta.updatedDate,
        dateFormatOptions
    );

    return (
        <Layout>
            <SEO
                articleTitle={articleTitle}
                image={og.image}
                ogTitle={og.title || articleTitle}
                twitterNode={twitterNode}
                type={og.type || 'article'}
                url={og.url || articleUrl}
            />
            <BlogPostTitleArea
                articleImage={withPrefix(meta['atf-image'])}
                authors={meta.author}
                breadcrumb={articleBreadcrumbs}
                originalDate={formattedPublishedDate}
                tags={tagList}
                title={articleTitle}
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
                        title={articleTitle}
                        url={articleUrl}
                        height={size.default}
                        width={size.default}
                    />
                </Icons>
                <ArticleContent>
                    <DocumentBody
                        pageNodes={contentNodes}
                        slugTitleMapping={slugTitleMapping}
                        slug={thisPage}
                        {...rest}
                    />
                    <ArticleShareFooter
                        title={articleTitle}
                        url={articleUrl}
                        tags={tagList}
                    />
                    <ArticleSeries
                        allSeriesForArticle={seriesArticles}
                        slugTitleMapping={slugTitleMapping}
                        title={articleTitle}
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
