import React from 'react';
import styled from '@emotion/styled';
import { size } from './theme';
import { ArticleH2 } from './text';

const SectionHeader = styled('div')`
    border-bottom: 1px solid ${({ theme }) => theme.colorMap.greyDarkOne};
    margin-bottom: ${size.large};
`;

export default ({ children, ...props }) => (
    <SectionHeader {...props}>
        <ArticleH2 {...props}>{children}</ArticleH2>
    </SectionHeader>
);
