import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import ComponentFactory from '../ComponentFactory';
import { colorMap, gradientMap, layer, size } from './theme';

const BLOCKQUOTE_INNER_LAYER_OFFSET = 6;
const BLOCKQUOTE_OUTER_LAYER_OFFSET = 8;
const BORDER_SIZE = 2;

const StyledBlockquote = styled('blockquote')`
    background: ${colorMap.greyDarkThree};
    border-radius: ${size.tiny};
    color: ${colorMap.white};
    margin: 0;
    padding: ${size.medium};
`;

const blockquotePseudoElement = (
    backgroundColor,
    positionOffset,
    sizeOffset = 0
) => css`
    background: ${backgroundColor};
    border-radius: ${size.tiny};
    bottom: ${positionOffset}px;
    content: '';
    height: calc(100% + ${sizeOffset}px);
    left: ${positionOffset}px;
    position: absolute;
    width: calc(100% + ${sizeOffset}px);
    z-index: ${layer.superBack};
`;

const BlockquoteContainer = styled('div')`
    border-radius: ${size.tiny};
    background: ${gradientMap.magentaSalmonSherbet};
    background-size: cover;
    padding: ${BORDER_SIZE}px;
    position: relative;
    &:before {
        ${blockquotePseudoElement(
            gradientMap.magentaSalmonSherbet,
            -BLOCKQUOTE_OUTER_LAYER_OFFSET
        )}
    }
    &:after {
        ${blockquotePseudoElement(
            colorMap.greyDarkThree,
            -BLOCKQUOTE_INNER_LAYER_OFFSET,
            -BLOCKQUOTE_INNER_LAYER_OFFSET + BORDER_SIZE
        )};
    }
`;

const Blockquote = ({ nodeData: { children }, ...rest }) => (
    <BlockquoteContainer>
        <StyledBlockquote>
            {children.map((element, index) => (
                <ComponentFactory {...rest} nodeData={element} key={index} />
            ))}
        </StyledBlockquote>
    </BlockquoteContainer>
);

Blockquote.displayName = 'Blockquote';

export default Blockquote;
