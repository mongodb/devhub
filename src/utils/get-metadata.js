const userInfo = require('os').userInfo;
const { getGitBranch } = require('./get-git-branch');
const { getDatabase } = require('./get-database');

const runningEnv = process.env.NODE_ENV || 'production';

require('dotenv').config({
    path: `.env.${runningEnv}`,
});

const getMetadata = () => ({
    commitHash: process.env.COMMIT_HASH || '',
    database: getDatabase(),
    parserBranch: process.env.GATSBY_PARSER_BRANCH,
    project: process.env.GATSBY_SITE,
    snootyBranch: getGitBranch(),
    user: userInfo().username,
});

module.exports.getMetadata = getMetadata;
