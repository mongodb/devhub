import path from 'path';
import { projects } from '../../queries/projects';
import remark from 'remark';

export const createProjectPages = async (createPage, graphql) => {
    const projectList = await graphql(projects);
    const data = projectList.data;
    const contents = data.allStrapiProjects.nodes[0].info.contents;
    const ast = remark.parse(contents);
    createPage({
        path: '/project',
        component: path.resolve(`./src/templates/project.js`),
        context: {
            slug: '/project',
            content: ast,
        },
    });
};
