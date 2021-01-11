import React from 'react';
import dlv from 'dlv';
import { useStaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import Link from '~components/dev-hub/link';
import AuthorImageList from '~components/dev-hub/author-image-list';
import Badge from '~components/dev-hub/badge';
import MediaBlock from '~components/dev-hub/media-block';
import { H5, P } from '~components/dev-hub/text';
import { size } from '~components/dev-hub/theme';
import { transformProjectStrapiData } from '~utils/transform-project-strapi-data';

const RelativePositionedBadge = styled(Badge)`
    margin-left: 0;
    position: relative;
    width: fit-content;
`;

const DescriptionText = styled(P)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
`;

const FeaturedImage = styled('img')`
    border-radius: ${size.xsmall};
`;

const galleryFeaturedProject = graphql`
    query GalleryFeaturedProject {
        allStrapiStudentSpotlightFeatured {
            nodes {
                ...FeaturedGalleryProject
            }
        }
    }
`;

const FeaturedProject = () => {
    const data = useStaticQuery(galleryFeaturedProject);
    const project = dlv(
        data,
        [
            'allStrapiStudentSpotlightFeatured',
            'nodes',
            0,
            'FeaturedGalleryProject',
        ],
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
        <MediaBlock
            mediaComponent={<FeaturedImage src={image_url} />}
            mediaWidth="66%"
        >
            <RelativePositionedBadge contentType="featured" />
            <H5>{name}</H5>
            <DescriptionText>{description}</DescriptionText>
            <AuthorImageList size={30} students={students} />
            <Link tertiary to={slug}>
                View Project
            </Link>
        </MediaBlock>
    );
};

export default FeaturedProject;
