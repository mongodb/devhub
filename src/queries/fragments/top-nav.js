import { graphql } from 'gatsby';

export const topNavItem = graphql`
    fragment topNavItem on StrapiTopNavItems {
        name
        url
        subitems {
            description
            name
            url
        }
    }
`;
