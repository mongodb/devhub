import React, { useMemo } from 'react';
import dlv from 'dlv';
import { useStaticQuery, graphql } from 'gatsby';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import BlogTagList from '~components/dev-hub/blog-tag-list';
import Link from '~components/dev-hub/link';
import AuthorImageList from '~components/dev-hub/author-image-list';
import Badge from '~components/dev-hub/badge';
import Grid from '~components/dev-hub/grid';
import { H5, P } from '~components/dev-hub/text';
import { screenSize, size } from '~components/dev-hub/theme';
import { transformProjectStrapiData } from '~utils/transform-project-strapi-data';
import useMedia from '~src/hooks/use-media';

const bottomBorder = theme => css`
    border-bottom: 1px solid ${theme.colorMap.greyDarkTwo};
`;

const AuthorImageListWithMargin = styled(AuthorImageList)`
    margin-bottom: ${size.large};
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.mediumLarge};
    }
`;

const BottomBorderOnMobile = styled('div')`
    @media ${screenSize.upToLarge} {
        ${({ theme }) => bottomBorder(theme)};
        padding-bottom: ${size.large};
    }
`;

const DescriptionText = styled(P)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    margin-bottom: 48px;
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.mediumLarge};
    }
`;

const FeaturedImage = styled('img')`
    border-radius: ${size.xsmall};
    height: 100%;
    /* Preserve aspect ratio but fill appropriately */
    object-fit: cover;
`;

const GridWithBottomBorder = styled(Grid)`
    ${({ theme }) => bottomBorder(theme)};
    padding-bottom: ${size.xlarge};
    @media ${screenSize.upToLarge} {
        border-bottom: none;
        padding-bottom: ${size.large};
    }
`;

const ProjectName = styled(H5)`
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.xsmall};
    }
`;

const RelativePositionedBadge = styled(Badge)`
    margin-left: 0;
    position: relative;
    width: fit-content;
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.small};
    }
`;

const StyledLink = styled(Link)`
    color: ${({ theme }) => theme.colorMap.devWhite};
    font-weight: bold;
    width: fit-content;
`;

const TagListWithMargin = styled(BlogTagList)`
    margin-bottom: 48px;
    @media ${screenSize.upToLarge} {
        margin-bottom: ${size.mediumLarge};
    }
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
    const isMobile = useMedia(screenSize.upToLarge);
    const ProjectDetails = () => (
        <div>
            <RelativePositionedBadge contentType="featured" />
            <ProjectName>{name}</ProjectName>
            <DescriptionText>{description}</DescriptionText>
            <AuthorImageListWithMargin size={30} students={students} />
            <TagListWithMargin navigates={false} tags={tags} />
            <StyledLink tertiary to={slug}>
                View Project
            </StyledLink>
        </div>
    );
    return (
        <BottomBorderOnMobile>
            <GridWithBottomBorder
                mobileLayout={{ rowSpan: [1], colSpan: [1] }}
                layout={gridLayout}
                gridGap="48px"
                rowHeight="460px"
                mobileNumCols={1}
                mobileGridGap={size.default}
                numCols={3}
            >
                <FeaturedImage src={image_url} />
                {!isMobile && <ProjectDetails />}
            </GridWithBottomBorder>
            {isMobile && <ProjectDetails />}
        </BottomBorderOnMobile>
    );
};

export default FeaturedProject;
