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
                node['id'] = getTagPageUriComponent(
                    getNestedText(node['children'])
                );
                break;
            case 'image':
                const isFigure = !!node.title;
                if (isFigure) {
                    node.type = 'figure';
                    node.children = [{ type: 'text', value: node.title }];
                    node.options = {};
                }
                break;
            case 'textDirective':
                // Custom directive definitions go here
                // Right now, this is just YouTube
                node['argument'] = [{ value: node.attributes.vid }];
                data['name'] = node.name;
                node.type = node.name;
                node.nodeData = data;
                break;
            default:
                break;
        }
    }
    transform(result);
    return result;
};
