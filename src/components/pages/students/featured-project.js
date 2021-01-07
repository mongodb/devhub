import React from 'react';
import dlv from 'dlv';
import { useStaticQuery, graphql } from 'gatsby';
import styled from '@emotion/styled';
import { transformProjectStrapiData } from '~utils/transform-project-strapi-data';

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
    console.log(project);
    const featuredProjectObject = transformProjectStrapiData(project);
    return <div>{featuredProjectObject.name}</div>;
};

export default FeaturedProject;
