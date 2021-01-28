import React, { useMemo } from 'react';
import styled from '@emotion/styled';
import dlv from 'dlv';
import { useStaticQuery, graphql } from 'gatsby';
import Grid from '~components/dev-hub/grid';
import ProjectCard from '~components/dev-hub/project-card';
import { H4 } from '~components/dev-hub/text';
import { grid, size } from '~components/dev-hub/theme';
import { transformProjectStrapiData } from '~utils/transform-project-strapi-data';
import Button from '~components/dev-hub/button';

const allProjects = graphql`
    query AllProjects {
        allStrapiProjects {
            nodes {
                ...ProjectFragment
            }
        }
    }
`;
const TitleWithBottomPadding = styled(H4)`
    padding-bottom: ${size.large};
`;
const GRID_ROW_HEIGHT = '282px';
const AdditionalProjectsContainer = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.devBlack};
    padding-top: 42px;
`;
const GridContainer = styled('div')`
    ${grid};
    > * {
        grid-column: span 12;
    }
`;
const Centered = styled('div')`
    display: flex;
    justify-content: center;
    padding: 48px 0px;
`;
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
        <AdditionalProjectsContainer {...props}>
            <GridContainer>
                <TitleWithBottomPadding collapse>
                    Explore more Student Spotlights
                </TitleWithBottomPadding>
                <Grid {...gridProps}>
                    {mappedProjects.map(project => (
                        <ProjectCard key={project.name} project={project} />
                    ))}
                </Grid>
            </GridContainer>
            <Centered>
                <Button secondary to="/academia/students">
                    See All
                </Button>
            </Centered>
        </AdditionalProjectsContainer>
    );
};

export default AdditionalProjects;
