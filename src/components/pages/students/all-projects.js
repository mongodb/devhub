import React, { useEffect, useMemo, useState } from 'react';
import dlv from 'dlv';
import styled from '@emotion/styled';
import { useLocation } from '@reach/router';
import { useStaticQuery, graphql } from 'gatsby';
import { transformProjectStrapiData } from '~utils/transform-project-strapi-data';
import { buildQueryString, parseQueryString } from '~utils/query-string';
import ProjectCard from '~components/dev-hub/project-card';
import Button from '~components/dev-hub/button';
import Grid from '~components/dev-hub/grid';
import { H3 } from '~components/dev-hub/text';
import { size } from '~components/dev-hub/theme';

const GRID_ROW_HEIGHT = '360px';
const CARDS_PER_PAGE = 2;

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

const HasMoreButtonContainer = styled('div')`
    margin-bottom: ${size.large};
    margin-top: ${size.large};
    text-align: center;
`;

const TitleWithBottomPadding = styled(H3)`
    padding-bottom: ${size.large};
`;

const AllProjects = () => {
    const { pathname, search } = useLocation();
    const localPage = pathname.replace(__PATH_PREFIX__, '');
    // Build next link, preserving other links
    const nextPageLink = useMemo(() => {
        // Get page if exists from search
        const { page = 1, ...params } = parseQueryString(search);
        // Have to parseInt because string + number gives a string
        const pageNumber = parseInt(page) + 1;
        return localPage + buildQueryString({ page: pageNumber, ...params });
    }, [localPage, search]);

    useEffect(() => {
        const { page = 1 } = parseQueryString(search);
        setVisibleCards(page * CARDS_PER_PAGE);
    }, [search]);
    const { page = 1 } = parseQueryString(search);
    const [visibleCards, setVisibleCards] = useState(page * CARDS_PER_PAGE);
    const gridLayout = useMemo(
        () => ({ rowSpan: [1], colSpan: [2, 1, 1, 1, 1, 1, 2] }),
        []
    );
    const data = useStaticQuery(allGalleryProjects);
    const projects = dlv(data, ['allStrapiProjects', 'nodes'], []);
    const mappedProjects = useMemo(
        () => projects.slice(0, visibleCards).map(transformProjectStrapiData),
        [projects, visibleCards]
    );
    const hasMore = projects.length > visibleCards;
    return (
        <AllProjectsContainer>
            <TitleWithBottomPadding collapse>
                All Projects
            </TitleWithBottomPadding>
            <Grid rowHeight={GRID_ROW_HEIGHT} numCols={3} layout={gridLayout}>
                {mappedProjects.map(project => (
                    <ProjectCard key={project.name} project={project} />
                ))}
            </Grid>
            {hasMore && (
                <HasMoreButtonContainer>
                    <Button secondary pagination to={nextPageLink}>
                        Load more
                    </Button>
                </HasMoreButtonContainer>
            )}
        </AllProjectsContainer>
    );
};

export default AllProjects;
