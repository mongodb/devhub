import React from 'react';
import dlv from 'dlv';
import { useStaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import Grid from '~components/dev-hub/grid';
import ProjectCard from '~components/dev-hub/project-card';
import { size } from '~components/dev-hub/theme';
import { transformProjectStrapiData } from '~utils/transform-project-strapi-data';
import Link from '~src/components/Link';

const GalleryLink = styled(Link)`
    color: ${({ theme }) => theme.colorMap.devWhite};
    padding-top: ${size.default};
`;

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
            <GalleryLink tertiary to="/academia/students/">
                See More Student Projects
            </GalleryLink>
        </GridContainer>
    );
};

export default ProjectCardGrid;
