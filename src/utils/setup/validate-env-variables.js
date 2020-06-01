// env variables for building site along with use in front-end
// https://www.gatsbyjs.org/docs/environment-variables/#defining-environment-variables
export const validateEnvVariables = () => {
    // make sure necessary env vars exist
    if (
        !process.env.GATSBY_SITE ||
        !process.env.GATSBY_PARSER_USER ||
        !process.env.GATSBY_PARSER_BRANCH
    ) {
        throw new Error(
            `${process.env.NODE_ENV} requires the variables GATSBY_SITE, GATSBY_PARSER_USER, and GATSBY_PARSER_BRANCH`
        );
    }
};
