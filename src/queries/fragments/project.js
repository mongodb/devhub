import { graphql } from 'gatsby';

export const featuredGalleryProject = graphql`
    fragment FeaturedGalleryProject on StrapiStudentSpotlightFeatured {
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
`;

export const projectFragment = graphql`
    fragment ProjectFragment on StrapiProjects {
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
`;
