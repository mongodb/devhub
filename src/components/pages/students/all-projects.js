import React, { useMemo } from 'react';
import dlv from 'dlv';
import styled from '@emotion/styled';
import { useStaticQuery, graphql } from 'gatsby';
import Grid from '~components/dev-hub/grid';
import Paginate from '~components/dev-hub/paginate';
import ProjectCard from '~components/dev-hub/project-card';
import { H3 } from '~components/dev-hub/text';
import { screenSize, size } from '~components/dev-hub/theme';
import { transformProjectStrapiData } from '~utils/transform-project-strapi-data';

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
    @media ${screenSize.upToLarge} {
        padding-bottom: ${size.large};
        padding-top: ${size.large};
    }
`;

const TitleWithBottomPadding = styled(H3)`
    padding-bottom: ${size.large};
    @media ${screenSize.upToLarge} {
        padding-bottom: ${size.mediumLarge};
    }
`;

const AllProjects = () => {
    const gridLayout = useMemo(
        () => ({ rowSpan: [1], colSpan: [2, 1, 1, 1, 1, 1, 2] }),
        []
    );
    const mobileGridLayout = useMemo(
        () => ({ rowSpan: [1], colSpan: [2, 1, 1] }),
        []
    );
    const data = useStaticQuery(allGalleryProjects);
    const projects = dlv(data, ['allStrapiProjects', 'nodes'], []);
    const mappedProjects = useMemo(
        () => projects.map(transformProjectStrapiData),
        [projects]
    );
    const gridProps = {
        gridGap: '48px',
        mobileNumCols: 2,
        numCols: 3,
        layout: gridLayout,
        mobileLayout: mobileGridLayout,
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
