import React from 'react';
import styled from '@emotion/styled';
import ComponentFactory from '../ComponentFactory';
import { colorMap, gradientMap, layer, size } from './theme';

const BLOCKQUOTE_INNER_LAYER_OFFSET = 6;
const BLOCKQUOTE_OUTER_LAYER_OFFSET = 8;

const StyledBlockquote = styled('blockquote')`
    background: ${colorMap.greyDarkThree};
    border-radius: ${size.tiny};
    color: ${colorMap.white};
    margin: 0;
    padding: ${size.medium};
`;

const BlockquoteContainer = styled('div')`
    border-radius: ${size.tiny};
    background: ${gradientMap.magentaSalmonYellow};
    background-size: cover;
    padding: 2px;
    position: relative;
    &:before {
        background: ${gradientMap.magentaSalmonYellow};
        border-radius: ${size.tiny};
        bottom: -${BLOCKQUOTE_OUTER_LAYER_OFFSET}px;
        content: '';
        height: 100%;
        left: -${BLOCKQUOTE_OUTER_LAYER_OFFSET}px;
        position: absolute;
        width: 100%;
        z-index: ${layer.superBack};
    }
    &:after {
        background: ${colorMap.greyDarkThree};
        border-radius: ${size.tiny};
        bottom: -${BLOCKQUOTE_INNER_LAYER_OFFSET}px;
        content: '';
        height: calc(100% - 4px);
        left: -${BLOCKQUOTE_INNER_LAYER_OFFSET}px;
        position: absolute;
        width: calc(100% - ${BLOCKQUOTE_INNER_LAYER_OFFSET}px);
        z-index: ${layer.superBack};
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
