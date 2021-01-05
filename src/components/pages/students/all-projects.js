import React, { useMemo } from 'react';
import dlv from 'dlv';
import { useStaticQuery, graphql } from 'gatsby';
import { transformProjectStrapiData } from '~utils/transform-project-strapi-data';
import ProjectCard from '~components/dev-hub/project-card';
import Grid from '~components/dev-hub/grid';

const GRID_ROW_HEIGHT = '360px';

const allGalleryProjects = graphql`
    query AllGalleryProjects {
        allStrapiProjects {
            nodes {
                ...ProjectFragment
            }
        }
    }
`;

const AllProjects = () => {
    const gridLayout = useMemo(
        () => ({ rowSpan: [1], colSpan: [2, 1, 1, 1, 1, 1, 2] }),
        []
    );
    const data = useStaticQuery(allGalleryProjects);
    const projects = dlv(data, ['allStrapiProjects', 'nodes'], []);
    const mappedProjects = projects.map(transformProjectStrapiData);
    return (
        <Grid rowHeight={GRID_ROW_HEIGHT} numCols={3} layout={gridLayout}>
            {mappedProjects.map(project => (
                <ProjectCard key={project.name} project={project} />
            ))}
        </Grid>
    );
};

export default AllProjects;
