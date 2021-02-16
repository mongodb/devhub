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
        grid-column: 1 / 6;
        margin: 0 auto;
    }
    @media ${screenSize.upToMedium} {
        grid-column: 1 / 5;
    }
`;

const ArticleShareFooterFull = styled(ArticleShareFooter)`
    grid-column: 2 / 12;
    @media ${screenSize.upToLarge} {
        grid-column: 1 / 9;
    }
    @media ${screenSize.upToMedium} {
        grid-column: 1 / 5;
    }
`;

const Container = styled('div')`
    ${grid};
    justify-content: center;
`;

const InfoSidebar = styled('div')`
    grid-column: 9 / 12;
    @media ${screenSize.upToLarge} {
        grid-column: 7 / 9;
    }
    @media ${screenSize.upToMedium} {
        grid-column: 1 / 5;
    }
`;

const TopPaddedShareProjectCTA = styled(ShareProjectCTA)`
    padding-top: ${size.xlarge};
    padding-bottom: 88px;
`;

const Project = props => {
    const {
        additional_images = [],
        content,
        description,
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
    const projectUrl = `${siteUrl}${props.pageContext.slug}`;
    return (
        <Layout>
            <SEO articleTitle={name} />
            <ProjectTitleArea
                description={description}
                // TODO: Clean up src/url difference between Strapi and Snooty
                images={[
                    { src: image.url },
                    ...additional_images.map(i => ({ src: i.url })),
                ]}
                title={name}
                url={projectUrl}
            />
            <Container>
                <ArticleContent>
                    <DocumentBody
                        pageNodes={childNodes}
                        slug={slug}
                        {...props}
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
                <ArticleShareFooterFull
                    title={name}
                    url={projectUrl}
                    tags={[]}
                />
            </Container>
            <AdditionalProjects excludedProjectName={name} />
            <TopPaddedShareProjectCTA />
            <GithubStudentPack />
        </Layout>
    );
};

export default Project;
