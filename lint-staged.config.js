module.exports = {
    '*.{js}': [
        'npm run lint:fix',
        'npm run format:fix',
        'git add',
        'npm test --bail --findRelatedTests --coverage=false ',
    ],
    '*.json': ['npm run format:fix', 'git add'],
    '*.css': ['npm run format:fix', 'git add'],
};
