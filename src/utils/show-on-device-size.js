import { css } from '@emotion/core';

export const showOnDeviceSize = query => css`
    display: none;
    @media ${query} {
        display: block;
    }
`;
