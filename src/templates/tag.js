import React from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';
import CardList from '../components/dev-hub/card-list';
import HeroBanner from '../components/dev-hub/hero-banner';
import Layout from '../components/dev-hub/layout';
import { H2, H3, P } from '../components/dev-hub/text';
import {
    gradientMap,
    layer,
    screenSize,
    size,
} from '../components/dev-hub/theme';
import { createShadowElement } from '../components/dev-hub/utils';

const BYLINE_HEIGHT_OFFSET = 6;
const BYLINE_IMAGE_HEIGHT = 50;

const AuthorImage = styled('div')`
    @media ${screenSize.upToMedium} {
      display: none;
    }
    height: ${BYLINE_IMAGE_HEIGHT}px;
    margin-right: ${size.medium};
    position: relative;
    z-index: ${layer.front};
    > img {
        border-radius: 50%;
        height: ${BYLINE_IMAGE_HEIGHT}px;
    }
    &:before {
        ${createShadowElement(
            gradientMap.greenTealOffset,
            size.large,
            0,
            -BYLINE_HEIGHT_OFFSET
        )}
        height: ${BYLINE_IMAGE_HEIGHT + BYLINE_HEIGHT_OFFSET}px;
        width: ${BYLINE_IMAGE_HEIGHT + BYLINE_HEIGHT_OFFSET}px;
    }

`;
const AuthorByline = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: start;
`;

const ArticleContent = styled('article')`
    margin: 0 auto;
    max-width: ${size.maxContentWidth};
    padding-left: ${size.small};
    padding-right: ${size.small};
`;

const constructArticles = data =>
    data.reduce((accum, item) => accum.push({ ...item.query_fields }), []);

const Tag = props => {
    const {
        pageContext: {
            pages,
            author_image,
            name,
            // slug,
            type,
        },
    } = props;
    const isAuthor = type === 'author';
    const articles = constructArticles(pages);
    console.log('props: ', props);
    return (
        <Layout>
            <HeroBanner
                breadcrumb={[
                    { label: 'Home', to: '/' },
                    { label: 'Learn', to: '/learn' },
                ]}
            >
                {!isAuthor && (
                    <div>
                        <P>Tagged in</P>
                        <H2>{name}</H2>
                    </div>
                )}
                {isAuthor && (
                    <AuthorByline>
                        <AuthorImage>
                            <img src={author_image} alt={name} />
                        </AuthorImage>
                        <H2>{name}</H2>
                    </AuthorByline>
                )}
            </HeroBanner>

            <ArticleContent>
                {isAuthor && <H3>Articles by {name}</H3>}
                <CardList items={articles} />
            </ArticleContent>
        </Layout>
    );
};

Tag.propTypes = {
    pageContext: PropTypes.shape({
        pages: PropTypes.arrayOf({
            query_field: PropTypes.shape({
                author: PropTypes.string,
                // below prop comes back as 'atf-image'
                // from RST. Writing it in PropTypes in this casing
                // will throw an error
                atf_image: PropTypes.string,
                languages: PropTypes.arrayOf(PropTypes.string),
                tags: PropTypes.arrayOf(PropTypes.string),
            }),
        }),
        author_image: PropTypes.string,
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired,
    }),
};

export default Tag;
