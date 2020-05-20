import React from 'react';
import styled from '@emotion/styled';
import { colorMap } from './theme';
import { ArticleH2 } from './text';

const SectionHeader = styled('div')`
    border-bottom: 1px solid ${colorMap.greyDarkOne};
`;

export default ({ children }) => (
    <SectionHeader>
        <ArticleH2>{children}</ArticleH2>
    </SectionHeader>
);
