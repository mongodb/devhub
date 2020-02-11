import React, { useState } from 'react';
import styled from '@emotion/styled-base';
import { css } from '@emotion/core';
import Popover, { ArrowContainer } from 'react-tiny-popover';
import { colorMap, layer, size } from './theme';

const CONTENT_MAX_WIDTH = 250;
const ARROW_SIZE = 80;
const TOOLTIP_DISTANCE = 10;
const gradient = css`
    border-image: linear-gradient(
        315deg,
        ${colorMap.violet} 0%,
        ${colorMap.magenta} 40%,
        ${colorMap.orange} 100%
    );
    border-image-slice: 1;
`;
const defaultBorder = css`
    border-color: ${colorMap.greyLightTwo};
`;

const Content = styled('div')`
    background: ${colorMap.greyDarkOne};
    border: 2px solid;
    color: ${colorMap.devWhite};
    max-width: ${CONTENT_MAX_WIDTH};
    padding: ${size.medium} ${size.default};
    ${({ hasGradientBorder }) => hasGradientBorder && gradient}
    ${({ hasGradientBorder }) => !hasGradientBorder && defaultBorder}
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
/*
    Default Styling & Positioning for Arrow
    Based on Tooltip Position (right/left/top/bottom)
*/
const ARROW_RECT = {
    height: ARROW_SIZE,
    width: ARROW_SIZE,
};

const ARROW_STYLE_MAP = {
    bottom: { left: '46%', right: '53%', top: '2px' },
    left: { right: '2px', top: size.medium },
    right: { left: '2px', top: size.medium },
    top: { bottom: '2px', left: '47%', right: '53%' },
};

// Default alignment of tooltip content based on tooltip position
const TOOLTIP_ALIGNMENT_MAP = {
    bottom: 'center',
    left: 'start',
    right: 'start',
    top: 'center',
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
        containerStyle: { zIndex: layer.superFront },
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
                <ArrowContainer
                    arrowColor={colorMap.greyDarkOne}
                    arrowSize={10}
                    arrowStyle={ARROW_STYLE_MAP[position]}
                    position={position}
                    popoverRect={ARROW_RECT}
                    targetRect={ARROW_RECT}
                >
                    <Content hasGradientBorder={hasGradientBorder}>
                        {children}
                    </Content>
                </ArrowContainer>
            }
            {...tooltipProps}
        >
            <span onClick={() => setIsOpen(true)}>{trigger}</span>
        </Popover>
    );
};

export default Tooltip;
