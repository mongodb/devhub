import React, { useMemo } from 'react';
import dlv from 'dlv';
import { useStaticQuery, graphql } from 'gatsby';
import css from '@emotion/core';
import styled from '@emotion/styled';
import Link from '~components/dev-hub/link';
import AuthorImageList from '~components/dev-hub/author-image-list';
import Badge from '~components/dev-hub/badge';
import Grid from '~components/dev-hub/grid';
import { H5, P } from '~components/dev-hub/text';
import { screenSize, size } from '~components/dev-hub/theme';
import { transformProjectStrapiData } from '~utils/transform-project-strapi-data';

const DescriptionText = styled(P)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
`;

const FeaturedImage = styled('img')`
    border-radius: ${size.xsmall};
`;

const Container = styled('div')``;

const RelativePositionedBadge = styled(Badge)`
    margin-left: 0;
    position: relative;
    width: fit-content;
`;

const galleryFeaturedProject = graphql`
    query GalleryFeaturedProject {
        strapiStudentSpotlightFeatured {
            ...FeaturedGalleryProject
        }
    }
`;

const FeaturedProject = () => {
    const gridLayout = useMemo(() => ({ rowSpan: [1], colSpan: [2, 1] }), []);
    const data = useStaticQuery(galleryFeaturedProject);
    const project = dlv(
        data,
        ['strapiStudentSpotlightFeatured', 'FeaturedGalleryProject'],
        []
    );
    const {
        image_url,
        description,
        name,
        slug,
        students,
    } = transformProjectStrapiData(project);
    return (
        <Grid layout={gridLayout} gridGap="48px" numCols={3}>
            <FeaturedImage src={image_url} />
            <Container>
                <RelativePositionedBadge contentType="featured" />
                <H5>{name}</H5>
                <DescriptionText>{description}</DescriptionText>
                <AuthorImageList size={30} students={students} />
                <Link tertiary to={slug}>
                    View Project
                </Link>
            </Container>
        </Grid>
    );
};

export default FeaturedProject;
