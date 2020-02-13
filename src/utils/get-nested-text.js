/**
 * Find the text node in a nested array
 * @param {Array} child an ast children array
 * @returns {String} description text
 */
export const getNestedText = child => {
    if (!child) {
        return '';
    }
    const firstChild = child[0];
    // If this child has child arrays keep digging
    if (firstChild.children) {
        return getNestedText(firstChild.children);
    }
    // If we hit the text node we can return that value
    if (firstChild.type === 'text') {
        return firstChild.value;
    }
    // There wasn't any content
    return '';
};
