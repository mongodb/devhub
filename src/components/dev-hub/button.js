import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
    animationSpeed,
    colorMap,
    fontSize,
    gradientMap,
    layer,
    lineHeight,
    screenSize,
    size,
} from './theme';
import Link from './link';

const blockquotePseudoElement = (
    backgroundColor,
    positionOffset,
    sizeOffset = -2
) => css`
    background: ${backgroundColor};
    border-radius: ${size.large};
    bottom: ${positionOffset}px;
    content: '';
    height: calc(100% + ${sizeOffset}px);
    left: ${positionOffset}px;
    position: absolute;
    width: calc(100% + ${sizeOffset}px);
    z-index: ${layer.superBack};
`;

const buttonHoverStyles = css`
    &:before,
    &:after {
        content: '';
        opacity: 0;
        transform: scale(0);
        transition: opacity ${animationSpeed.medium},
            transform ${animationSpeed.fast};
    }
    &:active,
    &:hover,
    &:focus {
        color: ${colorMap.devWhite};
        &:before {
            opacity: 1;
            transform: scale(1);
            ${blockquotePseudoElement(gradientMap.green, -10)}
        }
        &:after {
            transform: scale(1);
            opacity: 1;
            ${blockquotePseudoElement(colorMap.greyDarkThree, -8, -8 + 2)};
        }
    }
`;

const secondaryHoverStyles = css`
    &:active,
    &:hover,
    &:focus {
        border: 2px solid ${colorMap.lightGreen};
    }
`;

const buttonPadding = css`
    padding: ${size.medium} ${size.large};

    @media ${screenSize.upToMedium} {
        padding: ${size.default} ${size.medium};
    }
`;

const primaryStyles = css`
    background: ${gradientMap.green};
    text-decoration: none;
    ${buttonHoverStyles}
    ${buttonPadding}
`;

const secondaryStyles = css`
    background: ${colorMap.greyDarkThree};
    border: 2px solid ${colorMap.greyDarkOne};
    position: relative;
    text-decoration: none;
    ${buttonHoverStyles}
    ${buttonPadding}
    ${secondaryHoverStyles}
`;

const tertiaryStyles = css`
    &:active,
    &:hover,
    &:focus {
        color: ${colorMap.lightGreen};
        transition: color ${animationSpeed.fast} ease-in;
    }
`;

const playStyles = css`
    background-color: ${colorMap.devBlack};
    border: 1px solid ${colorMap.white};
    border-radius: 50%;
    color: ${colorMap.white};
    font-size: ${size.large};
    height: 80px;
    position: relative;
    width: 80px;
    &:before {
        background: ${colorMap.greyLightThree};
        border-radius: 50%;
        bottom: -${size.xsmall};
        content: '';
        height: calc(100% + ${size.default});
        left: -${size.xsmall};
        opacity: 0;
        position: absolute;
        width: calc(100% + ${size.default});
        z-index: -1;
    }
    ::after {
        content: '\u25b6';
    }
    :hover {
        background-color: ${colorMap.devWhite};
        border-color: ${colorMap.devWhite};
        color: ${colorMap.devBlack};
        transition: color 0.4s;
        ::before {
            opacity: 0.6;
            transition: opacity 0.4s;
        }
        div {
            opacity: 0.6;
            transition: opacity 0.6s;
        }
    }
`;

const PlayButtonWrapper = styled('div')`
    background: ${colorMap.greyDarkTwo};
    border-radius: 50%;
    bottom: -${size.default};
    content: '';
    height: calc(100% + ${size.large});
    left: -${size.default};
    position: absolute;
    width: calc(100% + ${size.large});
    z-index: -2;
    opacity: 0;
`;

const ButtonImpl = ({
    children,
    href,
    play,
    primary,
    secondary,
    to,
    ...props
}) => {
    // By default, a Button renders as a `button` tag.
    /**
     * @type {any} A component type to render
     */
    let Component = 'button';
    const buttonProps = {
        type: 'button',
        tabIndex: 0,
    };
    const isButton = !!(primary || secondary || play);

    if (href || to || !isButton) {
        // If the Button has a `to` or a `href` prop, then it renders as a `Link` element,
        // @ts-ignore
        Component = Link;
        buttonProps.href = href;
        buttonProps.to = to;
    }

    if (play) {
        return (
            <Component {...buttonProps} {...props}>
                <PlayButtonWrapper>{children}</PlayButtonWrapper>
            </Component>
        );
    }

    return (
        <Component {...buttonProps} {...props}>
            {children}
        </Component>
    );
};

const StyledButton = styled(ButtonImpl)`
    border: none;
    border-radius: ${size.large};
    box-shadow: none;
    color: ${({ color }) => (color ? color : colorMap.devWhite)};
    cursor: pointer;
    display: inline-block;
    font-size: ${fontSize.default};
    line-height: ${lineHeight.micro};
    padding: ${size.default};
    position: relative;
    text-align: center;

    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.small};
    }

    ${({ primary }) => primary && primaryStyles}
    ${({ secondary }) => secondary && secondaryStyles}
    ${({ play }) => play && playStyles}
    ${({ play, primary, secondary }) =>
        !primary && !secondary && !play && tertiaryStyles}
`;

/**
 * @param {Object<string, any>} props
 * @property {node} props.children
 * @property {string?} props.href
 * @property {func?} props.onClick
 * @property {boolean?} props.play
 * @property {boolean?} props.primary
 * @property {boolean?} props.secondary
 * @property {string?} props.target
 * @property {string?} props.to
 */

const Button = ({ children, ...props }) => (
    <StyledButton {...props}>{children}</StyledButton>
);

export default Button;
