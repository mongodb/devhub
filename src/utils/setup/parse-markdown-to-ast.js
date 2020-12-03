import remark from 'remark';
import gfm from 'remark-gfm';

export const parseMarkdownToAST = markdown => {
    const result = remark().use(gfm).parse(markdown);
    return result;
};
