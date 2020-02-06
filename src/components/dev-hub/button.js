import React from 'react';
import { css } from '@emotion/core';
import styled from '@emotion/styled';
import {
    borderGradients,
    colorMap,
    gradientMap,
    size,
    layer,
    fontSize,
} from './theme';
import { P } from './text';
import Link from './link';

// TODO: Finalize hover effect when design complete
const buttonHoverStyles = css`
    &:active,
    &:hover,
    &:focus {
        // override Link hover styles if button is a link
        color: ${colorMap.devWhite};
    }
`;

// TODO: Finalize hover effect when design complete
const secondaryHoverStyles = css`
    &:active,
    &:hover,
    &:focus {
        ${borderGradients.violetMagenta}
    }
`;

const primaryStyles = css`
    background: ${gradientMap.violetMagenta};
    ${buttonHoverStyles}
`;

const secondaryStyles = css`
    background: ${colorMap.greyDarkTwo};
    border: 2px solid ${colorMap.greyLightTwo};
    ${buttonHoverStyles}
    ${secondaryHoverStyles}
`;

const ternaryStyles = css`
    background: transparent;
    &:active,
    &:hover,
    &:focus {
        background: ${gradientMap.violetMagenta};
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
    }
`;

const ButtonImpl = ({ children, href, to, ...props }) => {
    // By default, a Button renders as a `button` tag.
    /**
     * @type {any} A component type to render
     */
    let Component = 'button';
    const buttonProps = {
        type: 'button',
        tabIndex: 0,
    };

    if (href) {
        // If the Button has an `href` prop, then it renders as an `a` tag,
        // so we get the native browser link behavior.
        Component = 'a';
        buttonProps.href = href;
    } else if (to) {
        // If the Button has a `to` prop, then it renders as a `Link` element,
        // so we get the react-router navigation behavior.
        // @ts-ignore
        Component = Link;
        buttonProps.to = to;
    }
    return (
        <Component {...buttonProps} {...props}>
            {children}
        </Component>
    );
};

const StyledButton = styled(ButtonImpl)`
    box-shadow: none;
    border: none;
    color: ${({ color }) => (color ? color : colorMap.devWhite)};
    cursor: pointer;
    font-size: ${fontSize.default};
    height: 100%;
    padding: ${size.default};
    position: relative;
    transition: .1s ease-in-out;
    transition-delay: .02s;
    text-align: center;
    z-index: ${layer.middle};

    ${({ primary }) => primary && primaryStyles}
    ${({ secondary }) => secondary && secondaryStyles}
    ${({ primary, secondary }) => !primary && !secondary && ternaryStyles}
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
