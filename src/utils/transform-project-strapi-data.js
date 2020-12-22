export const transformProjectStrapiData = project => {
    const result = {
        image_url: project.info.image.url,
        ...project.info,
    };
    result.students = [];
    project.students.forEach(student => {
        result.students.push({
            image_url: student.bio.image.url,
            ...student.bio,
        });
    });
    return result;
};
