import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import ComponentFactory from '../ComponentFactory';
import { colorMap, gradientMap, layer, size } from './theme';
import { createShadowElement } from './utils';

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

const BlockquoteContainer = styled('div')`
    border-radius: ${size.tiny};
    background: ${gradientMap.magentaSalmonSherbet};
    background-size: cover;
    padding: ${BORDER_SIZE}px;
    position: relative;
    &:before {
        ${createShadowElement(
            gradientMap.magentaSalmonSherbet,
            size.tiny,
            -BLOCKQUOTE_OUTER_LAYER_OFFSET
        )}
    }
    &:after {
        ${createShadowElement(
            colorMap.greyDarkThree,
            size.tiny,
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
