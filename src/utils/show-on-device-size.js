import { css } from '@emotion/core';

export const showOnDeviceSize = query => css`
    display: none;
    visibility: hidden;
    @media ${query} {
        display: block;
        visibility: visible;
    }
`;
