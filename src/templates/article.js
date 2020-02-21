import React from 'react';
import dlv from 'dlv';
import PropTypes from 'prop-types';
import DocumentBody from '../components/DocumentBody';
import BlogPostTitleArea from '../components/dev-hub/blog-post-title-area';
import Layout from '../components/dev-hub/layout';
import ARTICLE_PLACEHOLDER from '../../src/images/1x/MDB-and-Node.js.png';
import { getNestedText } from '../utils/get-nested-text';

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

const Article = props => {
    const {
        pageContext: {
            __refDocMapping,
            metadata: { slugToTitle: slugTitleMapping },
        },
        ...rest
    } = props;
    const childNodes = dlv(__refDocMapping, 'ast.children', []);
    const contentNodes = getContent(childNodes);
    const meta = dlv(__refDocMapping, 'query_fields');
    console.log({ childNodes });
    console.log({ contentNodes });
    console.log({ meta });
    console.log(rest);
    return (
        <Layout>
            <BlogPostTitleArea
                // TODO: Pull real image once available
                // articleImage={meta['atf-image']}
                articleImage={ARTICLE_PLACEHOLDER}
                author={meta.author}
                // TODO: Get author image from the parser
                authorImage={meta.authorImage || ARTICLE_PLACEHOLDER}
                breadcrumb={[
                    { label: 'Home', target: '/' },
                    { label: 'Learn', target: '/learn' },
                    { label: 'Quick Start', target: '#' },
                ]}
                originalDate={meta.pubdate}
                tags={[...meta.tags, ...meta.languages, ...meta.products]}
                title={articleTitle}
            />

            <section>
                <DocumentBody
                    pageNodes={contentNodes}
                    slugTitleMapping={slugTitleMapping}
                    {...rest}
                />
            </section>
            <footer>
                <ul>
                    {meta.related.map(rel => (
                        <li key={rel}>{rel}</li>
                    ))}
                </ul>
            </footer>
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
