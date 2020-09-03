export const JAVA_RESULTS = [
    {
        _id: { $oid: '5f4dda9c03c0274ede72fcbf' },
        title: 'Java - Change Streams',
        description:
            'Learn how to use the Change Streams using the MongoDB Java Driver.',
        link: 'https://developer.mongodb.com/quickstart/java-change-streams',
        type: 'quickstart',
        author_names: ['Maxime Beugnet'],
        score: { $numberDouble: '3.4233973026275635' },
    },
    {
        _id: { $oid: '5f4dda9d03c0274ede72fcc7' },
        title: 'Java - Aggregation Pipeline',
        description:
            'Learn how to use the Aggregation Pipeline using the MongoDB Java Driver.',
        link:
            'https://developer.mongodb.com/quickstart/java-aggregation-pipeline',
        type: 'quickstart',
        author_names: ['Maxime Beugnet'],
        score: { $numberDouble: '3.4233973026275635' },
    },
];

export const NODE_RESULTS = [
    {
        _id: { $oid: '5f4dda9703c0274ede72fc87' },
        title:
            'Procedure to Allow Non-Root Users to Stop/Start/Restart "mongod" Process',
        description:
            'Secure your MongoDB installation by allowing non-root users to stop/start/restart your mongod process.',
        link:
            'https://developer.mongodb.com/how-to/non-root-user-mongod-process',
        type: 'how-to',
        author_names: ['Ella Shurhavetsky', 'Nuno Costa'],
        tags: ['Security', 'Technical'],
        score: { $numberDouble: '1.1476964950561523' },
    },
    {
        _id: { $oid: '5f4dda9b03c0274ede72fcb5' },
        title:
            'Do You Need Mongoose When Developing Node.js and MongoDB Applications?',
        description:
            'Learn why using an Object Data Modeling library may not be the best choice when building MongoDB apps with Node.js.',
        link:
            'https://developer.mongodb.com/article/mongoose-versus-nodejs-driver',
        type: 'article',
        author_names: ['Ado Kukic'],
        tags: ['Node.js'],
        score: { $numberDouble: '0.5719127058982849' },
    },
];

export const mockTextFilterFetch = (_, args) => {
    const query = args[0];
    switch (query) {
        case 'java':
            return JAVA_RESULTS;
        case 'node':
            return NODE_RESULTS;
        default:
            return [];
    }
};
