import React from 'react';
import { withPrefix } from 'gatsby';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import DocumentBody from '../components/DocumentBody';
import ArticleShareFooter from '../components/dev-hub/article-share-footer';
import BlogPostTitleArea from '../components/dev-hub/blog-post-title-area';
import Layout from '../components/dev-hub/layout';
import RelatedArticles from '../components/dev-hub/related-articles';
import { screenSize, size } from '../components/dev-hub/theme';
import SEO from '../components/dev-hub/SEO';
import ArticleSeries from '../components/dev-hub/article-series';
import { getTagPageUriComponent } from '../utils/get-tag-page-uri-component';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import ShareMenu from '../components/dev-hub/share-menu';
import ContentsMenu from '../components/dev-hub/contents-menu';
import { addTrailingSlashIfMissing } from '../utils/add-trailing-slash-if-missing';

import ArticleSchema from '../components/dev-hub/article-schema';

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
const Article = props => {
    const {
        pageContext: {
            seriesArticles,
            metadata: { slugToTitle: slugTitleMapping },
            article: {
                authors,
                contentAST,
                headingNodes,
                image,
                languages,
                products,
                publishedDate,
                related,
                SEO: { canonicalUrl, metaDescription, og, twitter },
                slug,
                tags,
                title,
                type,
                updatedDate,
            },
        },
        ...rest
    } = props;
    const { siteUrl } = useSiteMetadata();
    const articleBreadcrumbs = [
        { label: 'Home', target: '/' },
        { label: 'Learn', target: '/learn' },
    ];
    if (type && type.length) {
        articleBreadcrumbs.push({
            label: type[0].toUpperCase() + type.substring(1),
            target: `/type/${getTagPageUriComponent(type)}`,
        });
    }
    const tagList = [...products, ...languages, ...tags];
    const articleUrl = addTrailingSlashIfMissing(`${siteUrl}/${slug}`);

    return (
        <Layout includeCanonical={false}>
            <SEO
                articleTitle={title}
                canonicalUrl={canonicalUrl}
                image={og.image}
                metaDescription={metaDescription}
                ogDescription={og.description}
                ogTitle={og.title || title}
                ogUrl={og.url || articleUrl}
                twitter={twitter}
                type={og.type}
            />
            <ArticleSchema
                articleUrl={articleUrl}
                title={title}
                description={metaDescription}
                publishedDate={publishedDate}
                modifiedDate={updatedDate}
                imageUrl={image}
                authors={authors}
            />
            <BlogPostTitleArea
                articleImage={image}
                authors={authors}
                breadcrumb={articleBreadcrumbs}
                originalDate={publishedDate}
                tags={tagList}
                title={title}
                updatedDate={updatedDate}
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
                        title={title}
                        url={articleUrl}
                        height={size.default}
                        width={size.default}
                    />
                </Icons>
                <ArticleContent>
                    <DocumentBody
                        pageNodes={contentAST}
                        slugTitleMapping={slugTitleMapping}
                        slug={slug}
                        {...rest}
                    />
                    <ArticleShareFooter
                        title={title}
                        url={articleUrl}
                        tags={tagList}
                    />
                    <ArticleSeries
                        allSeriesForArticle={seriesArticles}
                        slugTitleMapping={slugTitleMapping}
                        title={title}
                    />
                </ArticleContent>
            </Container>
            <RelatedArticles
                related={related}
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
