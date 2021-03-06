import { graphql } from 'gatsby';

export const featuredGalleryProject = graphql`
    fragment FeaturedGalleryProject on StrapiStudentSpotlightFeatured {
        FeaturedGalleryProject {
            name
            students {
                name
                bio {
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
                name
                bio {
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

export const featuredEntryPageProjects = graphql`
    fragment FeaturedEntryPageProjects on StrapiStudentSpotlightFeatured {
        FeaturedEntryPageProjects {
            name
            students {
                name
                bio {
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
        github_url
        project_link
        students {
            name
            bio {
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
