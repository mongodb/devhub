import path from 'path';
import { buildTimeProjects } from '../../queries/projects';
import { parseMarkdownToAST } from './parse-markdown-to-ast';

const createPageForProject = async (project, createPage) => {
    const {
        info: { contents, name, slug, ...otherInfo },
        updatedAt: updated_at,
        ...rest
    } = project;
    const parsedContent = await parseMarkdownToAST(contents);
    createPage({
        path: slug,
        component: path.resolve(`./src/templates/project.js`),
        context: {
            slug: slug,
            content: parsedContent,
            name,
            updated_at,
            ...otherInfo,
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
