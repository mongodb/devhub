export const transformProjectStrapiData = project => {
    const result = {
        image_url: project.info.image.url,
        ...project.info,
    };
    result.languages = result.languages.map(l => l.language);
    result.products = result.products.map(p => p.product);
    result.tags = result.tags.map(t => t.tag);
    result.students = [];
    project.students.forEach(student => {
        result.students.push({
            image_url: student.bio.image.url,
            ...student.bio,
        });
    });
    return result;
};
