import React from 'react';
import dlv from 'dlv';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import DocumentBody from '../components/DocumentBody';
import ArticleShareFooter from '../components/dev-hub/article-share-footer';
import BlogPostTitleArea from '../components/dev-hub/blog-post-title-area';
import Layout from '../components/dev-hub/layout';
import RelatedArticles from '../components/dev-hub/related-articles';
import { screenSize, size } from '../components/dev-hub/theme';
import SEOComponent from '../components/dev-hub/SEO';
import ArticleSeries from '../components/dev-hub/article-series';
import { getTagLinksFromMeta } from '../utils/get-tag-links-from-meta';
import { getTagPageUriComponent } from '../utils/get-tag-page-uri-component';
import { toDateString } from '../utils/format-dates';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import ShareMenu from '../components/dev-hub/share-menu';
import ContentsMenu from '../components/dev-hub/contents-menu';
import { addTrailingSlashIfMissing } from '../utils/add-trailing-slash-if-missing';
import ArticleSchema from '../components/dev-hub/article-schema';

const dateFormatOptions = {
    month: 'short',
    day: '2-digit',
    year: 'numeric',
    timeZone: 'UTC',
};

const ArticleContent = styled('article')`
    max-width: ${size.maxContentWidth};
    padding-left: ${size.small};
    padding-right: ${size.small};
    @media ${screenSize.upToLarge} {
        margin: 0 auto;
    }
`;
const Icons = styled('div')`
    margin: ${size.tiny} ${size.default};
    span {
        padding: 0 ${size.tiny};
    }
    @media ${screenSize.largeAndUp} {
        display: flex;
        flex-direction: column;
        span:not(:first-of-type) {
            margin-top: ${size.small};
        }
    }
    @media ${screenSize.upToLarge} {
        margin: 0 ${size.small};
        span:not(:first-of-type) {
            margin-left: ${size.small};
        }
    }
`;
const Container = styled('div')`
    margin: 0 auto;
    @media ${screenSize.largeAndUp} {
        display: flex;
        justify-content: center;
    }
`;
const StrapiArticle = props => {
    const {
        pageContext: {
            authors = [],
            image,
            languages,
            metadata: { slugToTitle: slugTitleMapping },
            name,
            parsedContent,
            products,
            published_at,
            related_articles = [],
            SEO: {
                canonical_url,
                meta_description,
                og_description,
                og_image,
                og_type,
                og_url,
                twitter_creator,
                twitter_description,
                twitter_image,
            },
            seriesArticles,
            // Clarify and add in type in transform
            slug: thisPage,
            tags,
            type,
            updatedAt,
        },
        ...rest
    } = props;
    const { siteUrl } = useSiteMetadata();
    const childNodes = dlv(parsedContent, 'children', []);
    // TODO: Fix with SEO component
    const twitterNode = {
        twitter_creator,
        description: twitter_description,
        image: twitter_image.url,
    };
    const articleBreadcrumbs = [
        { label: 'Home', target: '/' },
        { label: 'Learn', target: '/learn' },
    ];
    // Add mapping for type in transform
    if (type && type.length) {
        articleBreadcrumbs.push({
            label: type[0].toUpperCase() + type.substring(1),
            target: `/type/${getTagPageUriComponent(type)}`,
        });
    }
    const tagList = getTagLinksFromMeta({ tags, products, languages });
    const articleUrl = addTrailingSlashIfMissing(`${siteUrl}/${thisPage}`);
    // TODO: Fill in
    const headingNodes = [];
    const formattedPublishedDate = toDateString(
        published_at,
        dateFormatOptions
    );
    const formattedUpdatedDate = toDateString(updatedAt, dateFormatOptions);

    // Move into transform
    const articleImage = image.url;

    return (
        <Layout includeCanonical={false}>
            <SEOComponent
                articleTitle={name}
                canonicalUrl={canonical_url}
                image={og_image.url}
                metaDescription={meta_description}
                ogDescription={og_description}
                ogTitle={name}
                ogUrl={og_url || articleUrl}
                twitterNode={null}
                type={og_type}
            />
            <ArticleSchema
                articleUrl={articleUrl}
                title={name}
                description={meta_description}
                publishedDate={published_at}
                modifiedDate={updatedAt}
                imageUrl={articleImage}
                authors={authors}
            />
            <BlogPostTitleArea
                articleImage={articleImage}
                authors={authors}
                breadcrumb={articleBreadcrumbs}
                originalDate={formattedPublishedDate}
                tags={tagList}
                title={name}
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
                        title={name}
                        url={articleUrl}
                        height={size.default}
                        width={size.default}
                    />
                </Icons>
                <ArticleContent>
                    <DocumentBody
                        pageNodes={childNodes}
                        slugTitleMapping={slugTitleMapping}
                        slug={thisPage}
                        {...rest}
                    />
                    <ArticleShareFooter
                        title={name}
                        url={articleUrl}
                        tags={tagList}
                    />
                    <ArticleSeries
                        allSeriesForArticle={seriesArticles}
                        slugTitleMapping={slugTitleMapping}
                        title={name}
                    />
                </ArticleContent>
            </Container>
            <RelatedArticles
                related={related_articles}
                slugTitleMapping={slugTitleMapping}
            />
        </Layout>
    );
};

StrapiArticle.propTypes = {
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

export default StrapiArticle;
