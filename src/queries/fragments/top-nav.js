import { graphql } from 'gatsby';

export const topNavItem = graphql`
    fragment itemFragment on TopNavItem {
        name
        url
        subitems {
            description
            name
            url
        }
    }
`;
