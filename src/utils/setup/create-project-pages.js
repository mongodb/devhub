import { projects } from '../../queries/projects';

export const createProjectPages = async (createPage, graphql) => {
    const projectList = await graphql(projects);
    const data = projectList.data;
    const contents = data.info.contents;
    console.log(data, contents);
};
