import React, { useMemo } from 'react';
import dlv from 'dlv';
import styled from '@emotion/styled';
import { useStaticQuery, graphql } from 'gatsby';
import Grid from '~components/dev-hub/grid';
import Paginate from '~components/dev-hub/paginate';
import ProjectCard from '~components/dev-hub/project-card';
import { H3 } from '~components/dev-hub/text';
import { size } from '~components/dev-hub/theme';
import { transformProjectStrapiData } from '~utils/transform-project-strapi-data';

const GRID_ROW_HEIGHT = '360px';
const PAGINATION_LIMIT = 7;

const allGalleryProjects = graphql`
    query AllGalleryProjects {
        allStrapiProjects {
            nodes {
                ...ProjectFragment
            }
        }
    }
`;

const AllProjectsContainer = styled('div')`
    border-bottom: 1px solid ${({ theme }) => theme.colorMap.greyDarkTwo};
    padding-top: 48px;
    padding-bottom: ${size.xlarge};
`;

const TitleWithBottomPadding = styled(H3)`
    padding-bottom: ${size.large};
`;

const AllProjects = () => {
    const gridLayout = useMemo(
        () => ({ rowSpan: [1], colSpan: [2, 1, 1, 1, 1, 1, 2] }),
        []
    );
    const data = useStaticQuery(allGalleryProjects);
    const projects = dlv(data, ['allStrapiProjects', 'nodes'], []);
    const mappedProjects = useMemo(
        () => projects.map(transformProjectStrapiData),
        [projects]
    );
    const gridProps = {
        rowHeight: GRID_ROW_HEIGHT,
        numCols: 3,
        layout: gridLayout,
    };
    return (
        <AllProjectsContainer>
            <TitleWithBottomPadding collapse>
                All Projects
            </TitleWithBottomPadding>
            <Paginate
                Grid={Grid}
                gridProps={gridProps}
                limit={PAGINATION_LIMIT}
            >
                {mappedProjects.map(project => (
                    <ProjectCard key={project.name} project={project} />
                ))}
            </Paginate>
        </AllProjectsContainer>
    );
};

export default AllProjects;
