import React from 'react';
import dlv from 'dlv';
import { useStaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import Button from '../../dev-hub/button';
import Grid from '../../dev-hub/grid';
import ProjectCard from '../../dev-hub/project-card';
import { H5, P } from '../../dev-hub/text';
import { screenSize, size } from '../../dev-hub/theme';
import { transformProjectStrapiData } from '~utils/transform-project-strapi-data';

const SECTION_HORIZONTAL_PADDING = '120px';
const SECTION_VERTICAL_PADDING = '60px';

const CenterButtonContainer = styled('div')`
    display: flex;
    justify-content: center;
`;

const FullWidthBackground = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.devBlack};
    margin: 0 ${size.medium};
    padding-bottom: ${size.xlarge};
    @media ${screenSize.upToMedium} {
        margin: 0;
    }
`;

const GridContainer = styled('div')`
    padding: ${SECTION_VERTICAL_PADDING} ${SECTION_HORIZONTAL_PADDING};
    @media ${screenSize.upToMedium} {
        padding: ${size.large} ${size.default} 48px;
    }
`;

const entryFeaturedProjects = graphql`
    query EntryFeaturedProjects {
        strapiStudentSpotlightFeatured {
            ...FeaturedEntryPageProjects
        }
    }
`;

const ProjectGrid = () => {
    const data = useStaticQuery(entryFeaturedProjects);
    const projects = dlv(
        data,
        ['strapiStudentSpotlightFeatured', 'FeaturedEntryPageProjects'],
        []
    );
    const mappedProjects = projects.map(transformProjectStrapiData);
    return (
        <FullWidthBackground>
            <GridContainer>
                <H5 collapse>See what students are creating with MongoDB.</H5>
                <P>Projects created by students, for students.</P>
                <Grid
                    numCols={4}
                    layout={{
                        rowSpan: [2, 1, 1, 1],
                        colSpan: [2, 2, 1, 1],
                    }}
                    rowHeight="250px"
                >
                    {mappedProjects.map(project => (
                        <ProjectCard key={project.name} project={project} />
                    ))}
                </Grid>
            </GridContainer>
            <CenterButtonContainer>
                <Button secondary to="/academia/students/">
                    See more Student Projects
                </Button>
            </CenterButtonContainer>
        </FullWidthBackground>
    );
};

export default ProjectGrid;
