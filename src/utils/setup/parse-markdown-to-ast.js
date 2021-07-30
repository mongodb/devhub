import remark from 'remark';
import directive from 'remark-directive';
import gfm from 'remark-gfm';
import visit from 'unist-util-visit';
import { getNestedText } from '../get-nested-text';
import { getTagPageUriComponent } from '../get-tag-page-uri-component';

export const parseMarkdownToAST = markdown => {
    const result = remark().use(gfm).use(directive).parse(markdown);

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
                        node['argument'] = [{ value: node.attributes.vid }];
                        node.nodeData = data;
                        break;
                    case 'charts':
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
