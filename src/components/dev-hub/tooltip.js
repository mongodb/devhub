import React from 'react';
import styled from '@emotion/styled-base';
import { css } from '@emotion/core';
import { colorMap, layer, size } from './theme';

/* needs
- needs a trigger
- needs content to display on hover
- ideally the content can be anything contained in that box
- tooltip can be in different directions: start with bottom && right
*/

const DISTANCE_FROM_TRIGGER = '35px';

const bottomHoverStyles = css`
    top: ${DISTANCE_FROM_TRIGGER};
    transition: 0.1s ease-out;
`;

const bottomStyles = css`
    left: 0;
    top: ${size.medium};
    transition: 0.1s ease-out;
`;

const rightHoverStyles = css`
    left: ${DISTANCE_FROM_TRIGGER};
    transition: 0.1s ease-out;
`;

const rightStyles = css`
    left: ${size.medium};
    top: -${size.tiny};
`;

const Content = styled('div')`
    background: ${colorMap.greyDarkOne};
    opacity: 0;
    position: absolute;
    visibility: hidden;
    z-index: ${layer.middle};

    ${({ right }) => right && rightStyles}
    ${({ bottom }) => bottom && bottomStyles}
`;

const Trigger = styled('span')`
    cursor: pointer;
`;

const ToolTipWrapper = styled('div')`
    position: relative;
    &:active,
    &:focus, 
    &:hover {
        [data-name="${({ id }) => id}"] {
            visibility: visible;
            opacity: 1;
            ${({ right }) => right && rightHoverStyles}
            ${({ bottom }) => bottom && bottomHoverStyles}
        }
    }
`;

/**
 * @param {Object<string, any>} props
 * @property {node} props.children
 * @property {boolean} props.right
 * @property {boolean} props.bottom
 */

const Tooltip = ({ bottom, children, right, trigger }) => {
    const tooltipId = 'tooltip-' + Math.random() * Math.floor(1000);
    return (
        <ToolTipWrapper bottom={bottom} right={right} id={tooltipId}>
            <Trigger>{trigger}</Trigger>
            <Content bottom={bottom} right={right} data-name={tooltipId}>
                {children}
            </Content>
        </ToolTipWrapper>
    );
};

export default Tooltip;
