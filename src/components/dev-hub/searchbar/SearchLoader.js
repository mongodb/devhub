import React from 'react';
import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import { fontSize, size } from '~components/dev-hub/theme';
import { P } from '~components/dev-hub/text';

const ellipsis = keyframes`
    to {
      width: 20px;   
    }
`;

const Loader = styled('div')`
    padding-left: ${size.medium};
`;

const LoaderText = styled(P)`
    font-family: Akzidenz;
    font-size: ${fontSize.small};
    letter-spacing: 0.5px;
    line-height: ${size.mediumLarge};
    margin: 0;
    :after {
        overflow: hidden;
        display: inline-block;
        vertical-align: bottom;
        -webkit-animation: ${ellipsis} steps(4, end) 900ms infinite;
        animation: ${ellipsis} steps(4, end) 900ms infinite;
        content: '\u2026'; /* ascii code for the ellipsis character */
        width: 0px;
    }
`;

const SearchLoader = () => (
    <Loader>
        <LoaderText>
            <strong>Searching</strong>
        </LoaderText>
    </Loader>
);

export default SearchLoader;
