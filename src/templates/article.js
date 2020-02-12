import React from 'react';
import dlv from 'dlv';
import PropTypes from 'prop-types';
import DocumentBody from '../components/DocumentBody';
import Layout from '../components/dev-hub/layout';
import Image from '../components/Image';

const getContent = nodes => {
    return nodes.filter(node => node.type === 'section');
};

const Article = props => {
    const {
        pageContext: {
            __refDocMapping,
            metadata: { slugToTitle: slugTitleMapping },
        },
        ...rest
    } = props;
    const childNodes = dlv(__refDocMapping, 'ast.children');
    const contentNodes = getContent(childNodes);
    const meta = dlv(__refDocMapping, 'query_fields');
    console.log({ contentNodes });
    console.log({ meta });
    return (
        <Layout>
            <header>
                <p>{meta.author}</p>
                <ul>
                    {meta.tags.map(tag => (
                        <li key={tag}>{tag}</li>
                    ))}
                </ul>
                <p>{meta.type}</p>
                <p>{meta.level}</p>
                <p>{meta.languages}</p>
                <p>{meta.products}</p>
                <p>
                    <Image src={meta['atf-image']} alt="" />
                </p>
            </header>
            <DocumentBody
                pageNodes={contentNodes}
                slugTitleMapping={slugTitleMapping}
                {...rest}
            />
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
