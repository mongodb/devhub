import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
    animationSpeed,
    darkTheme,
    fontSize,
    lineHeight,
    screenSize,
    size,
} from './theme';
import { createShadowElement } from './utils';
import Link from './link';

const buttonHoverStyles = css`
    &:before,
    &:after {
        content: '';
        transition: transform ${animationSpeed.medium},
            opacity ${animationSpeed.medium};
    }
    &:active,
    &:hover,
    &:focus {
        color: ${darkTheme.colorMap.devWhite};
        &:before {
            ${createShadowElement(
                darkTheme.gradientMap.green,
                size.large,
                10,
                0
            )}
        }
        &:after {
            ${createShadowElement(
                darkTheme.colorMap.greyDarkThree,
                size.large,
                10,
                4
            )}
        }
    }
`;

const secondaryHoverStyles = css`
    &:active,
    &:hover,
    &:focus {
        color: ${darkTheme.colorMap.devWhite};
        border: 2px solid ${darkTheme.colorMap.lightGreen};
    }
`;

const buttonPadding = css`
    padding: ${size.medium} ${size.large};

    @media ${screenSize.upToMedium} {
        padding: ${size.default} ${size.medium};
    }
`;

const primaryStyles = css`
    background: ${darkTheme.gradientMap.green};
    text-decoration: none;
    ${buttonHoverStyles}
    ${buttonPadding}
`;

const secondaryStyles = css`
    background: ${darkTheme.colorMap.greyDarkThree};
    border: 2px solid ${darkTheme.colorMap.greyDarkOne};
    position: relative;
    text-decoration: none;
    ${buttonPadding}
    ${secondaryHoverStyles}
`;

const tertiaryStyles = css`
    &:active,
    &:hover,
    &:focus {
        color: ${darkTheme.colorMap.lightGreen};
        transition: color ${animationSpeed.fast} ease-in;
    }
`;
const playStyles = css`
    background-color: ${darkTheme.colorMap.devBlack};
    border: 1px solid ${darkTheme.colorMap.devWhite};
    border-radius: 50%;
    color: ${darkTheme.colorMap.devWhite};
    font-size: ${size.large};
    height: 80px;
    padding: ${size.default} ${size.default} ${size.default} ${size.medium};
    position: relative;
    width: 80px;
    &:before {
        background: ${darkTheme.colorMap.greyLightThree};
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
        background-color: ${darkTheme.colorMap.devWhite};
        border-color: ${darkTheme.colorMap.devWhite};
        color: ${darkTheme.colorMap.devBlack};
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
    @media ${screenSize.upToMedium} {
        font-size: ${size.large};
    }
`;

const PlayButtonWrapper = styled('div')`
    background: ${darkTheme.colorMap.greyDarkTwo};
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

const StyledButton = styled('button')`
    border: none;
    border-radius: ${size.large};
    box-shadow: none;
    color: ${({ color }) => (color ? color : darkTheme.colorMap.devWhite)};
    cursor: pointer;
    display: inline-block;
    font-family: 'Fira Mono', monospace;
    font-size: ${fontSize.small};
    line-height: ${lineHeight.micro};
    padding: ${size.default};
    position: relative;
    text-align: center;

    @media ${screenSize.upToMedium} {
        font-size: ${fontSize.tiny};
    }

    ${({ primary }) => primary && primaryStyles}
    ${({ secondary }) => secondary && secondaryStyles}
    ${({ play }) => play && playStyles}
    ${({ play, primary, secondary }) =>
        !primary && !secondary && !play && tertiaryStyles}
    &[disabled],
    &[disabled]:hover {
        background: ${darkTheme.colorMap.greyLightThree};
        cursor: not-allowed;
    }
`;

const getArrow = ({ pagination, primary, secondary }) => {
    if (pagination) {
        return <span> &darr;</span>;
    }
    if (primary || secondary) {
        return <span> &rarr;</span>;
    }
    return null;
};

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

const Button = ({ children, href, play, to, hasArrow = true, ...props }) => {
    const isButton = !!(props.primary || props.secondary || play);
    const arrow = hasArrow ? getArrow(props) : null;
    if (href || to || !isButton) {
        // If the Button has a `to` or a `href` prop, then it renders as a `Link` element,
        const AsLink = StyledButton.withComponent(Link);
        return (
            <AsLink to={to} href={href} {...props}>
                {children}
                {arrow}
            </AsLink>
        );
    }

    return (
        <StyledButton play={play} {...props}>
            {play ? (
                <PlayButtonWrapper aria-label="play">
                    {children}
                </PlayButtonWrapper>
            ) : (
                children
            )}
            {arrow}
        </StyledButton>
    );
};

export default Button;
