import { useStaticQuery, graphql } from 'gatsby';

export const useSiteMetadata = () => {
    const { site } = useStaticQuery(
        graphql`
            query SiteMetaData {
                site {
                    siteMetadata {
                        commitHash
                        database
                        parserBranch
                        parserUser
                        patchId
                        project
                        snootyBranch
                        title
                        user
                        siteUrl
                    }
                }
            }
        `
    );
    return site.siteMetadata;
};
