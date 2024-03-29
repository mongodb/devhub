import remark from 'remark';
import directive from 'remark-directive';
import gfm from 'remark-gfm';
import visit from 'unist-util-visit';
import { getNestedText } from '../get-nested-text';
import { getTagPageUriComponent } from '../get-tag-page-uri-component';

export const parseMarkdownToAST = markdown => {
    const result = remark().use(gfm).use(directive).parse(markdown);
    const parseNodeAttributes = node => {
        const start = node.attributes.start
            ? `?start=${node.attributes.start}`
            : '';
        const end = node.attributes.end ? `&end=${node.attributes.end}` : '';
        const value = node.attributes.vid + start + end;
        return value;
    };

    function transform(tree) {
        visit(
            tree,
            [
                'heading',
                'textDirective',
                'leafDirective',
                'containerDirective',
                'image',
            ],
            ondirective
        );
    }

    function ondirective(node) {
        const data = node.data || (node.data = {});
        switch (node.type) {
            case 'heading':
                if (node['children'] && node['children'].length) {
                    node['id'] = getTagPageUriComponent(
                        getNestedText(node['children'])
                    );
                }
                break;
            case 'image':
                const isFigure = !!node.title;
                if (isFigure) {
                    node.type = 'figure';
                    node.children = [{ type: 'text', value: node.title }];
                    node.options = {};
                }
                break;
            // Custom directive definitions go here
            case 'textDirective':
                data['name'] = node.name;
                node.type = node.name;
                switch (node.name) {
                    case 'youtube':
                        node['argument'] = [
                            { value: parseNodeAttributes(node) },
                        ];
                        node.nodeData = data;
                        break;
                    case 'charts':
                        node.options = node.attributes;
                        break;
                    default:
                        break;
                }
                break;
            case 'leafDirective':
            case 'containerDirective':
                switch (node.name) {
                    case 'tabs':
                        data['name'] = node.name;
                        node.options = node.attributes;
                        node.type = node.name;
                        node.nodeData = data;
                        break;
                    case 'tab':
                        node.options = node.attributes;
                        break;
                    default:
                        break;
                }
                break;
            default:
                break;
        }
    }
    transform(result);
    return result;
};
