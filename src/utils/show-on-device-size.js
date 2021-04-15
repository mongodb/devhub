import { css } from '@emotion/react';

export const showOnDeviceSize = query => css`
    display: none;
    visibility: hidden;
    @media ${query} {
        display: block;
        visibility: visible;
    }
`;
