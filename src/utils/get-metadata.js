const { execSync } = require('child_process');
const userInfo = require('os').userInfo;

const getDatabase = env => {
    switch (env) {
        case 'staging':
            return 'snooty_stage';
        case 'production':
            return 'snooty_prod';
        default:
            return 'snooty_dev';
    }
};

const gitBranch = execSync('git rev-parse --abbrev-ref HEAD')
    .toString('utf8')
    .replace(/[\n\r\s]+$/, '');

/**
 * Get site metadata used to identify this build and query correct documents
 */
const getMetadata = () => ({
    commitHash: process.env.COMMIT_HASH || '',
    database: getDatabase(process.env.SNOOTY_ENV),
    parserBranch: process.env.GATSBY_PARSER_BRANCH,
    parserUser:
        process.env.GATSBY_PARSER_CI_USER || process.env.GATSBY_PARSER_USER,
    patchId: process.env.PATCH_ID || '',
    pathPrefix: process.env.PATH_PREFIX,
    project: process.env.GATSBY_SITE,
    snootyBranch: gitBranch,
    user: process.env.GATSBY_PARSER_CI_USER || userInfo().username,
});

module.exports.getMetadata = getMetadata;
