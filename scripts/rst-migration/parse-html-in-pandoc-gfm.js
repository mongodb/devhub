const marked = require('marked');
const cheerio = require('cheerio');
const axios = require('axios');

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

const parseHTMLContent = rawContent => {
    // console.log(marked.parse(rawContent));
    const htmlToParse = marked.parse(rawContent);
    const fullData = cheerio.load(htmlToParse, null, false);
    const parseAttrIfExists = (selector, callback) => {
        const node = fullData(selector);
        if (node) return callback(node);
    };
    const content = transformMD(
        rawContent,
        parseAttrIfExists('h1', node => cleanupRawText(node.text()))
    );
    // const og
    return {
        // article_image,
        authors: [],
        content,
        description: parseAttrIfExists('.meta-description', node =>
            cleanupRawText(node.text())
        ),
        editorial_review_lgtm: true,
        // languages,
        name: parseAttrIfExists('h1', node => cleanupRawText(node.text())),
        // products,
        published_at: null,
        // Below will need work
        related: parseAttrIfExists('.related', node =>
            cleanupRawText(node.text())
        ),
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
            // og_image: parseAttrIfExists('.og', node => node.attr('image')),
            og_title: parseAttrIfExists('.og', node => node.attr('title')),
            og_type: parseAttrIfExists('.og', node => node.attr('type')),
            og_url: parseAttrIfExists('.og', node => node.attr('url')),
            twitter_creator: parseAttrIfExists('.twitter', node =>
                node.attr('creator')
            ),
            twitter_description: parseAttrIfExists('.twitter', node =>
                node.attr('description')
            ),
            // twitter_image: parseAttrIfExists('.twitter', node =>
            //     node.attr('image')
            // ),
            twitter_title: parseAttrIfExists('.twitter', node =>
                node.attr('title')
            ),
        },
        slug: `/${process.argv[2]
            .replace('.txt', '')
            .split('/')
            .slice(-2)
            .join('/')}`,
        // Below will need work
        // tags: parseAttrIfExists('.tags', node => node.text()),
        technical_review_lgtm: true,
        // type: parseAttrIfExists('.type', node => cleanupRawText(node.text())),
    };
};

const main = () => {
    let result;
    const { exec } = require('child_process');
    var yourscript = exec(
        `sh ./scripts/rst-to-cms.sh ${process.argv[2]}`,
        (error, stdout, stderr) => {
            result = stdout;
            const parsed = parseHTMLContent(result);
            axios
                .post('http://18.144.177.6:1337/articles', parsed)
                .catch(e => console.log(e));
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        }
    );
};

main();
