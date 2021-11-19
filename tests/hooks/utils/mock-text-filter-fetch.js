export const JAVA_RESULTS = [
    {
        authors: [],
        description:
            'Learn how to use the Change Streams using the MongoDB Java Driver.',
        languages: [],
        products: [],
        publishDate: undefined,
        slug: undefined,
        image: undefined,
        title: undefined,
        tags: [],
        score: undefined,
        mediaType: undefined,
    },
    {
        authors: [],
        description:
            'Learn how to use the Aggregation Pipeline using the MongoDB Java Driver.',
        languages: [],
        products: [],
        publishDate: undefined,
        slug: undefined,
        image: undefined,
        title: undefined,
        tags: [],
        score: undefined,
        mediaType: undefined,
    },
];

const RAW_NODE_RESULTS = [
    {
        authors: [],
        description:
            'Secure your MongoDB installation by allowing non-root users to stop/start/restart your mongod process.',
        languages: [],
        products: [],
        publishDate: undefined,
        slug: undefined,
        image: undefined,
        title: undefined,
        tags: ['Security', 'Technical'],
        score: undefined,
        mediaType: undefined,
    },
    {
        authors: [],
        description:
            'Learn why using an Object Data Modeling library may not be the best choice when building MongoDB apps with Node.js.',
        languages: [],
        products: [],
        publishDate: undefined,
        slug: undefined,
        image: undefined,
        title: undefined,
        tags: ['Node.js'],
        score: undefined,
        mediaType: undefined,
    },
];

export const FINAL_NODE_RESULTS = [
    {
        authors: [],
        description:
            'Secure your MongoDB installation by allowing non-root users to stop/start/restart your mongod process.',
        languages: [],
        products: [],
        publishDate: undefined,
        slug: undefined,
        image: undefined,
        title: undefined,
        tags: [
            {
                label: 'Security',
                to: '/tag/security',
            },
            {
                label: 'Technical',
                to: '/tag/technical',
            },
        ],
        score: undefined,
        mediaType: undefined,
    },
    {
        authors: [],
        description:
            'Learn why using an Object Data Modeling library may not be the best choice when building MongoDB apps with Node.js.',
        languages: [],
        products: [],
        publishDate: undefined,
        slug: undefined,
        image: undefined,
        title: undefined,
        tags: [
            {
                label: 'Node.js',
                to: '/tag/node-js',
            },
        ],
        score: undefined,
        mediaType: undefined,
    },
];

export const mockTextFilterFetch = (_, args) => {
    const query = args[0];
    switch (query) {
        case 'java':
            return JAVA_RESULTS;
        case 'node':
            return RAW_NODE_RESULTS;
        default:
            return [];
    }
};
