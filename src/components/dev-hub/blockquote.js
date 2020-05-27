import React from 'react';
import styled from '@emotion/styled';
import ComponentFactory from '../ComponentFactory';
import { colorMap, gradientMap, layer, size } from './theme';
import { createShadowElement } from './utils';

const BLOCKQUOTE_OFFSET = 10;
const BORDER_SIZE = 2;

const StyledBlockquote = styled('blockquote')`
    background: ${colorMap.greyDarkThree};
    border-radius: ${size.tiny};
    color: ${colorMap.devWhite};
    margin: 0;
    padding: ${size.medium};
    > :last-child {
        margin-bottom: 0;
    }
`;

const BlockquoteContainer = styled('div')`
    border-radius: ${size.tiny};
    background: ${gradientMap.magentaSalmonSherbet};
    background-size: cover;
    margin-bottom: ${BLOCKQUOTE_OFFSET + size.stripUnit(size.default)}px;
    padding: ${BORDER_SIZE}px;
    position: relative;
    &:before {
        ${createShadowElement(
            gradientMap.magentaSalmonSherbet,
            size.tiny,
            BLOCKQUOTE_OFFSET,
            0
        )}
    }
    &:after {
        ${createShadowElement(
            colorMap.greyDarkThree,
            size.tiny,
            BLOCKQUOTE_OFFSET,
            4
        )};
    }
`;

const BlockquoteStackingContext = styled('div')`
    position: relative;
    z-index: ${layer.front};
`;

const Blockquote = ({ nodeData: { children }, ...rest }) => (
    <BlockquoteStackingContext>
        <BlockquoteContainer>
            <StyledBlockquote>
                {children.map((element, index) => (
                    <ComponentFactory
                        {...rest}
                        nodeData={element}
                        key={index}
                    />
                ))}
            </StyledBlockquote>
        </BlockquoteContainer>
    </BlockquoteStackingContext>
);

Blockquote.displayName = 'Blockquote';

export default Blockquote;
