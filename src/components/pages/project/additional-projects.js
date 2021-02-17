import React, { useMemo } from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import dlv from 'dlv';
import { useStaticQuery, graphql } from 'gatsby';
import Grid from '~components/dev-hub/grid';
import ProjectCard from '~components/dev-hub/project-card';
import { H4 } from '~components/dev-hub/text';
import { grid, size } from '~components/dev-hub/theme';
import { transformProjectStrapiData } from '~utils/transform-project-strapi-data';
import Button from '~components/dev-hub/button';

const GRID_COL_GAP = '24px';
const GRID_LAYOUT = { rowSpan: [1], colSpan: [1] };
const GRID_ROW_HEIGHT = '282px';
const MOBILE_GRID_LAYOUT = { rowSpan: [1], colSpan: [1] };
const NUM_ADDITIONAL_PROJECTS = 4;

// Limit is NUM_ADDITIONAL_PROJECTS + 1, but no interpolation in gql queries
const allProjects = graphql`
    query AllProjects {
        allStrapiProjects(limit: 5) {
            nodes {
                ...ProjectFragment
            }
        }
    }
`;
const fullLength = css`
    grid-column: span 12;
`;

const AdditionalProjectsContainer = styled('div')`
    background-color: ${({ theme }) => theme.colorMap.devBlack};
    padding-top: 42px;
`;

const ButtonWithMargin = styled(Button)`
    margin: 48px 0px;
`;

const Centered = styled('div')`
    display: flex;
    justify-content: center;
`;

const FullLengthGrid = styled(Grid)`
    ${fullLength};
`;

const GridContainer = styled('div')`
    ${grid};
`;

const TitleWithBottomPadding = styled(H4)`
    padding-bottom: ${size.large};
    ${fullLength};
`;

const AdditionalProjects = ({ excludedProjectName }) => {
    const data = useStaticQuery(allProjects);
    const projects = dlv(data, ['allStrapiProjects', 'nodes'], []);
    const mappedProjects = useMemo(
        () =>
            projects
                // Don't include the current project in the related ones
                .filter(p => p.name !== excludedProjectName)
                // Be sure to only have 4 projects total
                .slice(0, NUM_ADDITIONAL_PROJECTS)
                .map(transformProjectStrapiData),
        [projects, excludedProjectName]
    );
    return (
        <AdditionalProjectsContainer>
            <GridContainer>
                <TitleWithBottomPadding collapse>
                    Explore more Student Spotlights
                </TitleWithBottomPadding>
                <FullLengthGrid
                    gridGap={GRID_COL_GAP}
                    layout={GRID_LAYOUT}
                    mobileLayout={MOBILE_GRID_LAYOUT}
                    mobileNumCols={2}
                    numCols={NUM_ADDITIONAL_PROJECTS}
                    rowHeight={GRID_ROW_HEIGHT}
                >
                    {mappedProjects.map(project => (
                        <ProjectCard key={project.name} project={project} />
                    ))}
                </FullLengthGrid>
            </GridContainer>
            <Centered>
                <ButtonWithMargin secondary to="/academia/students">
                    See All
                </ButtonWithMargin>
            </Centered>
        </AdditionalProjectsContainer>
    );
};

export default AdditionalProjects;
