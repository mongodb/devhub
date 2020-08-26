import React from 'react';
import styled from '@emotion/styled';
import { lineHeight, screenSize, size } from './theme';
import { H4, P } from './text';

const BOTTOM_DESKTOP_MARGIN = '240px';
const MAX_WIDTH = '360px';

const EmptyStateContainer = styled('div')`
    color: ${({ theme }) => theme.colorMap.greyLightTwo};
    display: flex;
    flex-direction: column;
    margin: ${size.xxlarge} auto ${BOTTOM_DESKTOP_MARGIN};
    max-width: ${MAX_WIDTH};
    text-align: center;
    @media ${screenSize.upToLarge} {
        margin: ${size.mediumLarge} auto ${size.xlarge};
    }
`;

const StyledH4 = styled(H4)`
    font-family: akzidenz;
    font-weight: normal;
    margin-bottom: ${size.xsmall};
`;

const StyledP = styled(P)`
    line-height: ${lineHeight.small};
`;

const EmptyTextFilterResults = () => (
    <EmptyStateContainer>
        <StyledH4>No matching results.</StyledH4>
        <StyledP>
            We did not find any articles matching your query, please try with
            different search query.
        </StyledP>
    </EmptyStateContainer>
);

export default EmptyTextFilterResults;
