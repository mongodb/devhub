import React from 'react';
import dlv from 'dlv';
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
import { getTagLinksFromMeta } from '../utils/get-tag-links-from-meta';
import { getTagPageUriComponent } from '../utils/get-tag-page-uri-component';
import { toDateString } from '../utils/format-dates';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import ShareMenu from '../components/dev-hub/share-menu';
import ContentsMenu from '../components/dev-hub/contents-menu';
import { getNestedValue } from '../utils/get-nested-value';
import { findSectionHeadings } from '../utils/find-section-headings';
import { getNestedText } from '../utils/get-nested-text';

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
    const childNodes = getContent(
        dlv(props.pageContext.content, 'children', [])
    );
    const articleBreadcrumbs = [
        { label: 'Home', target: '/' },
        { label: 'Academia', target: '/academia' },
    ];
    console.log(props, childNodes);
    return (
        <Layout>
            <BlogPostTitleArea
                // articleImage={withPrefix(meta['atf-image'])}
                authors={[{ name: 'Jordan Stapinski' }]}
                breadcrumb={articleBreadcrumbs}
                // originalDate={formattedPublishedDate}
                // tags={tagList}
                title={props.pageContext.name}
                // updatedDate={formattedUpdatedDate}
            />
            <Container>
                <Icons>
                    <ContentsMenu
                        title="Contents"
                        headingNodes={[]}
                        height={size.default}
                        width={size.default}
                    />
                    <ShareMenu
                        title={''}
                        url={''}
                        height={size.default}
                        width={size.default}
                    />
                </Icons>
                <ArticleContent>
                    <DocumentBody
                        pageNodes={childNodes}
                        slug={props.pageContext.slug}
                        {...props}
                    />
                </ArticleContent>
            </Container>
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
