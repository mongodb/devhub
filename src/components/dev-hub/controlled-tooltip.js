import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/core';
import Popover from 'react-tiny-popover';
import { animationSpeed, layer, size } from './theme';

const CONTENT_MAX_WIDTH = 250;
const TOOLTIP_DISTANCE = 15;
// Default alignment of tooltip content based on tooltip position
const TOOLTIP_ALIGNMENT_MAP = {
    bottom: 'center',
    left: 'start',
    right: 'start',
    top: 'center',
};

const gradient = theme => css`
    border-image: linear-gradient(
            315deg,
            ${theme.colorMap.violet} 0%,
            ${theme.colorMap.magenta} 40%,
            ${theme.colorMap.orange} 100%
        )
        1;
`;
const defaultBorder = theme => css`
    border-color: ${theme.colorMap.greyLightTwo};
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

const rightDefaultArrow = theme => css`
    ${arrowBase}
    ${horizontalArrowBase}
    &:before,
    &:after {
        left: 100%;
    }
    &:before {
        border-left-color: ${theme.colorMap.greyLightTwo};
    }
    &:after {
        border-left-color: ${theme.colorMap.greyDarkOne};
    }
`;

const rightGradientArrow = theme => css`
    ${rightDefaultArrow(theme)}
    &:before {
        border-left-color: ${theme.colorMap.magenta};
    }
    &:after {
        border-left-color: ${theme.colorMap.greyDarkOne};
    }
`;

const leftDefaultArrow = theme => css`
    ${arrowBase}
    ${horizontalArrowBase}
    &:before,
    &:after {
        right: 100%;
    }
    &:before {
        border-right-color: ${theme.colorMap.greyLightTwo};
    }
    &:after {
        border-right-color: ${theme.colorMap.greyDarkOne};
    }
`;

const leftGradientArrow = theme => css`
    ${leftDefaultArrow(theme)}
    &:before {
        border-right-color: ${theme.colorMap.orange};
    }
    &:after {
        border-right-color: ${theme.colorMap.greyDarkOne};
    }
`;

const bottomDefaultArrow = theme => css`
    ${arrowBase}
    ${verticalArrowBase}
    &:after {
        border-top-color: ${theme.colorMap.greyDarkOne};
        top: calc(100% + 11px);
    }
    &:before {
        border-top-color: ${theme.colorMap.greyLightTwo};
        top: calc(100% + 15px);
    }
`;

const bottomGradientArrow = theme => css`
    ${bottomDefaultArrow(theme)}
    &:after {
        border-top-color: ${theme.colorMap.greyDarkOne};
    }
    &:before {
        border-top-color: ${theme.colorMap.magenta};
    }
`;

const topDefaultArrow = theme => css`
    ${arrowBase}
    ${verticalArrowBase}
    &:before,
    &:after {
        bottom: 100%;
    }
    &:after {
        border-bottom-color: ${theme.colorMap.greyDarkOne};
    }
    &:before {
        border-bottom-color: ${theme.colorMap.greyLightTwo};
    }
`;

const topGradientArrow = theme => css`
    ${topDefaultArrow(theme)}
    &:after {
        border-bottom-color: ${theme.colorMap.greyDarkOne};
    }
    &:before {
        border-bottom-color: ${theme.colorMap.magenta};
    }
`;

const getArrowStyles = (hasGradientBorder, position, theme) => {
    const tooltipArrowMap = {
        bottom: hasGradientBorder
            ? topGradientArrow(theme)
            : topDefaultArrow(theme),
        left: hasGradientBorder
            ? rightGradientArrow(theme)
            : rightDefaultArrow(theme),
        right: hasGradientBorder
            ? leftGradientArrow(theme)
            : leftDefaultArrow(theme),
        top: hasGradientBorder
            ? bottomGradientArrow(theme)
            : bottomDefaultArrow(theme),
    };
    return tooltipArrowMap[position];
};

const Content = styled('div')`
    background: ${({ theme }) => theme.colorMap.greyDarkOne};
    border: 2px solid;
    color: ${({ theme }) => theme.colorMap.devWhite};
    max-width: ${({ maxWidth }) =>
        maxWidth ? `${maxWidth}px` : `${CONTENT_MAX_WIDTH}px`};
    padding: ${size.medium} ${size.default};
    position: relative;
    ${({ hasGradientBorder, theme }) =>
        hasGradientBorder ? gradient(theme) : defaultBorder(theme)}
    ${({ hasGradientBorder, position, theme }) =>
        getArrowStyles(hasGradientBorder, position, theme)}
`;

const Trigger = styled('span')`
    cursor: pointer;
`;

// This logic was pulled from 'react-tiny-popover' (see = https://github.com/alexkatz/react-tiny-popover/blob/3928cfa67a57676f32d5f04b3e1decb8c31db544/src/Popover.tsx#L316-L352)
// In order to provide custom positioning of right/left tooltips
// we must hook into the logic of the library and add the
// adjustments needed
const contentLocation = padding => ({ position, popoverRect, targetRect }) => {
    const targetMidX = targetRect.left + targetRect.width / 2;
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
        default:
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
 * @property {boolean} props.maxWidth
 * @property {boolean} props.displayOnHover
 * @property {boolean} props.isOpen
 */

const ControlledTooltip = ({
    children,
    hasGradientBorder,
    position,
    trigger,
    maxWidth,
    displayOnHover,
    contentStyle,
    isOpen,
    setIsOpen,
}) => {
    const tooltipProps = {
        align: TOOLTIP_ALIGNMENT_MAP[position],
        containerStyle: { overflow: 'visible', zIndex: layer.superFront },
        disableReposition: true,
        isOpen: isOpen,
        onClickOutside: () => setIsOpen(false),
        padding: TOOLTIP_DISTANCE,
        position: position,
        transitionDuration: `${animationSpeed.fast}`,
    };
    const triggerProps = displayOnHover
        ? {
              onMouseEnter: () => setIsOpen(true),
              onMouseLeave: () => setIsOpen(false),
          }
        : {
              onClick: () => setIsOpen(!isOpen),
              onKeyPress: () => setIsOpen(!isOpen),
              tabIndex: '0',
          };

    return (
        <Popover
            contentLocation={contentLocation(TOOLTIP_DISTANCE)}
            content={
                isOpen && (
                    <Content
                        hasGradientBorder={hasGradientBorder}
                        position={position}
                        maxWidth={maxWidth}
                        css={contentStyle}
                    >
                        {children}
                    </Content>
                )
            }
            {...tooltipProps}
        >
            {ref => (
                <Trigger ref={ref} {...triggerProps}>
                    {trigger}
                </Trigger>
            )}
        </Popover>
    );
};

export default ControlledTooltip;
