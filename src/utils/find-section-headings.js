export const findSectionHeadings = (
    nodes,
    key,
    value,
    maxDepth,
    minDepth = 1
) => {
    const results = [];
    const searchNode = (node, sectionDepth) => {
        if (
            node[key] === value &&
            sectionDepth - 1 <= maxDepth &&
            sectionDepth > minDepth
        ) {
            console.log(node);
            const nodeTitle = node.children;
            const newNode = {
                children: [],
                depth: sectionDepth,
                id: node.id,
                title: nodeTitle,
            };
            const lastElement = results[results.length - 1];
            if (!lastElement || sectionDepth <= lastElement.depth) {
                results.push(newNode);
            } else {
                lastElement.children.push(newNode);
            }
        }
        // Don't include step headings in our TOC regardless of depth
        if (node.children && node.name !== 'step') {
            if (node.type === 'section') {
                sectionDepth += 1; // eslint-disable-line no-param-reassign
            }
            return node.children.forEach(child =>
                searchNode(child, sectionDepth)
            );
        }
        return null;
    };
    nodes.forEach(node => searchNode(node, 0));
    return results;
};
