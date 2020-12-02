import { students } from '../../queries/students';

export const createStudentPages = async (createPage, graphql) => {
    const studentList = await graphql(students);
    console.log(studentList);
};
