import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import CardList from '../components/dev-hub/card-list';
import HeroBanner from '../components/dev-hub/hero-banner';
import Layout from '../components/dev-hub/layout';
import { H2, H3, P, P3 } from '../components/dev-hub/text';
import {
    gradientMap,
    layer,
    screenSize,
    size,
    colorMap,
    fontSize,
} from '../components/dev-hub/theme';
import { createShadowElement } from '../components/dev-hub/utils';

const BYLINE_HEIGHT_OFFSET = 6;
const BYLINE_IMAGE_HEIGHT = 50;

const toTitleCase = css`
    text-transform: capitalize;
`;

const SubHead = styled(P3)`
    color: ${colorMap.greyLightThree};
    letter-spacing: 1px;
    line-height: 1;
    text-transform: uppercase;
`;

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
const AuthorName = styled('div')`
    ${P3} {
        color: ${colorMap.greyLightThree};
    }

    ${H2} {
        font-size: ${fontSize.xlarge};
    }
`;

const AuthorByline = styled('div')`
    display: flex;
    flex-direction: row;
    justify-content: start;
`;

const AuthorHero = styled('div')`
    display: flex;
    flex-direction: row;
`;

const ArticleContent = styled('article')`
    padding: 80px ${size.xxlarge};
    @media ${screenSize.upToLarge} {
        padding: ${size.large} ${size.medium};
    }
`;

const constructArticles = data =>
    data.reduce(
        (accum, item) => accum.concat({ ...item.query_fields, _id: item._id }),
        []
    );

const Tag = props => {
    const {
        pageContext: {
            bio,
            pages,
            author_image,
            location,
            name,
            slug,
            title,
            type,
        },
    } = props;
    const isAuthor = type === 'author';
    const articles = constructArticles(pages);
    const capitalizedBreadcrumb = name.charAt(0).toUpperCase() + name.slice(1);
    return (
        <Layout>
            <HeroBanner
                breadcrumb={[
                    { label: 'Home', to: '/' },
                    { label: 'Learn', to: '/learn' },
                    { label: capitalizedBreadcrumb, to: slug },
                ]}
            >
                {!isAuthor && (
                    <>
                        <SubHead bold>Tagged In</SubHead>
                        <H2 css={toTitleCase}>{name}</H2>
                    </>
                )}
                {isAuthor && (
                    <AuthorHero>
                        <AuthorByline>
                            <AuthorImage>
                                <img src={author_image} alt={name} />
                            </AuthorImage>
                            <AuthorName>
                                <H2>{name}</H2>
                                {title && location && (
                                    <P>
                                        {title} - {location}
                                    </P>
                                )}
                            </AuthorName>
                        </AuthorByline>
                        {bio && <P>{bio}</P>}
                    </AuthorHero>
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
                languages: PropTypes.arrayOf(PropTypes.string),
                tags: PropTypes.arrayOf(PropTypes.string),
            }),
        }),
        // TODO: Some of these fields are not yet part of author's data (ex: bio, location, title)
        author_image: PropTypes.string,
        bio: PropTypes.string,
        location: PropTypes.string,
        name: PropTypes.string.isRequired,
        slug: PropTypes.string.isRequired,
        title: PropTypes.string,
        type: PropTypes.string.isRequired,
    }),
};

export default Tag;
