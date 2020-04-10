module.exports = {
    '*.{js, mdx, md}': [
        'npm run lint',
        'npm run format',
        'git add',
        'npm test -- --bail --findRelatedTests --coverage=false ',
    ],
    '*.json': ['npm run format'],
    '*.css': ['npm run format'],
};
