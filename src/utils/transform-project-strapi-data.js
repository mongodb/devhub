export const transformProjectStrapiData = project => {
    const result = {
        additional_images: project.additional_images,
        github_url: project.github_url,
        name: project.name,
        project_link: project.project_link,
        image_url: project.info.image.url,
        ...project.info,
    };
    const languages = result.languages.map(l => ({ label: l.language }));
    const products = result.products.map(p => ({ label: p.product }));
    const tags = result.tags.map(t => ({ label: t.tag }));
    result.tags = [...products, ...languages, ...tags];
    result.students = [];
    project.students.forEach(student => {
        result.students.push({
            ...student.bio,
            image_url: student.bio.image.url,
            name: student.name || student.bio.name,
        });
    });
    return result;
};
