import path from 'path';
import { projects } from '../../queries/projects';
import remark from 'remark';
import gfm from 'remark-gfm';

export const createProjectPages = async (createPage, graphql) => {
    const projectList = await graphql(projects);
    const data = projectList.data;
    const info = data.allStrapiProjects.nodes[0].info;
    const contents = info.contents;
    const ast = remark().use(gfm).parse(contents);
    createPage({
        path: '/project',
        component: path.resolve(`./src/templates/project.js`),
        context: {
            slug: '/project',
            content: ast,
            tags: {
                products: info.products,
                languages: info.languages,
                tags: info.tags,
            },
            name: info.name,
        },
    });
};
