import {
    ATLAS_SIGNUP_LINK,
    updateAttributionLinks,
} from '../../src/utils/setup/update-attribution-links';

// Although this has the atlas signup link, it is not a reference type
const TEXT_NODE_TO_NOT_CHANGE = {
    type: 'directive',
    children: [
        {
            type: 'text',
            refuri:
                ATLAS_SIGNUP_LINK + 'should not change since not a reference',
        },
    ],
    domain: 'devhub',
    name: 'meta-description',
    argument: [],
};
const CONSISTENT_LINK = 'https://youtu.be/FFj04Apz_BE';
const EXPECTED_NEW_ATTRIBUTION_LINK = `${ATLAS_SIGNUP_LINK}?${encodeURIComponent(
    `tck=devhub-test`
)}`;
const EXPECTED_NEW_LINK_WITH_PARAMS = `${ATLAS_SIGNUP_LINK}?${encodeURIComponent(
    `tck=devhub-test&`
)}foo=bar`;

it('should update Atlas attribution links in an AST with a supplied tck for Snooty articles', () => {
    const sampleAST = {
        ast: {
            children: [
                TEXT_NODE_TO_NOT_CHANGE,
                {
                    type: 'directive',
                    children: [
                        {
                            type: 'reference',
                            position: { start: { line: 93 } },
                            children: [{ type: 'text', value: 'recording' }],
                            refuri: CONSISTENT_LINK,
                        },
                        {
                            type: 'reference',
                            position: { start: { line: 93 } },
                            children: [
                                { type: 'text', value: 'this should change' },
                            ],
                            refuri: ATLAS_SIGNUP_LINK,
                        },
                        {
                            type: 'reference',
                            position: { start: { line: 93 } },
                            children: [
                                { type: 'text', value: 'this should change' },
                            ],
                            refuri: ATLAS_SIGNUP_LINK + '?foo=bar',
                        },
                    ],
                    domain: '',
                    name: 'paragraph',
                    argument: [],
                    options: {},
                },
            ],
        },
    };

    updateAttributionLinks(sampleAST, 'test');
    expect(sampleAST.ast.children[0]).toStrictEqual(TEXT_NODE_TO_NOT_CHANGE);
    expect(sampleAST.ast.children[1].children[0].refuri).toBe(CONSISTENT_LINK);
    expect(sampleAST.ast.children[1].children[1].refuri).toBe(
        EXPECTED_NEW_ATTRIBUTION_LINK
    );
    expect(sampleAST.ast.children[1].children[2].refuri).toBe(
        EXPECTED_NEW_LINK_WITH_PARAMS
    );
});

it('should update Atlas attribution links in an AST with a supplied tck for Strapi articles', () => {
    const sampleAST = {
        type: 'directive',
        children: [
            TEXT_NODE_TO_NOT_CHANGE,
            {
                type: 'link',
                position: { start: { line: 93 } },
                children: [{ type: 'text', value: 'recording' }],
                url: CONSISTENT_LINK,
            },
            {
                type: 'link',
                position: { start: { line: 93 } },
                children: [{ type: 'text', value: 'this should change' }],
                url: ATLAS_SIGNUP_LINK,
            },
            {
                type: 'link',
                position: { start: { line: 93 } },
                children: [{ type: 'text', value: 'this should change' }],
                url: ATLAS_SIGNUP_LINK + '?foo=bar',
            },
        ],
        domain: '',
        name: 'paragraph',
        argument: [],
        options: {},
    };

    updateAttributionLinks(sampleAST, 'test', [sampleAST]);
    expect(sampleAST.children[0]).toStrictEqual(TEXT_NODE_TO_NOT_CHANGE);
    expect(sampleAST.children[1].url).toBe(CONSISTENT_LINK);
    expect(sampleAST.children[2].url).toBe(EXPECTED_NEW_ATTRIBUTION_LINK);
    expect(sampleAST.children[3].url).toBe(EXPECTED_NEW_LINK_WITH_PARAMS);
});
