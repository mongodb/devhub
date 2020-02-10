import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import { colorMap, gradientMap, size, layer, fontSize } from './theme';
import Link from './link';

// TODO: Finalize hover effect when design complete
const buttonHoverStyles = css`
    &:active,
    &:hover,
    &:focus {
        /* override Link hover styles if button is a link */
        color: ${colorMap.devWhite};
    }
`;

// TODO: Finalize hover effect when design complete
const secondaryHoverStyles = css`
    &:active,
    &:hover,
    &:focus {
        border: 2px solid transparent;
        /* Create border gradient */
        &:before {
            background: ${gradientMap.green};
            border-radius: ${size.large};
            bottom: -5px;
            content: '';
            height: calc(100% + ${size.small});
            left: -6px;
            position: absolute;
            width: calc(100% + 12px);
            z-index: -1;
        }
    }
`;

const buttonPadding = css`
    padding: ${size.default} ${size.medium};
`;

const primaryStyles = css`
    background: ${gradientMap.green};
    text-decoration: none;
    ${buttonHoverStyles}
    ${buttonPadding}
`;

const secondaryStyles = css`
    background: ${colorMap.greyDarkTwo};
    border: 2px solid ${colorMap.greyLightTwo};
    position: relative;
    text-decoration: none;
    ${buttonHoverStyles}
    ${buttonPadding}
    ${secondaryHoverStyles}
`;

const tertiaryStyles = css`
    background: transparent;
    &:active,
    &:hover,
    &:focus {
        background: ${gradientMap.green};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;

const ButtonImpl = ({ children, href, primary, secondary, to, ...props }) => {
    // By default, a Button renders as a `button` tag.
    /**
     * @type {any} A component type to render
     */
    let Component = 'button';
    const buttonProps = {
        type: 'button',
        tabIndex: 0,
    };
    const isButton = !!(primary || secondary);

    if (href || to || !isButton) {
        // If the Button has a `to` or a `href` prop, then it renders as a `Link` element,
        // @ts-ignore
        Component = Link;
        buttonProps.href = href;
        buttonProps.to = to;
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
    font-size: ${fontSize.default};
    padding: ${size.default};
    position: relative;
    text-align: center;

    ${({ primary }) => primary && primaryStyles}
    ${({ secondary }) => secondary && secondaryStyles}
    ${({ primary, secondary }) => !primary && !secondary && tertiaryStyles}
`;

/**
 * @param {Object<string, any>} props
 * @property {node} props.children
 * @property {string?} props.href
 * @property {func?} props.onClick
 * @property {boolean?} props.primary
 * @property {boolean?} props.secondary
 * @property {string?} props.target
 * @property {string?} props.to
 */

const Button = ({ children, ...props }) => (
    <StyledButton {...props}>{children}</StyledButton>
);

export default Button;
