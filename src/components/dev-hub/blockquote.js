import React from 'react';
import styled from '@emotion/styled';
import ComponentFactory from '../ComponentFactory';
import { layer, size } from './theme';
import { createShadowElement } from './utils';

const BLOCKQUOTE_OFFSET = 10;
const BORDER_SIZE = 2;

const StyledBlockquote = styled('blockquote')`
    background: ${({ theme }) => theme.colorMap.greyDarkThree};
    border-radius: ${size.tiny};
    color: ${({ theme }) => theme.colorMap.devWhite};
    margin: 0;
    padding: ${size.medium};
    > :last-child {
        margin-bottom: 0;
    }
`;

const BlockquoteContainer = styled('div')`
    border-radius: ${size.tiny};
    background: ${({ theme }) => theme.gradientMap.magentaSalmonSherbet};
    background-size: cover;
    margin-bottom: ${BLOCKQUOTE_OFFSET + size.stripUnit(size.default)}px;
    padding: ${BORDER_SIZE}px;
    position: relative;
    &:before {
        ${({ theme }) =>
            createShadowElement(
                theme.gradientMap.magentaSalmonSherbet,
                size.tiny,
                BLOCKQUOTE_OFFSET,
                0
            )}
    }
    &:after {
        ${({ theme }) =>
            createShadowElement(
                theme.colorMap.greyDarkThree,
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
