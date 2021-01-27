import path from 'path';
import { transformProjectStrapiData } from '../transform-project-strapi-data';
import { buildTimeProjects } from '../../queries/projects';
import { parseMarkdownToAST } from './parse-markdown-to-ast';

const createPageForProject = async (project, createPage) => {
    const updatedProject = transformProjectStrapiData(project);
    const {
        contents,
        slug,
        name,
        updatedAt: updated_at,
        ...rest
    } = updatedProject;
    const parsedContent = await parseMarkdownToAST(contents);
    createPage({
        path: slug,
        component: path.resolve(`./src/templates/project.js`),
        context: {
            slug: slug,
            content: parsedContent,
            name,
            updated_at,
            ...rest,
        },
    });
};

const getProjectListFromGraphql = async graphql => {
    const projectResp = await graphql(buildTimeProjects);
    const result = projectResp.data.allStrapiProjects.nodes;
    return result;
};

export const createProjectPages = async (createPage, graphql) => {
    const projectList = await getProjectListFromGraphql(graphql);
    projectList.forEach(
        async project => await createPageForProject(project, createPage)
    );
};
