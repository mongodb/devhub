import React from 'react';
import BlogTagList from '~components/dev-hub/blog-tag-list';
import { H5 } from '~components/dev-hub/text';

const ToolsUsed = ({ tags, ...props }) => (
    <div {...props}>
        <H5>Tools Used</H5>
        <BlogTagList navigates={false} tags={tags} />
    </div>
);

export default ToolsUsed;
