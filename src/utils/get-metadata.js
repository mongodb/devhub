const { execSync } = require('child_process');

const getDatabase = () => {
    if (process.env.SNOOTY_ENV === 'staging') {
        return 'snooty_stage';
    } else if (process.env.SNOOTY_ENV === 'production') {
        return 'snooty_prod';
    }
    return 'snooty_dev';
};

const getGitBranch = () => {
    return execSync('git rev-parse --abbrev-ref HEAD')
        .toString('utf8')
        .replace(/[\n\r\s]+$/, '');
};
/**
 * Get site metadata used to identify this build and query correct documents
 */
const getMetadata = () => ({
    commitHash: process.env.COMMIT_HASH || '',
    database: getDatabase(),
    parserBranch: process.env.GATSBY_PARSER_BRANCH,
    patchId: process.env.PATCH_ID || '',
    project: process.env.GATSBY_SITE,
    snootyBranch: getGitBranch(),
    user: process.env.GATSBY_PARSER_USER,
});

module.exports.getMetadata = getMetadata;
