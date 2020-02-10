import React from 'react';
import PropTypes from 'prop-types';
import DocumentBody from '../components/DocumentBody';
import Layout from '../components/dev-hub/layout';

const Article = props => {
    const {
        pageContext: {
            __refDocMapping,
            metadata: { slugToTitle: slugTitleMapping },
        },
        ...rest
    } = props;
    console.log(props);

    return (
        <Layout>
            <DocumentBody
                refDocMapping={__refDocMapping}
                slugTitleMapping={slugTitleMapping}
                {...rest}
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
