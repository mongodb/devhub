import React from 'react';
import dlv from 'dlv';
import PropTypes from 'prop-types';
import DocumentBody from '../components/DocumentBody';
import Layout from '../components/dev-hub/layout';

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
        nodesWeActuallyWant.push(childNode);
    }

    return nodesWeActuallyWant;
};

const Article = props => {
    const childNodes = getContent(
        dlv(props.pageContext.content, 'children', [])
    );
    return (
        <Layout>
            <DocumentBody
                pageNodes={childNodes}
                slug={props.pageContext.slug}
                {...props}
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
