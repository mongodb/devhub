export const JAVA_RESULTS = [
    {
        _id: { $oid: '5f4dda9c03c0274ede72fcbf' },
        authors: [],
        contentAST: [],
        description:
            'Learn how to use the Change Streams using the MongoDB Java Driver.',
        headingNodes: [],
        languages: [],
        products: [],
        publishedDate: undefined,
        related: [],
        slug: undefined,
        SEO: {},
        image: undefined,
        title: undefined,
        tags: [],
        type: 'quickstart',
        updatedDate: undefined,
    },
    {
        _id: { $oid: '5f4dda9d03c0274ede72fcc7' },
        authors: [],
        contentAST: [],
        description:
            'Learn how to use the Aggregation Pipeline using the MongoDB Java Driver.',
        headingNodes: [],
        languages: [],
        products: [],
        publishedDate: undefined,
        related: [],
        slug: undefined,
        SEO: {},
        image: undefined,
        title: undefined,
        tags: [],
        type: 'quickstart',
        updatedDate: undefined,
    },
];

const RAW_NODE_RESULTS = [
    {
        _id: { $oid: '5f4dda9703c0274ede72fc87' },
        authors: [],
        contentAST: [],
        description:
            'Secure your MongoDB installation by allowing non-root users to stop/start/restart your mongod process.',
        headingNodes: [],
        languages: [],
        products: [],
        publishedDate: undefined,
        related: [],
        slug: undefined,
        SEO: {},
        image: undefined,
        title: undefined,
        tags: ['Security', 'Technical'],
        type: 'how-to',
        updatedDate: undefined,
    },
    {
        _id: { $oid: '5f4dda9b03c0274ede72fcb5' },
        authors: [],
        contentAST: [],
        description:
            'Learn why using an Object Data Modeling library may not be the best choice when building MongoDB apps with Node.js.',
        headingNodes: [],
        languages: [],
        products: [],
        publishedDate: undefined,
        related: [],
        slug: undefined,
        SEO: {},
        image: undefined,
        title: undefined,
        tags: ['Node.js'],
        type: 'article',
        updatedDate: undefined,
    },
];

export const FINAL_NODE_RESULTS = [
    {
        _id: { $oid: '5f4dda9703c0274ede72fc87' },
        authors: [],
        contentAST: [],
        description:
            'Secure your MongoDB installation by allowing non-root users to stop/start/restart your mongod process.',
        headingNodes: [],
        languages: [],
        products: [],
        publishedDate: undefined,
        related: [],
        slug: undefined,
        SEO: {},
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
        type: 'how-to',
        updatedDate: undefined,
    },
    {
        _id: { $oid: '5f4dda9b03c0274ede72fcb5' },
        authors: [],
        contentAST: [],
        description:
            'Learn why using an Object Data Modeling library may not be the best choice when building MongoDB apps with Node.js.',
        headingNodes: [],
        languages: [],
        products: [],
        publishedDate: undefined,
        related: [],
        slug: undefined,
        SEO: {},
        image: undefined,
        title: undefined,
        tags: [
            {
                label: 'Node.js',
                to: '/tag/node-js',
            },
        ],
        type: 'article',
        updatedDate: undefined,
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
