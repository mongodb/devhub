import { graphql } from 'gatsby';

export const featuredGalleryProject = graphql`
    fragment FeaturedGalleryProject on StrapiStudentSpotlightFeatured {
        FeaturedGalleryProject {
            name
            students {
                bio {
                    name
                    image {
                        url
                    }
                }
            }
            info {
                description
                slug
                image {
                    url
                }
                languages {
                    language
                }
                products {
                    product
                }
                tags {
                    tag
                }
            }
        }
    }
`;

export const featuredHomePageProjects = graphql`
    fragment FeaturedHomePageProjects on StrapiStudentSpotlightFeatured {
        FeaturedHomePageProjects {
            name
            students {
                bio {
                    name
                    image {
                        url
                    }
                }
            }
            info {
                description
                slug
                image {
                    url
                }
                languages {
                    language
                }
                products {
                    product
                }
                tags {
                    tag
                }
            }
        }
    }
`;

export const projectFragment = graphql`
    fragment ProjectFragment on StrapiProjects {
        name
        students {
            bio {
                name
                image {
                    url
                }
            }
        }
        info {
            description
            slug
            image {
                url
            }
            languages {
                language
            }
            products {
                product
            }
            tags {
                tag
            }
        }
    }
`;
