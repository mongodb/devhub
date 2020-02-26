import React from 'react';
import dlv from 'dlv';
import { withPrefix } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import DocumentBody from '../components/DocumentBody';
import BlogPostTitleArea from '../components/dev-hub/blog-post-title-area';
import Card from '../components/dev-hub/card';
import Layout from '../components/dev-hub/layout';
import { H4 } from '../components/dev-hub/text';
import { colorMap, size } from '../components/dev-hub/theme';
import ARTICLE_PLACEHOLDER from '../../src/images/1x/MDB-and-Node.js.png';
import Series from '../components/dev-hub/series';
import { getNestedText } from '../utils/get-nested-text';
import { getTagLinksFromMeta } from '../utils/get-tag-links-from-meta';

let articleTitle = '';

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
                // TODO: This is a hack to pull the title out of the flow
                if (grandChildNode.type === 'heading') {
                    articleTitle = getNestedText(grandChildNode.children);
                } else if (contentNodesMap[grandChildNode.name]) {
                    nodesWeActuallyWant.push(grandChildNode);
                }
            }
        }
    }

    return nodesWeActuallyWant;
};

// TODO: series will no longer be defined in the article rST, this must be looked up from allSeries in createPages beforehand
// This assumes each article belongs to at most one series
const ArticleSeries = ({
    allSeries,
    currentArticleSeries,
    currentSlug,
    slugTitleMapping,
}) => {
    // Handle if this article is not in a series or no series are defined
    if (!allSeries || !currentArticleSeries) return null;
    const relevantSeries = allSeries[currentArticleSeries];
    // Handle if this series is not defined in the top-level content TOML file
    if (!relevantSeries || !relevantSeries.length) return null;
    const mappedSeries = relevantSeries.map(s => {
        const articleTitle = dlv(slugTitleMapping, [s, 0, 'value'], s);
        return {
            slug: s,
            title: articleTitle,
        };
    });
    return (
        <>
            <Series name={currentArticleSeries} currentStep={currentSlug}>
                {mappedSeries}
            </Series>
            <br />
        </>
    );
};

const RelatedContainer = styled('div')`
    background-color: ${colorMap.devBlack};
    padding: 70px 120px;
    margin: 0 auto;
    height: 575px;
`;

const RelatedCards = styled('div')`
    display: flex;
`;

const RelatedArticles = ({ related, slugTitleMapping }) => {
    if (!related || !related.length) return null;
    return (
        <RelatedContainer>
            <H4>Related</H4>
            <RelatedCards>
                {related.map(r => {
                    const target = r.target;
                    const slug = r.target && r.target.slice(1, r.target.length);
                    const image = r.image || ARTICLE_PLACEHOLDER;
                    const title = dlv(
                        slugTitleMapping,
                        [slug, 0, 'value'],
                        'Title Not Found'
                    );
                    /* TODO: Case on doc to link internal vs external */
                    return (
                        <Card
                            image={image}
                            href={target}
                            maxDescriptionLines={2}
                            title={title}
                            maxWidth={260}
                        />
                    );
                })}
            </RelatedCards>
        </RelatedContainer>
    );
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
            slug: thisPage,
            metadata: { pageGroups: allSeries, slugToTitle: slugTitleMapping },
        },
        ...rest
    } = props;
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
            target: `/type/${meta.type}`,
        });
    }
    const tagList = getTagLinksFromMeta(meta);
    console.log({ childNodes });
    console.log({ contentNodes });
    console.log({ meta });
    console.log(rest);

    return (
        <Layout>
            <BlogPostTitleArea
                articleImage={withPrefix(meta['atf-image'])}
                author={meta.author}
                breadcrumb={articleBreadcrumbs}
                originalDate={meta.pubdate}
                tags={tagList}
                title={articleTitle}
            />

            <ArticleContent>
                <DocumentBody
                    pageNodes={contentNodes}
                    slugTitleMapping={slugTitleMapping}
                    {...rest}
                />
                <ArticleSeries
                    allSeries={allSeries}
                    currentArticleSeries={meta.series}
                    currentSlug={slugTitleMapping[thisPage][0].value}
                    slugTitleMapping={slugTitleMapping}
                />
            </ArticleContent>

            <RelatedArticles
                related={[
                    {
                        image: null,
                        type: 'role',
                        position: {
                            start: {
                                line: 51,
                            },
                        },
                        domain: '',
                        name: 'doc',
                        target:
                            '/quickstart/nodejs-how-to-connect-to-your-database',
                        children: [],
                    },
                    {
                        image: null,
                        type: 'role',
                        position: {
                            start: {
                                line: 51,
                            },
                        },
                        domain: '',
                        name: 'doc',
                        target:
                            '/quickstart/nodejs-how-to-connect-to-your-database',
                        children: [],
                    },
                ]}
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
