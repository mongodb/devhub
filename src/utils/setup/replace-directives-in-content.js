export const replaceDirectivesInContent = content =>
    content.replace(/(.. [\w-]+::)|(:[\w-]+)|(-+)|(=+)/g, '');
