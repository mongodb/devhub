module.exports = {
    '*.{js}': [
        'npm lint:fix',
        'npm format:fix',
        'git add',
        'npm test --bail --findRelatedTests --coverage=false ',
    ],
    '*.json': ['npm format:fix', 'git add'],
    '*.css': ['npm format:fix', 'git add'],
};
