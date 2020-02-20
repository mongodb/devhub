import React from 'react';
import dlv from 'dlv';
import PropTypes from 'prop-types';
import DocumentBody from '../components/DocumentBody';
import BlogPostTitleArea from '../components/dev-hub/blog-post-title-area';
import Layout from '../components/dev-hub/layout';
import Image from '../components/Image';
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
                author={meta.author}
                breadcrumb={[
                    { label: 'Home', target: '#' },
                    { label: 'Quick Start', target: '#' },
                ]}
                originalDate={meta.pubdate}
                tags={[...meta.tags, ...meta.languages, ...meta.products]}
                title={articleTitle}
                image={<Image src={meta['atf-image']} alt={articleTitle} />}
            />
            {/* <header>
                <p>{meta.type}</p>
                <p>{meta.level}</p>
                <p>{meta.languages}</p>
                <p>{meta.products}</p>
                <p>
                    <Image src={meta['atf-image']} alt="" />
                </p>
            </header> */}

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
