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
                '\\~components(.*)$': '<rootDir>/src/components$1',
                '\\~hooks(.*)$': '<rootDir>/src/hooks$1',
                '\\~images(.*)$': '<rootDir>/src/images$1',
                '\\~pages(.*)$': '<rootDir>/src/pages$1',
                '\\~src(.*)$': '<rootDir>/src$1',
                '\\~utils(.*)$': '<rootDir>/src/utils$1',
            },
            setupFilesAfterEnv: ['<rootDir>/tests/testSetup.js'],
            snapshotSerializers: ['enzyme-to-json/serializer'],
            testMatch: ['<rootDir>/tests/unit/*.test.js'],
            transform: {
                '^.+\\.jsx?$': `<rootDir>/jest-preprocess.js`,
                '^.+\\.(ts|tsx)$': 'ts-jest',
            },
            transformIgnorePatterns: ['/node_modules/(?!(@leafygreen-ui)/)'],
        },
        {
            displayName: 'utils',
            globals: {
                __PATH_PREFIX__: '',
            },
            moduleNameMapper: {
                '\\~components(.*)$': '<rootDir>/src/components$1',
                '\\~hooks(.*)$': '<rootDir>/src/hooks$1',
                '\\~images(.*)$': '<rootDir>/src/images$1',
                '\\~pages(.*)$': '<rootDir>/src/pages$1',
                '\\~src(.*)$': '<rootDir>/src$1',
                '\\~utils(.*)$': '<rootDir>/src/utils$1',
            },
            testMatch: ['<rootDir>/tests/utils/*.test.js'],
            transform: {
                '^.+\\.jsx?$': `<rootDir>/jest-preprocess.js`,
                '^.+\\.(ts|tsx)$': 'ts-jest',
            },
        },
        {
            displayName: 'hooks',
            globals: {
                __PATH_PREFIX__: '',
            },
            testMatch: ['<rootDir>/tests/hooks/*.test.js'],
            transform: {
                '^.+\\.jsx?$': `<rootDir>/jest-preprocess.js`,
                '^.+\\.(ts|tsx)$': 'ts-jest',
            },
        },
    ],
};
