import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Popover from 'react-tiny-popover';
import { colorMap, layer, size } from './theme';

const CONTENT_MAX_WIDTH = 250;
const TOOLTIP_DISTANCE = 15;
// Default alignment of tooltip content based on tooltip position
const TOOLTIP_ALIGNMENT_MAP = {
    bottom: 'center',
    left: 'start',
    right: 'start',
    top: 'center',
};

const gradient = css`
    border-image: linear-gradient(
            315deg,
            ${colorMap.violet} 0%,
            ${colorMap.magenta} 40%,
            ${colorMap.orange} 100%
        )
        1;
`;
const defaultBorder = css`
    border-color: ${colorMap.greyLightTwo};
`;
const arrowBase = css`
    &:before,
    &:after {
        border: solid transparent;
        content: ' ';
        height: 0;
        pointer-events: none;
        position: absolute;
        width: 0;
    }
    &:before {
        border-color: transparent;
    }
    &:after {
        border-color: transparent;
    }
`;

const verticalArrowBase = css`
    &:before,
    &:after {
        right: 53%;
    }
    &:after {
        border-width: 11px;
        left: calc(50% - 11px);
        margin-top: -11px;
    }
    &:before {
        border-width: 15px;
        left: calc(50% - 15px);
        margin-top: -15px;
    }
`;

const horizontalArrowBase = css`
    &:before,
    &:after {
        top: 30px;
    }
    &:before {
        border-width: 12px;
        margin-top: -12px;
    }
    &:after {
        border-width: 9px;
        margin-top: -9px;
    }
`;

const rightDefaultArrow = css`
    ${arrowBase}
    ${horizontalArrowBase}
    &:before,
    &:after {
        left: 100%;
    }
    &:before {
        border-left-color: ${colorMap.greyLightTwo};
    }
    &:after {
        border-left-color: ${colorMap.greyDarkOne};
    }
`;

const rightGradientArrow = css`
    ${rightDefaultArrow}
    &:before {
        border-left-color: ${colorMap.magenta};
    }
    &:after {
        border-left-color: ${colorMap.greyDarkOne};
    }
`;

const leftDefaultArrow = css`
    ${arrowBase}
    ${horizontalArrowBase}
    &:before,
    &:after {
        right: 100%;
    }
    &:before {
        border-right-color: ${colorMap.greyLightTwo};
    }
    &:after {
        border-right-color: ${colorMap.greyDarkOne};
    }
`;

const leftGradientArrow = css`
    ${leftDefaultArrow}
    &:before {
        border-right-color: ${colorMap.orange};
    }
    &:after {
        border-right-color: ${colorMap.greyDarkOne};
    }
`;

const bottomDefaultArrow = css`
    ${arrowBase}
    ${verticalArrowBase}
    &:after {
        border-top-color: ${colorMap.greyDarkOne};
        top: calc(100% + 11px);
    }
    &:before {
        border-top-color: ${colorMap.greyLightTwo};
        top: calc(100% + 15px);
    }
`;

const bottomGradientArrow = css`
    ${bottomDefaultArrow}
    &:after {
        border-top-color: ${colorMap.greyDarkOne};
    }
    &:before {
        border-top-color: ${colorMap.magenta};
    }
`;

const topDefaultArrow = css`
    ${arrowBase}
    ${verticalArrowBase}
    &:before,
    &:after {
        bottom: 100%;
    }
    &:after {
        border-bottom-color: ${colorMap.greyDarkOne};
    }
    &:before {
        border-bottom-color: ${colorMap.greyLightTwo};
    }
`;

const topGradientArrow = css`
    ${topDefaultArrow}
    &:after {
        border-bottom-color: ${colorMap.greyDarkOne};
    }
    &:before {
        border-bottom-color: ${colorMap.magenta};
    }
`;

const getArrowStyles = (hasGradientBorder, position) => {
    const tooltipArrowMap = {
        bottom: hasGradientBorder ? topGradientArrow : topDefaultArrow,
        left: hasGradientBorder ? rightGradientArrow : rightDefaultArrow,
        right: hasGradientBorder ? leftGradientArrow : leftDefaultArrow,
        top: hasGradientBorder ? bottomGradientArrow : bottomDefaultArrow,
    };
    return tooltipArrowMap[position];
};

const Content = styled('div')`
    background: ${colorMap.greyDarkOne};
    border: 2px solid;
    color: ${colorMap.devWhite};
    max-width: ${CONTENT_MAX_WIDTH}px;
    padding: ${size.medium} ${size.default};
    position: relative;
    ${({ hasGradientBorder }) => (hasGradientBorder ? gradient : defaultBorder)}
    ${({ hasGradientBorder, position }) =>
        getArrowStyles(hasGradientBorder, position)}
`;

const Trigger = styled('span')`
    cursor: pointer;
`;

// This logic was pulled from 'react-tiny-popover' (see = https://github.com/alexkatz/react-tiny-popover/blob/3928cfa67a57676f32d5f04b3e1decb8c31db544/src/Popover.tsx#L316-L352)
// In order to provide custom positioning of right/left tooltips
// we must hook into the logic of the library and add the
// adjustments needed
const contentLocation = padding => ({
    align,
    position,
    popoverRect,
    targetRect,
    nudgedLeft,
    nudgedTop,
}) => {
    const targetMidX = targetRect.left + targetRect.width / 2;
    const targetMidY = targetRect.top + targetRect.height / 2;
    let top;
    let left;
    let topAdjustment = 0; // this is our 'top' adjustment

    switch (position) {
        case 'top':
            // taken from library
            top = targetRect.top - popoverRect.height - padding;
            left = targetMidX - popoverRect.width / 2;
            break;
        case 'left':
            // taken from library
            left = targetRect.left - padding - popoverRect.width;
            top = targetRect.top;
            // our adjustment
            topAdjustment = -20;
            break;
        case 'bottom':
            // taken from library
            top = targetRect.bottom + padding;
            left = targetMidX - popoverRect.width / 2;
            break;
        case 'right':
            // taken from library
            top = targetRect.top;
            left = targetRect.right + padding;
            // our adjustment
            topAdjustment = -20;
            break;
    }
    const finalTop = top + window.pageYOffset + topAdjustment;
    const finalLeft = left + window.pageXOffset;

    return { top: finalTop, left: finalLeft };
};
/**
 * @param {Object<string, any>} props
 * @property {node} props.children
 * @property {boolean} props.hasGradientBorder
 * @property {string} props.position
 * @property {node} props.trigger
 */

const Tooltip = ({ children, hasGradientBorder, position, trigger }) => {
    const [isOpen, setIsOpen] = useState(false);
    const tooltipProps = {
        align: TOOLTIP_ALIGNMENT_MAP[position],
        containerStyle: { overflow: 'visible', zIndex: layer.superFront },
        disableReposition: true,
        isOpen: isOpen,
        onClickOutside: () => setIsOpen(false),
        padding: TOOLTIP_DISTANCE,
        position: position,
        transitionDuration: 0.15,
    };

    return (
        <Popover
            contentLocation={contentLocation(TOOLTIP_DISTANCE)}
            content={
                <Content
                    hasGradientBorder={hasGradientBorder}
                    position={position}
                >
                    {children}
                </Content>
            }
            {...tooltipProps}
        >
            <Trigger
                tabIndex="0"
                onClick={() => setIsOpen(!isOpen)}
                onKeyPress={() => setIsOpen(!isOpen)}
            >
                {trigger}
            </Trigger>
        </Popover>
    );
};

export default Tooltip;
