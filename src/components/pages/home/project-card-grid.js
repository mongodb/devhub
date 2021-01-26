import React from 'react';
import dlv from 'dlv';
import { useStaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import Grid from '../../dev-hub/grid';
import ProjectCard from '../../dev-hub/project-card';
import { size } from '../../dev-hub/theme';
import { transformProjectStrapiData } from '../../../utils/transform-project-strapi-data';

const GridContainer = styled('div')`
    padding: ${size.medium};
`;

const homeFeaturedProjects = graphql`
    query HomeFeaturedProjects {
        strapiStudentSpotlightFeatured {
            ...FeaturedHomePageProjects
        }
    }
`;

const ProjectCardGrid = () => {
    const data = useStaticQuery(homeFeaturedProjects);
    const projects = dlv(
        data,
        ['strapiStudentSpotlightFeatured', 'FeaturedHomePageProjects'],
        []
    );
    const mappedProjects = projects.map(transformProjectStrapiData);
    return (
        <GridContainer>
            <Grid
                numCols={2}
                layout={{
                    rowSpan: [1],
                    colSpan: [2, 1, 1],
                }}
                rowHeight="250px"
            >
                {mappedProjects.map(project => (
                    <ProjectCard key={project.name} project={project} />
                ))}
            </Grid>
        </GridContainer>
    );
};

export default ProjectCardGrid;
