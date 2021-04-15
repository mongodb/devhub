import React from 'react';
import { keyframes } from '@emotion/react';
import styled from '@emotion/styled';
import { fontSize, size } from '~components/dev-hub/theme';
import { P } from '~components/dev-hub/text';

const MAX_WIDTH = '20px';
const TRANSITION_SPEED = '900ms';

const ellipsis = keyframes`
    to {
      width: ${MAX_WIDTH};
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
        animation: ${ellipsis} steps(4, end) ${TRANSITION_SPEED} infinite;
        content: '\u2026'; /* ascii code for the ellipsis character */
        display: inline-block;
        overflow: hidden;
        vertical-align: bottom;
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
