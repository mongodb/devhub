import { graphql } from 'gatsby';

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
            slug
            image {
                url
            }
        }
    }
`;
