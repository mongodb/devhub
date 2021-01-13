import React from 'react';
import dlv from 'dlv';
import styled from '@emotion/styled';
import DocumentBody from '../components/DocumentBody';
import ArticleShareFooter from '../components/dev-hub/article-share-footer';
import Layout from '../components/dev-hub/layout';
import { screenSize, size } from '../components/dev-hub/theme';
import { findSectionHeadings } from '../utils/find-section-headings';
import { useSiteMetadata } from '../hooks/use-site-metadata';
import ShareMenu from '../components/dev-hub/share-menu';
import ContentsMenu from '../components/dev-hub/contents-menu';
import ProjectTitleArea from '~components/dev-hub/project-title-area';

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

const Project = props => {
    const { content, name, slug } = props.pageContext;
    const childNodes = getContent(dlv(content, 'children', []));
    const { siteUrl } = useSiteMetadata();
    const articleUrl = `${siteUrl}${props.pageContext.slug}`;

    const headingNodes = findSectionHeadings(
        childNodes,
        'type',
        'heading',
        1,
        -1
    );
    return (
        <Layout>
            <Container>
                <ProjectTitleArea />
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
                        slug={slug}
                        {...props}
                    />
                    <ArticleShareFooter
                        title={name}
                        url={articleUrl}
                        tags={[]}
                    />
                </ArticleContent>
            </Container>
        </Layout>
    );
};

export default Project;
