import { css } from '@emotion/core';
import { colorMap, gradientMap, layer, size } from './theme';

const createShadowElement = (
    backgroundColor,
    borderRadius,
    positionOffset,
    sizeOffset = 0
) => css`
    background: ${backgroundColor};
    border-radius: ${borderRadius};
    bottom: ${positionOffset}px;
    content: '';
    height: calc(100% + ${sizeOffset}px);
    left: ${positionOffset}px;
    position: absolute;
    width: calc(100% + ${sizeOffset}px);
    z-index: ${layer.superBack};
`;

export { createShadowElement };
