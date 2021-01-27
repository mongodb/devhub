import React from 'react';
import dlv from 'dlv';
import styled from '@emotion/styled';
import DocumentBody from '~components/DocumentBody';
import { Students } from '~components/pages/project';
import ArticleShareFooter from '~components/dev-hub/article-share-footer';
import Layout from '~components/dev-hub/layout';
import { screenSize, size } from '~components/dev-hub/theme';
import { useSiteMetadata } from '~hooks/use-site-metadata';
import ProjectTitleArea from '~components/dev-hub/project-title-area';
import {
    GithubStudentPack,
    ShareProjectCTA,
} from '~components/dev-hub/student-spotlight';

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
    grid-column: span 6;
    padding-left: ${size.small};
    padding-right: ${size.small};
    @media ${screenSize.upToLarge} {
        margin: 0 auto;
    }
`;
const Container = styled('div')`
    max-width: 996px;
    margin: 0 auto;
    @media ${screenSize.largeAndUp} {
        display: grid;
        grid-template-columns: repeat(10, 1fr);
        column-gap: 24px;
        justify-content: center;
    }
`;

const InfoSidebar = styled('div')`
    grid-column: 8 / 11;
`;

const TopPaddedShareProjectCTA = styled(ShareProjectCTA)`
    padding-top: ${size.xlarge};
    padding-bottom: 88px;
`;

const Project = props => {
    const { content, image, name, slug, students } = props.pageContext;
    const childNodes = getContent(dlv(content, 'children', []));
    const { siteUrl } = useSiteMetadata();
    const articleUrl = `${siteUrl}${props.pageContext.slug}`;
    return (
        <Layout>
            <ProjectTitleArea
                images={[{ src: image.url, caption: name }]}
                title={name}
            />
            <Container>
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
                <InfoSidebar>
                    <Students students={students} />
                </InfoSidebar>
            </Container>
            <TopPaddedShareProjectCTA />
            <GithubStudentPack />
        </Layout>
    );
};

export default Project;
