import React from 'react';
import { Helmet } from 'react-helmet';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import PropTypes from 'prop-types';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import AuthorHeroBackground from '../images/1x/author-hero-background.png';
import TagBackground from '../images/1x/tag-background.png';
import ComponentFactory from '../components/ComponentFactory';
import AuthorImage from '../components/dev-hub/author-image';
import CardList from '../components/dev-hub/card-list';
import HeroBanner from '../components/dev-hub/hero-banner';
import Layout from '../components/dev-hub/layout';
import { H2, H3, P, P3 } from '../components/dev-hub/text';
import {
    screenSize,
    size,
    colorMap,
    fontSize,
} from '../components/dev-hub/theme';

const toTitleCase = css`
    text-transform: capitalize;
`;

const SubHead = styled(P3)`
    color: ${colorMap.greyLightThree};
    letter-spacing: 1px;
    line-height: 1;
    text-transform: uppercase;
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

const SyledAuthorImage = styled(AuthorImage)`
    margin-right: ${size.medium};
`;

const constructArticles = data =>
    data.reduce(
        (accum, article) =>
            accum.concat({ ...article.query_fields, _id: article._id }),
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
    const metadata = useSiteMetadata();
    const isAuthor = type === 'author';
    const articles = constructArticles(pages);
    const capitalizedBreadcrumb = name.charAt(0).toUpperCase() + name.slice(1);
    return (
        <Layout>
            <Helmet>
                <title>
                    {name} - {metadata.title}
                </title>
                {!isAuthor && <meta name="robots" content="noindex" />}
            </Helmet>
            <HeroBanner
                breadcrumb={[
                    { label: 'Home', to: '/' },
                    { label: 'Learn', to: '/learn' },
                    { label: capitalizedBreadcrumb, to: slug },
                ]}
                collapse
                background={isAuthor ? AuthorHeroBackground : TagBackground}
                shouldContainBackground={isAuthor}
                showImageOnMobile={false}
            >
                {!isAuthor && (
                    <>
                        <SubHead bold>Tagged In</SubHead>
                        <H2 css={toTitleCase}>{name}</H2>
                    </>
                )}
                {isAuthor && (
                    <div>
                        <AuthorHero>
                            <AuthorByline>
                                <SyledAuthorImage image={author_image} />
                                <AuthorName>
                                    <H2>{name}</H2>
                                    {title && location && (
                                        <P>
                                            {title} - {location}
                                        </P>
                                    )}
                                </AuthorName>
                            </AuthorByline>
                        </AuthorHero>
                        {bio && <ComponentFactory nodeData={bio} />}
                    </div>
                )}
            </HeroBanner>

            <ArticleContent>
                {isAuthor && <H3>Articles by {name}</H3>}
                <CardList articles={articles} />
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
