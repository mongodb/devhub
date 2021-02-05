import React from 'react';
import dlv from 'dlv';
import styled from '@emotion/styled';
import DocumentBody from '~components/DocumentBody';
import { AdditionalProjects, SidebarContent } from '~components/pages/project';
import ArticleShareFooter from '~components/dev-hub/article-share-footer';
import Layout from '~components/dev-hub/layout';
import { grid, screenSize, size } from '~components/dev-hub/theme';
import { useSiteMetadata } from '~hooks/use-site-metadata';
import ProjectTitleArea from '~components/dev-hub/project-title-area';
import SEO from '~components/dev-hub/SEO';
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
    grid-column: 2 / 8;
    padding-left: ${size.small};
    padding-right: ${size.small};
    @media ${screenSize.upToLarge} {
        margin: 0 auto;
    }
`;
const Container = styled('div')`
    ${grid};
    justify-content: center;
`;

const InfoSidebar = styled('div')`
    grid-column: 9 / 12;
`;

const TopPaddedShareProjectCTA = styled(ShareProjectCTA)`
    padding-top: ${size.xlarge};
    padding-bottom: 88px;
`;

const Project = props => {
    const {
        additional_images = [],
        content,
        github_url,
        image,
        name,
        project_link,
        slug,
        students,
        tags,
    } = props.pageContext;
    const childNodes = getContent(dlv(content, 'children', []));
    const { siteUrl } = useSiteMetadata();
    const articleUrl = `${siteUrl}${props.pageContext.slug}`;
    return (
        <Layout>
            <SEO articleTitle={name} />
            <ProjectTitleArea
                // TODO: Clean up src/url difference between Strapi and Snooty
                images={[
                    { src: image.url },
                    ...additional_images.map(i => ({ src: i.url })),
                ]}
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
                    <SidebarContent
                        github_url={github_url}
                        project_link={project_link}
                        students={students}
                        tags={tags}
                    />
                </InfoSidebar>
            </Container>
            <AdditionalProjects excludedProjectName={name} />
            <TopPaddedShareProjectCTA />
            <GithubStudentPack />
        </Layout>
    );
};

export default Project;
