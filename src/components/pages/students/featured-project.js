import React, { useMemo } from 'react';
import dlv from 'dlv';
import { useStaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import BlogTagList from '~components/dev-hub/blog-tag-list';
import Link from '~components/dev-hub/link';
import AuthorImageList from '~components/dev-hub/author-image-list';
import Badge from '~components/dev-hub/badge';
import Grid from '~components/dev-hub/grid';
import { H5, P } from '~components/dev-hub/text';
import { size } from '~components/dev-hub/theme';
import { transformProjectStrapiData } from '~utils/transform-project-strapi-data';

const AuthorImageListWithMargin = styled(AuthorImageList)`
    margin-bottom: ${size.large};
`;

const DescriptionText = styled(P)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    margin-bottom: 48px;
`;

const FeaturedImage = styled('img')`
    border-radius: ${size.xsmall};
    height: 100%;
    /* Preserve aspect ratio but fill appropriately */
    object-fit: cover;
`;

const GridWithBottomBorder = styled(Grid)`
    border-bottom: 1px solid ${({ theme }) => theme.colorMap.greyDarkTwo};
    padding-bottom: ${size.xlarge};
`;

const RelativePositionedBadge = styled(Badge)`
    margin-left: 0;
    position: relative;
    width: fit-content;
`;

const StyledLink = styled(Link)`
    color: ${({ theme }) => theme.colorMap.devWhite};
`;

const TagListWithMargin = styled(BlogTagList)`
    margin-bottom: 48px;
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
        tags,
    } = transformProjectStrapiData(project);
    return (
        <GridWithBottomBorder
            layout={gridLayout}
            gridGap="48px"
            rowHeight="460px"
            numCols={3}
        >
            <FeaturedImage src={image_url} />
            <div>
                <RelativePositionedBadge contentType="featured" />
                <H5>{name}</H5>
                <DescriptionText>{description}</DescriptionText>
                <AuthorImageListWithMargin size={30} students={students} />
                <TagListWithMargin navigates={false} tags={tags} />
                <StyledLink tertiary to={slug}>
                    View Project
                </StyledLink>
            </div>
        </GridWithBottomBorder>
    );
};

export default FeaturedProject;
