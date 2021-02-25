import remark from 'remark';
import directive from 'remark-directive';
import gfm from 'remark-gfm';
import visit from 'unist-util-visit';

export const parseMarkdownToAST = markdown => {
    const result = remark().use(gfm).use(directive).parse(markdown);

    function transform(tree) {
        visit(
            tree,
            ['textDirective', 'leafDirective', 'containerDirective'],
            ondirective
        );
    }

    function ondirective(node) {
        var data = node.data || (node.data = {});
        node['argument'] = [{ value: node.attributes.vid }];
        data['name'] = node.name;
        node.type = node.name;
        node.nodeData = data;
    }
    transform(result);
    return result;
};
