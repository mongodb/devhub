module.exports = {
    globals: {
        __PATH_PREFIX__: ``,
    },
    verbose: true,
    projects: [
        {
            displayName: 'unit',
            globals: {
                __PATH_PREFIX__: '',
            },
            moduleNameMapper: {
                '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
                    '<rootDir>/__mocks__/fileMock.js',
                '\\.css$': '<rootDir>/__mocks__/styleMock.js',
                '\\$components(.*)$': '<rootDir>/src/components$1',
                '\\$experiments(.*)$': '<rootDir>/src/experiments$1',
                '\\$theme(.*)$': '<rootDir>/src/theme$1',
                '\\$utils(.*)$': '<rootDir>/src/utils$1',
            },
            setupFilesAfterEnv: ['<rootDir>/tests/testSetup.js'],
            snapshotSerializers: ['enzyme-to-json/serializer'],
            testMatch: ['<rootDir>/tests/unit/*.test.js'],
            transform: {
                '^.+\\.jsx?$': `<rootDir>/jest-preprocess.js`,
            },
            transformIgnorePatterns: ['/node_modules/(?!(@leafygreen-ui)/)'],
        },
        {
            displayName: 'utils',
            globals: {
                __PATH_PREFIX__: '',
            },
            testMatch: ['<rootDir>/tests/utils/*.test.js'],
            transform: {
                '^.+\\.jsx?$': `<rootDir>/jest-preprocess.js`,
            },
        },
    ],
};
