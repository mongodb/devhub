import React, { useMemo } from 'react';
import dlv from 'dlv';
import { useStaticQuery, graphql } from 'gatsby';
import Grid from '~components/dev-hub/grid';
import ProjectCard from '~components/dev-hub/project-card';
import { transformProjectStrapiData } from '~utils/transform-project-strapi-data';

const allProjects = graphql`
    query AllProjects {
        allStrapiProjects {
            nodes {
                ...ProjectFragment
            }
        }
    }
`;
const GRID_ROW_HEIGHT = '282px';
const AdditionalProjects = ({ excludedProjectName, ...props }) => {
    const data = useStaticQuery(allProjects);
    const projects = dlv(data, ['allStrapiProjects', 'nodes'], []);
    const mappedProjects = useMemo(
        () =>
            projects
                .filter(p => p.name !== excludedProjectName)
                .slice(0, 4)
                .map(transformProjectStrapiData),
        [projects, excludedProjectName]
    );
    const gridLayout = useMemo(() => ({ rowSpan: [1], colSpan: [1] }), []);
    const gridProps = {
        gridGap: '48px',
        rowHeight: GRID_ROW_HEIGHT,
        numCols: 4,
        layout: gridLayout,
    };
    return (
        <div {...props}>
            <p collapse>All Projects</p>
            <Grid {...gridProps}>
                {mappedProjects.map(project => (
                    <ProjectCard key={project.name} project={project} />
                ))}
            </Grid>
        </div>
    );
};

export default AdditionalProjects;
