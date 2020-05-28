import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
    animationSpeed,
    fontSize,
    lineHeight,
    screenSize,
    size,
} from './theme';
import { createShadowElement } from './utils';
import Link from './link';

const buttonHoverStyles = theme => css`
    &:before,
    &:after {
        content: '';
        transition: transform ${animationSpeed.medium},
            opacity ${animationSpeed.medium};
    }
    &:active,
    &:hover,
    &:focus {
        color: ${theme.colorMap.devWhite};
        &:before {
            ${createShadowElement(theme.gradientMap.green, size.large, 10, 0)}
        }
        &:after {
            ${createShadowElement(
                theme.colorMap.greyDarkThree,
                size.large,
                10,
                4
            )}
        }
    }
`;

const secondaryHoverStyles = theme => css`
    &:active,
    &:hover,
    &:focus {
        color: ${theme.colorMap.devWhite};
        border: 2px solid ${theme.colorMap.lightGreen};
    }
`;

const buttonPadding = css`
    padding: ${size.medium} ${size.large};

    @media ${screenSize.upToMedium} {
        padding: ${size.default} ${size.medium};
    }
`;

const primaryStyles = theme => css`
    background: ${theme.gradientMap.green};
    text-decoration: none;
    ${buttonHoverStyles(theme)}
    ${buttonPadding}
`;

const secondaryStyles = theme => css`
    background: ${theme.colorMap.greyDarkThree};
    border: 2px solid ${theme.colorMap.greyDarkOne};
    position: relative;
    text-decoration: none;
    ${buttonPadding}
    ${secondaryHoverStyles(theme)}
`;

const tertiaryStyles = theme => css`
    &:active,
    &:hover,
    &:focus {
        color: ${theme.colorMap.lightGreen};
        transition: color ${animationSpeed.fast} ease-in;
    }
`;
const playStyles = theme => css`
    background-color: ${theme.colorMap.devBlack};
    border: 1px solid ${theme.colorMap.devWhite};
    border-radius: 50%;
    color: ${theme.colorMap.devWhite};
    font-size: ${size.large};
    height: 80px;
    padding: ${size.default} ${size.default} ${size.default} ${size.medium};
    position: relative;
    width: 80px;
    &:before {
        background: ${theme.colorMap.greyLightThree};
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
        background-color: ${theme.colorMap.devWhite};
        border-color: ${theme.colorMap.devWhite};
        color: ${theme.colorMap.devBlack};
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
    background: ${({ theme }) => theme.colorMap.greyDarkTwo};
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
    color: ${({ color, theme }) => (color ? color : theme.colorMap.devWhite)};
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

    ${({ primary, theme }) => primary && primaryStyles(theme)}
    ${({ secondary, theme }) => secondary && secondaryStyles(theme)}
    ${({ play, theme }) => play && playStyles(theme)}
    ${({ play, primary, secondary, theme }) =>
        !primary && !secondary && !play && tertiaryStyles(theme)}
    &[disabled],
    &[disabled]:hover {
        background: ${({ theme }) => theme.colorMap.greyLightThree};
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
