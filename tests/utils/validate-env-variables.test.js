import { validateEnvVariables } from '../../src/utils/setup/validate-env-variables';

it('should properly require specific environment variables at build-time', () => {
    const oldEnv = process.env;
    process.env = {
        ...oldEnv,
    };

    // jest requires the test function to be wrapped, otherwise the error is not caught
    expect(() => {
        validateEnvVariables();
    }).toThrow();

    process.env.GATSBY_SITE = 'devhub';
    process.env.GATSBY_PARSER_USER = 'test-user';
    // Should throw unless all three env vars are set
    // GATSBY_SITE, GATSBY_PARSER_USER, GATSBY_PARSER_BRANCH
    expect(() => {
        validateEnvVariables();
    }).toThrow();

    process.env.GATSBY_PARSER_BRANCH = 'test-branch';
    expect(() => {
        validateEnvVariables();
    }).not.toThrow();

    process.env = oldEnv;
});
