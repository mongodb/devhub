import { css } from '@emotion/core';
import { screenSize, size } from '../components/dev-hub/theme';

export const getImageAlignmentStyle = align => {
    switch (align) {
        case 'left':
            return css`
                float: left;
                @media ${screenSize.mediumAndUp} {
                    margin-right: ${size.default};
                }
            `;
        case 'right':
            return css`
                float: right;
                @media ${screenSize.mediumAndUp} {
                    margin-left: ${size.default};
                }
            `;
        case 'center':
            return css`
                display: block;
                margin-left: auto;
                margin-right: auto;
            `;
        default:
            return null;
    }
};
