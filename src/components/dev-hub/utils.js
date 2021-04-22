import { css } from '@emotion/react';
import { layer } from './theme';

const createShadowElement = (
    backgroundColor,
    borderRadius,
    positionOffset,
    sizeOffset = 0
) => css`
    background: ${backgroundColor};
    border-radius: ${borderRadius};
    content: '';
    height: calc(100% - ${sizeOffset}px);
    left: ${sizeOffset / 2}px;
    position: absolute;
    top: ${sizeOffset / 2}px;
    width: calc(100% - ${sizeOffset}px);
    z-index: ${layer.superBack};

    transform: translate(-${positionOffset}px, ${positionOffset}px);
`;

export { createShadowElement };
