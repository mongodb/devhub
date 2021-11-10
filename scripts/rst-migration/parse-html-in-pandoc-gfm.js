const axios = require('axios');
const marked = require('marked');
const cheerio = require('cheerio');
const { uploadImageFromUrl } = require('./upload-image-from-url');

const STRAPI_TAG_MAPPING = {
    'Aggregation Framework': 'AggregationFramework',
    'Atlas Search': 'AtlasSearch',
    'BI Connector': 'BIConnector',
    'Cloud Development': 'CloudDevelopment',
    'Cloud Manager': 'CloudManager',
    'Change Streams': 'ChangeStreams',
    'C#': 'Cs',
    '.NET': 'dotNET',
    '.NET Core': 'dotNETCore',
    'Data Lake': 'DataLake',
    'Data Structures': 'DataStructures',
    'Data Visualization': 'DataVisualization',
    'FARM Stack': 'FARMStack',
    'Field Level Encryption': 'FieldLevelEncryption',
    'Full-Text Search': 'FullTextSearch',
    'Game Development': 'GameDevelopment',
    'Jupyter Notebook': 'JupyterNotebook',
    'MongoDB 4.0': 'MongoDB40',
    'MongoDB 4.2': 'MongoDB42',
    'MongoDB 4.4': 'MongoDB44',
    'MongoDB 5.0': 'MongoDB50',
    'Objective-C': 'ObjectiveC',
    'Online Archive': 'OnlineArchive',
    'Ops Manager': 'OpsManager',
    'Public Speaking': 'PublicSpeaking',
    'Remote Work': 'RemoteWork',
    'Schema Design': 'SchemaDesign',
    'Soft Skills': 'SoftSkills',
    'Swift UI': 'SwiftUI',
    'Time Series': 'TimeSeries',
    'VS Code': 'VSCode',
};

const TYPE_MAPPING = {
    article: 'Article',
    'how-to': 'HowTo',
    quickstart: 'Quickstart',
};

const cleanupRawText = text => text && text.replace(/\n/g, ' ').trim();

const transformMD = (rawContent, name) => {
    let newContent = rawContent;
    // Replace youtube
    newContent = newContent.replace(
        /(<div class="youtube">)([\S\s]*?)(<\/div>)/g,
        (match, p1, p2) =>
            cleanupRawText(`:youtube[]{vid=${cleanupRawText(p2)}}`)
    );
    newContent = newContent.split(`# ${name}`)[1];
    return newContent;
};

const parseHTMLContent = async rawContent => {
    const htmlToParse = marked.parse(rawContent);
    const fullData = cheerio.load(htmlToParse, null, false);
    const parseAttrIfExists = (selector, callback) => {
        const node = fullData(selector);
        if (node) return callback(node);
    };
    const articleUrl = parseAttrIfExists('.atf-image > p', node =>
        node.text().replace(/^./, 'https://www.mongodb.com/developer')
    );
    const ogImageUrl = parseAttrIfExists('.og', node =>
        node.attr('image').replace(/^./, 'https://www.mongodb.com/developer')
    );
    const twitterImageUrl = parseAttrIfExists('.twitter', node =>
        node.attr('image').replace(/^./, 'https://www.mongodb.com/developer')
    );
    const content = transformMD(
        rawContent,
        parseAttrIfExists('h1', node => cleanupRawText(node.text()))
    );
    const tags = parseAttrIfExists('.tags', node =>
        node
            .text()
            .split('\n')
            .filter(x => !!x)
            .map(x => ({ tag: STRAPI_TAG_MAPPING[x] || x }))
    );
    const languages = parseAttrIfExists('.languages', node =>
        node
            .text()
            .split('\n')
            .filter(x => !!x)
            .map(x => ({ tag: STRAPI_TAG_MAPPING[x] || x }))
    );
    const products = parseAttrIfExists('.products', node =>
        node
            .text()
            .split('\n')
            .filter(x => !!x)
            .map(x => ({ tag: STRAPI_TAG_MAPPING[x] || x }))
    );
    const image = await uploadImageFromUrl(articleUrl, 'atf-images');
    const og_image = await uploadImageFromUrl(ogImageUrl, 'og-image');
    const twitter_image = await uploadImageFromUrl(
        twitterImageUrl,
        'twitter-image'
    );
    // Author --> query for existing author
    return {
        authors: [],
        content,
        description: parseAttrIfExists('.meta-description', node =>
            cleanupRawText(node.text())
        ),
        editorial_review_LGTM: true,
        image,
        languages,
        name: parseAttrIfExists('h1', node => cleanupRawText(node.text())),
        products,
        published_at: null,
        // Below will need work
        // related: parseAttrIfExists('.related', node =>
        //     cleanupRawText(node.text())
        // ),
        SEO: {
            // canonical_url: parseAttrIfExists('link[rel=canonical]', node =>
            //     node.attr('href')
            // ),
            meta_description: parseAttrIfExists('.meta-description', node =>
                cleanupRawText(node.text())
            ),
            og_description: parseAttrIfExists('.og', node =>
                cleanupRawText(node.attr('description'))
            ),
            og_image,
            og_title: parseAttrIfExists('.og', node => node.attr('title')),
            og_type: parseAttrIfExists('.og', node => node.attr('type')),
            og_url: parseAttrIfExists('.og', node => node.attr('url')),
            twitter_creator: parseAttrIfExists('.twitter', node =>
                node.attr('creator')
            ),
            twitter_description: parseAttrIfExists('.twitter', node =>
                node.attr('description')
            ),
            twitter_image,
            twitter_title: parseAttrIfExists('.twitter', node =>
                node.attr('title')
            ),
        },
        slug: `/${process.argv[2]
            .replace('.txt', '')
            .split('/')
            .slice(-1)
            .join('')}`,
        tags,
        technical_review_LGTM: true,
        type: parseAttrIfExists(
            '.type',
            node => TYPE_MAPPING[cleanupRawText(node.text())]
        ),
    };
};

const main = () => {
    let result;
    const { exec } = require('child_process');
    var yourscript = exec(
        `sh ./scripts/rst-to-cms.sh ${process.argv[2]}`,
        async (error, stdout, stderr) => {
            result = stdout;
            const parsed = await parseHTMLContent(result);
            axios
                .post('http://18.144.177.6:1337/articles', parsed)
                .then(r => console.log(r))
                .catch(e => console.log(e));
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        }
    );
};

main();
