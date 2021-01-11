import React from 'react';
import dlv from 'dlv';
import { useStaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import Link from '~components/dev-hub/link';
import AuthorImage from '~components/dev-hub/author-image';
import Badge from '~components/dev-hub/badge';
import MediaBlock from '~components/dev-hub/media-block';
import { H5, P } from '~components/dev-hub/text';
import { size } from '~components/dev-hub/theme';
import { transformProjectStrapiData } from '~utils/transform-project-strapi-data';

const AUTHOR_IMAGE_HEIGHT = 30;

const RelativePositionedBadge = styled(Badge)`
    margin-left: 0;
    position: relative;
    width: fit-content;
`;

const AuthorImageContainer = styled('div')`
    display: flex;
`;

const StyledAuthorImage = styled(AuthorImage)`
    margin-right: ${size.small};
    :not(:last-of-type) {
        margin-right: -${size.small};
    }
`;

const DescriptionText = styled(P)`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
`;

const FeaturedImage = styled('img')`
    border-radius: ${size.xsmall};
`;

const AuthorImages = ({ students }) => (
    <AuthorImageContainer>
        {students.map(({ name, image_url }) => (
            <StyledAuthorImage
                gradientOffset={4}
                hideOnMobile={false}
                height={AUTHOR_IMAGE_HEIGHT}
                width={AUTHOR_IMAGE_HEIGHT}
                image={image_url}
                key={name}
            />
        ))}
    </AuthorImageContainer>
);

const galleryFeaturedProject = graphql`
    query GalleryFeaturedProject {
        allStrapiStudentSpotlightFeatured {
            nodes {
                FeaturedGalleryProject {
                    students {
                        bio {
                            name
                            image {
                                url
                            }
                        }
                    }
                    info {
                        name
                        description
                        slug
                        image {
                            url
                        }
                    }
                }
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
            <AuthorImages students={students} />
            <Link tertiary to={slug}>
                View Project
            </Link>
        </MediaBlock>
    );
};

export default FeaturedProject;
